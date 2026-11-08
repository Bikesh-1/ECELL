import Link from "next/link";
import BrandPageMotion from "@/components/brand-page-motion";

export function PageWrap({ children }: { children: React.ReactNode }) {
  return <main className="relative min-h-screen overflow-hidden bg-[#E0E0E1] text-[#171717]">
    <div aria-hidden="true" className="page-orb pointer-events-none absolute -right-28 top-24 h-72 w-72 rounded-full bg-[#6D4DFE]/10 blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-10">{children}</div>
    <BrandPageMotion />
  </main>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#6D4DFE]">{children}</p>;
}
export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-3 text-sm font-black text-white shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 hover:bg-[#FF5A36] hover:text-[#171717] active:translate-y-1 active:shadow-none">{children} <span aria-hidden="true">↗</span></Link>;
}
