import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "CORE") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await context.params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      registrations: {
        include: {
          user: { select: { id: true, name: true, email: true } },
          teamMembers: true,
        },
        orderBy: { registeredAt: "desc" },
      },
      rounds: { orderBy: { order: "asc" } },
    },
  });
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });
  return NextResponse.json({ event, registrations: event.registrations });
}
