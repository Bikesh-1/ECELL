import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const eventSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  venue: z.string().trim().min(2).max(200),
  eventDate: z.coerce.date(),
  registrationDeadline: z.coerce.date(),
  maxParticipants: z.number().int().positive().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
});

export async function GET() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { eventDate: "asc" },
    include: { _count: { select: { registrations: true } } },
  });
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "CORE") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = eventSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid event details", details: parsed.error.flatten() }, { status: 400 });
  const data = parsed.data;
  if (data.registrationDeadline >= data.eventDate) return NextResponse.json({ error: "Registration deadline must be before the event date." }, { status: 400 });
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + crypto.randomUUID().slice(0, 8);
  const event = await prisma.event.create({ data: { ...data, slug, createdById: session.user.id } });
  return NextResponse.json({ event }, { status: 201 });
}
