import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const eventSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  venue: z.string().trim().min(2).max(200),
  posterUrl: z.string().url().optional().or(z.literal("")),
  eventDate: z.coerce.date(),
  registrationDeadline: z.coerce.date(),
  maxParticipants: z.number().int().positive().optional().nullable(),
  prizePool: z.string().trim().max(120).optional(),
  contactName: z.string().trim().max(100).optional(),
  contactPhone: z.string().trim().max(20).optional(),
  participationMode: z.enum(["SOLO", "TEAM", "BOTH"]),
  minTeamSize: z.number().int().min(2).max(20),
  maxTeamSize: z.number().int().min(2).max(20),
  isPaid: z.boolean(),
  entryFee: z.number().int().min(0),
  rounds: z.array(z.object({ title: z.string().trim().min(2).max(100), description: z.string().trim().min(2).max(1500) })).max(12),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
});

export async function GET() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { eventDate: "asc" },
    include: { _count: { select: { registrations: true } }, rounds: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "CORE") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = eventSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid event details", details: parsed.error.flatten() }, { status: 400 });
  const { rounds, ...data } = parsed.data;
  if (data.registrationDeadline >= data.eventDate) return NextResponse.json({ error: "Registration deadline must be before the event date." }, { status: 400 });
  if (data.minTeamSize > data.maxTeamSize) return NextResponse.json({ error: "Minimum team size cannot exceed maximum team size." }, { status: 400 });
  if (!data.isPaid && data.entryFee !== 0) return NextResponse.json({ error: "Free events must have a zero entry fee." }, { status: 400 });
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + crypto.randomUUID().slice(0, 8);
  const event = await prisma.event.create({
    data: {
      ...data,
      posterUrl: data.posterUrl || null,
      prizePool: data.prizePool || null,
      contactName: data.contactName || null,
      contactPhone: data.contactPhone || null,
      slug,
      createdById: session.user.id,
      rounds: { create: rounds.map((round, index) => ({ ...round, order: index })) },
    },
    include: { rounds: true },
  });
  return NextResponse.json({ event }, { status: 201 });
}
