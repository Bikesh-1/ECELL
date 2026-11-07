import "next-auth";
import type { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User { role: "USER" | "CORE"; }
  interface Session {
    user: { id: string; role: "USER" | "CORE" } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT { id?: string; role?: "USER" | "CORE"; }
}
