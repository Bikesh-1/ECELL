import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const emails = (process.env.CORE_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (emails.length === 0) {
    throw new Error("Set CORE_EMAILS to a comma-separated list of registered core-member email addresses.");
  }

  const missing: string[] = [];
  for (const email of emails) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      missing.push(email);
      continue;
    }
    await prisma.user.update({ where: { email }, data: { role: "CORE" } });
    console.log("Core access granted:", email);
  }

  if (missing.length) {
    throw new Error("These core members must sign up first: " + missing.join(", "));
  }
}

main().finally(() => prisma.$disconnect());
