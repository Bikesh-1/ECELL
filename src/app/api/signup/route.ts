import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(72),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Please provide a valid name, email and password (8+ characters)." }, { status: 400 });
    const { name, password } = parsed.data;
    const email = parsed.data.email.toLowerCase();
    const passwordHash = await hash(password, 12);
    // Public signup always creates a normal USER. Only the trusted seed process can grant ADMIN.
    const user = await prisma.user.create({
      data: { name, email, passwordHash, role: "USER" },
      select: { id: true, name: true, email: true, role: true },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002")
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    console.error("Signup failed", error);
    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}