import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const mentors = await prisma.mentorProfile.findMany({ where: { isAvailable: true }, include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ mentors });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Login required" }, { status: 401 });
  const parsed = z.object({
    headline: z.string().trim().min(5).max(100),
    bio: z.string().trim().min(30).max(2000),
    expertise: z.string().trim().min(2).max(200),
    company: z.string().trim().max(100).optional(),
    linkedinUrl: z.union([z.string().url(), z.literal("")]).optional(),
  }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please complete your mentor profile." }, { status: 400 });
  const mentor = await prisma.mentorProfile.upsert({
    where: { userId: session.user.id },
    create: { ...parsed.data, company: parsed.data.company || null, linkedinUrl: parsed.data.linkedinUrl || null, userId: session.user.id },
    update: { ...parsed.data, company: parsed.data.company || null, linkedinUrl: parsed.data.linkedinUrl || null, isAvailable: true },
  });
  return NextResponse.json({ mentor }, { status: 201 });
}
