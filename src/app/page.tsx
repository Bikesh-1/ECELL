import Link from "next/link";
import { prisma } from "@/lib/prisma";
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
        <section className="mx-auto mt-5 flex max-w-5xl flex-col items-center px-5 py-10 text-center sm:px-10 sm:py-14 lg:py-16">
          <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#171717] bg-white p-3 shadow-[0_5px_0_#171717] sm:h-24 sm:w-24">
            <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg" alt="E-Cell SMVIT logo" className="h-full w-full object-contain" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#6D4DFE] sm:text-xs">Entrepreneurship Cell · SMVIT</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2rem,4.4vw,4rem)] font-black leading-[1.04] tracking-[-.065em] text-[#171717]">
            Where ideas meet <span className="text-[#6D4DFE]">opportunity.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[#686870] sm:text-base">
            A space for curious minds, bold builders and future founders to connect, create and turn ambition into action.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/events" className="inline-flex min-h-11 items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-2.5 text-sm font-black text-white shadow-[0_4px_0_#171717] transition-all hover:-translate-y-1 hover:bg-white hover:text-[#6D4DFE] active:translate-y-1 active:shadow-none">
              Explore events <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/signup" className="inline-flex min-h-11 items-center rounded-xl border-2 border-[#171717] bg-white px-5 py-2.5 text-sm font-black text-[#171717] shadow-[0_4px_0_#171717] transition-all hover:-translate-y-1 hover:bg-[#6D4DFE] hover:text-white active:translate-y-1 active:shadow-none">
              Join the community
            </Link>
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
            <div key={item.label} className="rounded-xl border-2 border-[#171717] bg-white px-5 py-5 shadow-[0_5px_0_#171717]">
              <p className="text-2xl font-black tracking-tight text-[#6D4DFE] sm:text-3xl">{item.value}</p>
              <p className="mt-1 text-xs font-medium text-[#77777d]">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="py-16 sm:py-20">
          <div className="flex flex-col justify-between gap-5 border-b border-[#171717]/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#6D4DFE]">Make your next move</p>
              <h2 className="mt-2 text-4xl font-bold leading-tight tracking-[-.055em] sm:text-5xl">Happening<span className="text-[#6D4DFE]">.</span></h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-[#686870]">Workshops, challenges and experiences to help your curiosity go somewhere.</p>
            </div>
            <Link href="/events" className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#6D4DFE] transition-colors hover:bg-white/60">View all events <span>↗</span></Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article key={event.id} className="group flex min-h-[260px] flex-col rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_6px_0_#171717] transition-all hover:-translate-y-1 hover:shadow-[0_9px_0_#171717]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-lg border-2 border-[#171717] bg-[#6D4DFE] px-3 py-1.5 text-[10px] font-black text-[#171717]">UPCOMING EVENT</span>
                  <span className="text-lg text-[#6D4DFE]">↗</span>
                </div>
                <div className="mt-7">
                  <p className="text-xs font-semibold text-[#6D4DFE]">{event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                  <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-[#171717]">{event.title}</h3>
                  <p className="mt-2 text-sm text-[#77777d]">{event.venue}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[#171717]/10 pt-4">
                  <p className="text-xs text-[#77777d]">{event._count.registrations} registered</p>
                  <Link href="/events" className="text-xs font-semibold text-[#6D4DFE] hover:text-[#6D4DFE]">Discover →</Link>
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

        <section className="rounded-[26px] border-2 border-[#171717] bg-[#171717] px-7 py-10 text-white shadow-[0_8px_0_#6D4DFE] sm:px-10 sm:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#B4A4FF]">Your idea has a place here</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-.045em] sm:text-5xl">Don't just watch what's next. <span className="text-[#B4A4FF]">Be part of it.</span></h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">Meet the people who will challenge your thinking, back your ideas and build alongside you.</p>
            <Link href="/signup" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-3 text-sm font-black text-[#171717] shadow-[0_5px_0_#6D4DFE] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_7px_0_#6D4DFE]">Join the community <span>↗</span></Link>
          </div>
        </section>

        <footer className="flex flex-col gap-3 pt-8 text-xs text-[#77777d] sm:flex-row sm:items-center sm:justify-between">
          <span>E-Cell · SMVIT Bengaluru</span><span>Think different. Build together.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
            <Link href="/about" className="text-[#6D4DFE] hover:text-[#6D4DFE]">About E-Cell</Link>
            <Link href="/startups" className="text-[#6D4DFE] hover:text-[#6D4DFE]">Startups backed by E-Cell</Link>
            <Link href="/team" className="text-[#6D4DFE] hover:text-[#6D4DFE]">Meet our team</Link>
            <Link href="/contact" className="text-[#6D4DFE] hover:text-[#6D4DFE]">Contact us</Link>
          </div>
        </footer>
      </div>
      <HomeMotion />
    </main>
  );
}
