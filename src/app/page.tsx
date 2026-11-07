import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const events = await prisma.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { eventDate: "asc" }, take: 6, include: { _count: { select: { registrations: true } } } });
  return <main className="mx-auto max-w-screen p-4 bg-[#E0E0E1] z-10">
    <div className="pointer-events-none absolute inset-0" />
    <section className="py-20 sm:py-28 flex items-center justify-center flex-col">
      <div className="inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 shadow-sm relative z-10">
        <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995" alt="E-Cell SMVIT" className="h-8 w-8 object-contain" />
        <p className="text-sm tracking-tight text-[#171717]">E-Cell | SMVIT Bengaluru</p>
      </div>
      <h1 className="relative z-10 mt-8 max-w-7xl text-4xl font-black leading-[1.02] tracking-tight text-[#171717] sm:text-7xl lg:text-8xl">
        WHERE ASPIRATION <br /><span className="text-[#6D4DFE]">MEETS OPPORTUNITY.</span>
      </h1>
      <Link className="group mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-6 py-3.5 font-semibold text-white shadow-[0_5px_0_#171717] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171717] hover:shadow-[0_7px_0_#6D4DFE] active:translate-y-1 active:shadow-none" href="/events">
        Explore Events <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </section>
    <div className="flex items-end justify-between gap-4">
      <div><p className="text-sm font-semibold text-violet-700">WHAT'S HAPPENING</p><h2 className="mt-2 text-2xl font-bold">Upcoming events</h2></div>
      <Link className="text-sm font-semibold text-violet-700" href="/events">All events →</Link>
    </div>
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => <article className="rounded-2xl border border-slate-200 bg-[#E0E0E1] p-6 transition hover:-translate-y-1 hover:shadow-lg" key={event.id}><p className="text-sm font-medium text-violet-700">{event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p><h3 className="mt-3 text-xl font-bold">{event.title}</h3><p className="mt-2 text-sm text-slate-500">{event.venue}</p><p className="mt-4 text-sm text-slate-600">{event._count.registrations} registered</p><Link className="mt-5 inline-block text-sm font-semibold text-violet-700" href="/events">View event →</Link></article>)}
      {events.length === 0 && <p className="text-slate-500">No published events yet. Check back soon.</p>}
    </div>
  </main>;
}
