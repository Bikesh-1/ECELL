import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FloatingEcellCard from "@/components/floating-ecell-card";
import HomeMotion from "@/components/home-motion";
import InteractiveDotField from "@/components/interactive-dot-field";
import EcellScrollStory from "@/components/ecell-scroll-story";

export default async function Home() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { eventDate: "asc" },
    take: 6,
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#E0E0E1] text-[#171717]">
      <InteractiveDotField />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <section className="hero-section relative grid min-h-[680px] items-center gap-8 border-b border-[#171717]/15 pb-16 pt-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 lg:pb-20 lg:pt-12">
          <div className="hero-content relative z-10">
            <div className="hero-badge inline-flex items-center gap-3 rounded-full border border-[#171717]/15 bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6D4DFE] opacity-40" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#6D4DFE]" /></span>
              <span className="text-[10px] font-black uppercase tracking-[.22em] text-[#44444b]">Entrepreneurship Cell · SMVIT</span>
            </div>

            <p className="hero-eyebrow mt-10 text-[11px] font-black uppercase tracking-[.32em] text-[#6D4DFE]">Ideas deserve a bigger stage.</p>
            <h1 className="hero-title mt-5 max-w-4xl text-[clamp(3.25rem,8vw,7.4rem)] font-black leading-[.88] tracking-[-.085em]">
              THINK<br />
              <span className="relative inline-block text-[#6D4DFE]">BEYOND<span className="absolute -right-5 -top-2 text-[.28em] tracking-normal text-[#FF5A36]">✳</span></span><br />
              <span className="text-[#171717]">THE USUAL.</span>
            </h1>
            <p className="hero-description mt-8 max-w-xl text-base leading-8 text-[#62626a] sm:text-lg">
              A launchpad for curious minds, bold builders and future founders. Find your people, turn ideas into action, and make things happen.
            </p>

            <div className="hero-actions mt-9 flex flex-wrap items-center gap-4">
              <Link href="/events" className="group inline-flex items-center gap-5 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-6 py-4 text-sm font-black text-white shadow-[0_5px_0_#171717] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171717] hover:shadow-[0_7px_0_#6D4DFE] active:translate-y-1 active:shadow-none">
                Explore events <span className="text-lg transition-transform duration-300 group-hover:translate-x-1.5">↗</span>
              </Link>
              <Link href="/signup" className="group inline-flex items-center gap-2 px-3 py-3 text-sm font-black text-[#171717] transition-colors hover:text-[#FF5A36]">
                Join the community <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="hero-footnote mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#171717]/15 pt-5 text-[10px] font-black uppercase tracking-[.2em] text-[#77777d]">
              <span>Build</span><span className="h-1 w-1 rounded-full bg-[#FF5A36]" /><span>Connect</span><span className="h-1 w-1 rounded-full bg-[#FF5A36]" /><span>Launch</span>
              <span className="ml-auto hidden text-[#6D4DFE] sm:block">Bengaluru · India</span>
            </div>
          </div>

          <div className="hero-visual relative z-10 mx-auto flex w-full max-w-[570px] items-center justify-center lg:mx-0 lg:ml-auto">
            <div data-parallax data-speed="-.12" className="absolute left-[2%] top-[4%] h-24 w-24 rounded-full border border-[#6D4DFE]/25" />
            <div data-parallax data-speed=".10" className="absolute right-[3%] top-[16%] rotate-12 rounded-2xl border border-[#171717]/10 bg-white/65 px-4 py-3 shadow-lg backdrop-blur-xl">
              <p className="text-[9px] font-black tracking-[.22em] text-[#6D4DFE]">IDEATE</p><p className="mt-1 text-xs font-bold">Make it real.</p>
            </div>
            <div className="absolute bottom-[7%] left-[1%] z-20 -rotate-6 rounded-2xl border border-[#171717] bg-[#FF5A36] px-4 py-3 shadow-[0_5px_0_#171717]">
              <p className="text-[9px] font-black tracking-[.2em]">MADE OF IDEAS</p><p className="mt-1 text-sm font-black">Built together.</p>
            </div>
            <div className="absolute right-[4%] top-[8%] -z-10 h-[78%] w-[78%] rotate-[9deg] rounded-[42px] border border-[#6D4DFE]/20 bg-[#6D4DFE]/[0.035]" />
            <div className="absolute bottom-[5%] right-[7%] -z-10 h-[65%] w-[65%] -rotate-[8deg] rounded-[38px] border border-[#FF5A36]/25" />
            <FloatingEcellCard />
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute -bottom-2 right-[2%] hidden select-none text-[clamp(5rem,16vw,15rem)] font-black leading-none tracking-[-.1em] text-[#171717]/[0.035] xl:block">CREATE.</div>
        </section>

        <EcellScrollStory />

        <section className="impact-strip relative z-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border-2 border-[#171717] bg-[#171717] shadow-[0_6px_0_#171717] sm:grid-cols-4">
          {[
            { value: "01", label: "One community" },
            { value: "∞", label: "Ideas to explore" },
            { value: "BOLD", label: "Minds at work" },
            { value: "YOU", label: "Belong here" },
          ].map((item) => <div key={item.label} className="bg-white/90 px-5 py-5 sm:px-7 sm:py-6">
            <p className="text-2xl font-black tracking-tight text-[#6D4DFE] sm:text-3xl">{item.value}</p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[.15em] text-[#77777d]">{item.label}</p>
          </div>)}
        </section>

        <section className="events-section relative z-10 py-24 sm:py-28">
          <div className="events-heading flex flex-col justify-between gap-6 border-b border-[#171717]/15 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#6D4DFE]">Make your next move</p>
              <h2 className="mt-3 text-4xl font-black leading-none tracking-[-.06em] sm:text-6xl">HAPPENING<span className="text-[#FF5A36]">.</span></h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#686870]">Workshops, challenges and experiences to help your curiosity go somewhere.</p>
            </div>
            <Link href="/events" className="group inline-flex w-fit items-center gap-4 border-b-2 border-[#171717] pb-2 text-xs font-black uppercase tracking-[.13em] transition-colors hover:border-[#6D4DFE] hover:text-[#6D4DFE]">View all events <span className="text-lg transition-transform group-hover:translate-x-1">↗</span></Link>
          </div>

          <div className="events-grid mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
              <article key={event.id} className="event-card group relative flex min-h-[300px] flex-col overflow-hidden rounded-[22px] border-2 border-[#171717]/15 bg-white/75 p-6 shadow-[0_5px_0_rgba(23,23,23,.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#6D4DFE]/60 hover:shadow-[0_10px_0_rgba(109,77,254,.15)] sm:p-7">
                <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#6D4DFE]/[0.08] blur-2xl transition-colors duration-500 group-hover:bg-[#FF5A36]/20" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full border border-[#6D4DFE]/25 bg-[#6D4DFE]/[0.07] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.18em] text-[#6D4DFE]">Upcoming · {String(index + 1).padStart(2, "0")}</span>
                  <span className="text-2xl font-black text-[#171717]/20 transition-colors group-hover:text-[#FF5A36]">↗</span>
                </div>
                <div className="relative mt-8">
                  <p className="text-xs font-black uppercase tracking-[.14em] text-[#6D4DFE]">{event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-.04em] text-[#171717] transition-colors group-hover:text-[#6D4DFE]">{event.title}</h3>
                  <p className="mt-2 text-sm text-[#77777d]">{event.venue}</p>
                </div>
                <div className="relative mt-auto flex items-center justify-between border-t border-[#171717]/10 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#77777d]">{event._count.registrations} registered</p>
                  <Link href="/events" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-[#171717] transition-all group-hover:gap-3 group-hover:text-[#6D4DFE]">Discover <span>→</span></Link>
                </div>
              </article>
            ))}
            {events.length === 0 && <div className="col-span-full rounded-2xl border-2 border-dashed border-[#171717]/20 bg-white/50 px-6 py-12 text-center"><p className="text-lg font-black">Something exciting is brewing.</p><p className="mt-2 text-sm text-[#77777d]">No published events just yet. Check back soon.</p></div>}
          </div>
        </section>

        <section className="closing-cta relative overflow-hidden rounded-[28px] border-2 border-[#171717] bg-[#171717] px-7 py-12 text-white shadow-[0_7px_0_#6D4DFE] sm:px-12 sm:py-16">
          <div aria-hidden="true" className="absolute -right-16 -top-32 h-80 w-80 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -right-2 -top-14 h-56 w-56 rounded-full border border-white/10" />
          <div className="relative z-10 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#FF8B72]">Your idea has a place here</p>
            <h2 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.06em] sm:text-6xl">DON'T JUST<br /><span className="text-[#B4A4FF]">WATCH WHAT'S NEXT.</span></h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">Meet the people who will challenge your thinking, back your ideas and build alongside you.</p>
            <Link href="/signup" className="group mt-8 inline-flex items-center gap-5 rounded-xl border-2 border-white bg-[#FF5A36] px-6 py-4 text-sm font-black text-[#171717] shadow-[0_5px_0_#6D4DFE] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_7px_0_#FF5A36]">Be part of it <span className="text-lg transition-transform group-hover:translate-x-1.5">↗</span></Link>
          </div>
          <div aria-hidden="true" className="absolute bottom-5 right-8 hidden rotate-12 text-[150px] font-black leading-none text-[#6D4DFE]/25 sm:block">✳</div>
        </section>

        <footer className="flex flex-col gap-3 pt-9 text-[10px] font-black uppercase tracking-[.18em] text-[#77777d] sm:flex-row sm:items-center sm:justify-between">
          <span>E-Cell · SMVIT Bengaluru</span><span>Think different. Build together.</span><Link href="/events" className="transition-colors hover:text-[#6D4DFE]">Explore the ecosystem ↗</Link>
        </footer>
      </div>
      <HomeMotion />
    </main>
  );
}

