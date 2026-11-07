import "next-auth";
declare module "next-auth" {
  interface User { role: "USER" | "ADMIN"; }
  interface Session {
    user: { id: string; role: "USER" | "ADMIN" } & NonNullable<Session["user"]>;
  }
}
declare module "next-auth/jwt" {
  interface JWT { id?: string; role?: "USER" | "ADMIN"; }
}
