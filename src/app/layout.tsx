import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import SiteNavbar from "@/components/site-navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Cell SMVIT | Events",
  description: "Discover and register for E-Cell SMVIT events.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        {session && <SiteNavbar role={session.user?.role} />}
        {children}
      </body>
    </html>
  );
}
