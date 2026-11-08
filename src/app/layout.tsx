import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { auth } from "@/lib/auth";
import SiteNavbar from "@/components/site-navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  title: "E-Cell SMVIT | Events",
  description: "Discover and register for E-Cell SMVIT events.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <SiteNavbar authenticated={!!session} role={session?.user?.role} />
        {children}
      </body>
    </html>
  );
}
