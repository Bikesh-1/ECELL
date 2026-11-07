import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const requests = await prisma.mentorshipRequest.findMany({
    where: { OR: [{ studentId: session.user.id }, { mentor: { userId: session.user.id } }] },
    include: { student: { select: { name: true, email: true } }, mentor: { include: { user: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Login required" }, { status: 401 });
  const parsed = z.object({ mentorId: z.string(), message: z.string().trim().min(20).max(1500) }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please write a short introduction and what guidance you need." }, { status: 400 });
  const mentor = await prisma.mentorProfile.findUnique({ where: { id: parsed.data.mentorId } });
  if (!mentor || !mentor.isAvailable || mentor.userId === session.user.id) return NextResponse.json({ error: "Mentor is unavailable." }, { status: 404 });
  try {
    const item = await prisma.mentorshipRequest.create({ data: { studentId: session.user.id, mentorId: mentor.id, message: parsed.data.message } });
    return NextResponse.json({ request: item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "You have already contacted this mentor." }, { status: 409 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Login required" }, { status: 401 });
  const parsed = z.object({ id: z.string(), status: z.enum(["ACCEPTED", "DECLINED", "COMPLETED"]) }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const existing = await prisma.mentorshipRequest.findUnique({ where: { id: parsed.data.id }, include: { mentor: true } });
  if (!existing || existing.mentor.userId !== session.user.id) return NextResponse.json({ error: "Request not found" }, { status: 404 });
  const updated = await prisma.mentorshipRequest.update({ where: { id: existing.id }, data: { status: parsed.data.status } });
  return NextResponse.json({ request: updated });
}
