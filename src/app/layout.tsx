import type { Metadata } from "next";\nimport { Plus_Jakarta_Sans } from "next/font/google";
import { auth } from "@/lib/auth";
import SiteNavbar from "@/components/site-navbar";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" });\n\nexport const metadata: Metadata = {
  title: "E-Cell SMVIT | Events",
  description: "Discover and register for E-Cell SMVIT events.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={plusJakarta.className}>
        <SiteNavbar authenticated={!!session} role={session?.user?.role} />
        {children}
      </body>
    </html>
  );
}
