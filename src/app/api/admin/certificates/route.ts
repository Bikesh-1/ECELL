import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "CORE") return NextResponse.json({ error: "Core access required" }, { status: 403 });
  const parsed = z.object({ registrationId: z.string() }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Registration ID required" }, { status: 400 });
  const registration = await prisma.registration.findUnique({ where: { id: parsed.data.registrationId }, include: { user: true, event: true } });
  if (!registration) return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  if (!registration.checkedInAt) return NextResponse.json({ error: "Mark attendance before issuing a certificate." }, { status: 400 });
  const existing = await prisma.certificate.findFirst({ where: { userId: registration.userId, eventId: registration.eventId } });
  if (existing) return NextResponse.json({ certificate: existing });
  const certificate = await prisma.certificate.create({
    data: { userId: registration.userId, eventId: registration.eventId, recipient: registration.user.name, title: registration.event.title },
  });
  await prisma.activityPoint.create({ data: { userId: registration.userId, points: 30, reason: "Certificate earned: " + registration.event.title } });
  return NextResponse.json({ certificate }, { status: 201 });
}
