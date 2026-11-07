import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const memberSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10).max(15),
  collegeName: z.string().trim().min(2).max(160),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const registrations = await prisma.registration.findMany({
    where: { userId: session.user.id },
    include: { event: true, teamMembers: true },
    orderBy: { registeredAt: "desc" },
  });
  return NextResponse.json({ registrations });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Please log in to register." }, { status: 401 });
  const parsed = z.object({
    eventId: z.string().min(1),
    phone: z.string().trim().min(10).max(15),
    collegeName: z.string().trim().min(2).max(160),
    participationType: z.enum(["SOLO", "TEAM"]),
    teamName: z.string().trim().min(2).max(80).optional(),
    teamMembers: z.array(memberSchema).max(19).default([]),
  }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please complete all required registration details.", details: parsed.error.flatten() }, { status: 400 });

  try {
    const registration = await prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({ where: { id: parsed.data.eventId } });
      if (!event || event.status !== "PUBLISHED") throw new Error("EVENT_UNAVAILABLE");
      const now = new Date();
      if (event.registrationDeadline <= now || event.eventDate <= now) throw new Error("REGISTRATION_CLOSED");
      if (event.maxParticipants !== null) {
        const count = await tx.registration.count({ where: { eventId: event.id } });
        if (count >= event.maxParticipants) throw new Error("EVENT_FULL");
      }
      const { teamMembers, ...details } = parsed.data;
      if (details.participationType === "SOLO" && event.participationMode === "TEAM") throw new Error("TEAM_ONLY");
      if (details.participationType === "TEAM" && event.participationMode === "SOLO") throw new Error("SOLO_ONLY");
      if (details.participationType === "TEAM") {
        const total = teamMembers.length + 1;
        if (!details.teamName || total < event.minTeamSize || total > event.maxTeamSize) throw new Error("TEAM_SIZE");
      } else if (teamMembers.length) throw new Error("SOLO_MEMBERS");
      return tx.registration.create({
        data: {
          ...details,
          teamName: details.teamName || null,
          userId: session.user.id,
          eventId: event.id,
          teamMembers: { create: teamMembers },
        },
        include: { teamMembers: true },
      });
    });
    return NextResponse.json({ registration }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "EVENT_UNAVAILABLE") return NextResponse.json({ error: "This event is not available." }, { status: 404 });
    if (message === "REGISTRATION_CLOSED") return NextResponse.json({ error: "Registration is closed." }, { status: 400 });
    if (message === "EVENT_FULL") return NextResponse.json({ error: "This event has reached its participant limit." }, { status: 409 });
    if (message === "TEAM_ONLY" || message === "SOLO_ONLY") return NextResponse.json({ error: "Selected registration type is not allowed for this event." }, { status: 400 });
    if (message === "TEAM_SIZE") return NextResponse.json({ error: "Team size must be within the event's allowed range, including you." }, { status: 400 });
    if (message === "SOLO_MEMBERS") return NextResponse.json({ error: "Solo registration cannot include additional members." }, { status: 400 });
    if (error && typeof error === "object" && "code" in error && error.code === "P2002")
      return NextResponse.json({ error: "You are already registered for this event." }, { status: 409 });
    console.error("Registration failed", error);
    return NextResponse.json({ error: "Could not complete registration." }, { status: 500 });
  }
}
