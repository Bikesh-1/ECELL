import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const registrations = await prisma.registration.findMany({
    where: { userId: session.user.id },
    include: { event: true },
    orderBy: { registeredAt: "desc" },
  });
  return NextResponse.json({ registrations });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Please log in to register." }, { status: 401 });
  const parsed = z.object({ eventId: z.string().min(1) }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid event." }, { status: 400 });

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
      return tx.registration.create({ data: { userId: session.user.id, eventId: event.id } });
    });
    return NextResponse.json({ registration }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "EVENT_UNAVAILABLE") return NextResponse.json({ error: "This event is not available." }, { status: 404 });
    if (message === "REGISTRATION_CLOSED") return NextResponse.json({ error: "Registration is closed." }, { status: 400 });
    if (message === "EVENT_FULL") return NextResponse.json({ error: "This event has reached its participant limit." }, { status: 409 });
    if (error && typeof error === "object" && "code" in error && error.code === "P2002")
      return NextResponse.json({ error: "You are already registered for this event." }, { status: 409 });
    console.error("Registration failed", error);
    return NextResponse.json({ error: "Could not complete registration." }, { status: 500 });
  }
}
