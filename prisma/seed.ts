import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const email = process.env.PRESIDENT_EMAIL?.trim().toLowerCase();
  const password = process.env.PRESIDENT_INITIAL_PASSWORD;
  const name = process.env.PRESIDENT_NAME ?? "E-Cell President";
  if (!email || !password) throw new Error("Set PRESIDENT_EMAIL and PRESIDENT_INITIAL_PASSWORD before seeding.");
  await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN" },
    create: { name, email, passwordHash: await hash(password, 12), role: "ADMIN" },
  });
  console.log("President account ready:", email);
}
main().finally(() => prisma.$disconnect());
