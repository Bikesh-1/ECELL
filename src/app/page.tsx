import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FloatingEcellCard from "@/components/floating-ecell-card";
import HomeMotion from "@/components/home-motion";
import EcellScrollStory from "@/components/ecell-scroll-story";

export default async function Home() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { eventDate: "asc" },
    take: 6,
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <main className="min-h-screen overflow-x-clip bg-[#E0E0E1] text-[#171717]">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 lg:px-10">
        <section className="grid min-h-[610px] items-center gap-12 border-b border-[#171717]/10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-white/70 px-3 py-2 text-[11px] font-semibold text-[#55555d]">
              <span className="h-2 w-2 rounded-full bg-[#6D4DFE]" />
              Entrepreneurship Cell · SMVIT
            </p>
            <p className="mt-9 text-xs font-bold uppercase tracking-[.18em] text-[#6D4DFE]">Ideas deserve a bigger stage.</p>
            <h1 className="mt-4 text-[clamp(3.2rem,7.5vw,6.8rem)] font-extrabold leading-[.94] tracking-[-.075em]">
              Think beyond<br />
              <span className="text-[#6D4DFE]">the usual.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#62626a] sm:text-lg">
              A launchpad for curious minds, bold builders and future founders. Find your people, turn ideas into action, and make things happen.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/events" className="inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#6D4DFE] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5B3FE0]">
                Explore events <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/signup" className="inline-flex min-h-11 items-center rounded-lg border border-[#171717]/15 bg-white/70 px-5 py-3 text-sm font-semibold text-[#171717] transition-colors hover:border-[#6D4DFE]/40 hover:text-[#6D4DFE]">
                Join the community
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#171717]/10 pt-5 text-xs font-semibold text-[#77777d]">
              <span>Build</span><span className="h-1 w-1 rounded-full bg-[#FF5A36]" />
              <span>Connect</span><span className="h-1 w-1 rounded-full bg-[#FF5A36]" />
              <span>Launch</span><span className="ml-auto text-[#6D4DFE]">Bengaluru · India</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-5 rounded-[32px] bg-[#6D4DFE]/[0.06]" />
            <div className="relative">
              <FloatingEcellCard />
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-lg bg-[#FF5A36] px-4 py-3 text-xs font-bold text-[#171717] shadow-sm sm:right-0">
              Made of ideas. Built together.
            </div>
          </div>
        </section>

        <EcellScrollStory />

        <section className="grid grid-cols-2 gap-3 py-10 sm:grid-cols-4">
          {[
            { value: "01", label: "One community" },
            { value: "∞", label: "Ideas to explore" },
            { value: "BOLD", label: "Minds at work" },
            { value: "YOU", label: "Belong here" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-[#171717]/10 bg-white/80 px-5 py-5">
              <p className="text-2xl font-bold tracking-tight text-[#6D4DFE] sm:text-3xl">{item.value}</p>
              <p className="mt-1 text-xs font-medium text-[#77777d]">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="py-16 sm:py-20">
          <div className="flex flex-col justify-between gap-5 border-b border-[#171717]/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#6D4DFE]">Make your next move</p>
              <h2 className="mt-2 text-4xl font-bold leading-tight tracking-[-.055em] sm:text-5xl">Happening<span className="text-[#FF5A36]">.</span></h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-[#686870]">Workshops, challenges and experiences to help your curiosity go somewhere.</p>
            </div>
            <Link href="/events" className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#6D4DFE] transition-colors hover:bg-white/60">View all events <span>↗</span></Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article key={event.id} className="group flex min-h-[260px] flex-col rounded-2xl border border-[#171717]/10 bg-white/85 p-6 transition-all hover:-translate-y-1 hover:border-[#6D4DFE]/30 hover:shadow-lg hover:shadow-[#171717]/5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#6D4DFE]/[0.08] px-3 py-1.5 text-[10px] font-semibold text-[#6D4DFE]">Upcoming event</span>
                  <span className="text-lg text-[#FF5A36]">↗</span>
                </div>
                <div className="mt-7">
                  <p className="text-xs font-semibold text-[#6D4DFE]">{event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                  <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-[#171717]">{event.title}</h3>
                  <p className="mt-2 text-sm text-[#77777d]">{event.venue}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[#171717]/10 pt-4">
                  <p className="text-xs text-[#77777d]">{event._count.registrations} registered</p>
                  <Link href="/events" className="text-xs font-semibold text-[#6D4DFE] hover:text-[#FF5A36]">Discover →</Link>
                </div>
              </article>
            ))}
            {events.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-[#171717]/20 bg-white/50 px-6 py-12 text-center">
                <p className="text-lg font-semibold">Something exciting is brewing.</p>
                <p className="mt-2 text-sm text-[#77777d]">No published events just yet. Check back soon.</p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-[#171717] px-7 py-10 text-white sm:px-10 sm:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#FF8B72]">Your idea has a place here</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-.045em] sm:text-5xl">Don't just watch what's next. <span className="text-[#B4A4FF]">Be part of it.</span></h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">Meet the people who will challenge your thinking, back your ideas and build alongside you.</p>
            <Link href="/signup" className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#FF5A36] px-5 py-3 text-sm font-semibold text-[#171717] transition-colors hover:bg-white">Join the community <span>↗</span></Link>
          </div>
        </section>

        <footer className="flex flex-col gap-3 pt-8 text-xs text-[#77777d] sm:flex-row sm:items-center sm:justify-between">
          <span>E-Cell · SMVIT Bengaluru</span><span>Think different. Build together.</span>
          <Link href="/events" className="font-semibold text-[#6D4DFE] hover:text-[#FF5A36]">Explore the ecosystem ↗</Link>
        </footer>
      </div>
      <HomeMotion />
    </main>
  );
}
