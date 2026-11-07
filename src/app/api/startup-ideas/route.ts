import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const where = session.user.role === "CORE" ? {} : { userId: session.user.id };
  const ideas = await prisma.startupIdea.findMany({ where, include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ideas });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Login required" }, { status: 401 });
  const parsed = z.object({
    title: z.string().trim().min(4).max(100),
    problem: z.string().trim().min(20).max(3000),
    solution: z.string().trim().min(20).max(3000),
    category: z.string().trim().min(2).max(60),
    stage: z.enum(["IDEA", "PROTOTYPE", "MVP", "LAUNCHED"]).default("IDEA"),
    pitchUrl: z.union([z.string().url(), z.literal("")]).optional(),
  }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please provide complete idea details." }, { status: 400 });
  const idea = await prisma.startupIdea.create({ data: { ...parsed.data, pitchUrl: parsed.data.pitchUrl || null, userId: session.user.id } });
  return NextResponse.json({ idea }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "CORE") return NextResponse.json({ error: "Core access required" }, { status: 403 });
  const parsed = z.object({ id: z.string(), status: z.enum(["REVIEWING", "SHORTLISTED", "ACCEPTED", "DECLINED"]), feedback: z.string().max(2000).optional() }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid review update" }, { status: 400 });
  const idea = await prisma.startupIdea.update({ where: { id: parsed.data.id }, data: { status: parsed.data.status, feedback: parsed.data.feedback } });
  return NextResponse.json({ idea });
}
