import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().trim().min(3).max(120).optional(),
  description: z.string().trim().min(10).max(5000).optional(),
  venue: z.string().trim().min(2).max(200).optional(),
  eventDate: z.coerce.date().optional(),
  registrationDeadline: z.coerce.date().optional(),
  maxParticipants: z.number().int().positive().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "CLOSED", "COMPLETED"]).optional(),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "CORE") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid event details." }, { status: 400 });
  const { id } = await context.params;
  try {
    const event = await prisma.event.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Event not found or update failed." }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "CORE") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await context.params;
  try {
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }
}
