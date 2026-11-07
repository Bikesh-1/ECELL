import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Cell SMVIT | Events",
  description: "Discover and register for E-Cell SMVIT events.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
