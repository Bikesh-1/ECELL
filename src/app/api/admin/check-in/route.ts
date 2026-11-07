import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "CORE") return NextResponse.json({ error: "Core access required" }, { status: 403 });
  const parsed = z.object({ code: z.string().trim().min(5) }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid check-in code" }, { status: 400 });
  const registration = await prisma.registration.findUnique({ where: { checkInCode: parsed.data.code }, include: { user: true, event: true } });
  if (!registration) return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  if (registration.checkedInAt) return NextResponse.json({ error: "Already checked in", checkedInAt: registration.checkedInAt, attendee: registration.user.name }, { status: 409 });
  let updated;
  try {
    updated = await prisma.$transaction(async (tx) => {
      const item = await tx.registration.updateMany({ where: { id: registration.id, checkedInAt: null }, data: { checkedInAt: new Date() } });
      if (!item.count) throw new Error("ALREADY_CHECKED_IN");
      await tx.activityPoint.create({ data: { userId: registration.userId, points: 20, reason: "Attended: " + registration.event.title } });
      return tx.registration.findUnique({ where: { id: registration.id }, select: { checkedInAt: true } });
    });
  } catch (error) {
    if (error instanceof Error && error.message === "ALREADY_CHECKED_IN") return NextResponse.json({ error: "Already checked in", attendee: registration.user.name }, { status: 409 });
    throw error;
  }
  return NextResponse.json({ success: true, attendee: registration.user.name, event: registration.event.title, checkedInAt: updated?.checkedInAt });
}
