import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    where: { activityPoints: { some: {} } },
    select: { id: true, name: true, activityPoints: { select: { points: true } } },
  });
  const leaderboard = users.map(user => ({ id: user.id, name: user.name, points: user.activityPoints.reduce((sum, item) => sum + item.points, 0) }))
    .sort((a, b) => b.points - a.points).slice(0, 50);
  return NextResponse.json({ leaderboard });
}
