"use client"
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FloatingEcellCard from "@/components/floating-ecell-card";

export default async function Home() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { eventDate: "asc" },
    take: 6,
<<<<<<< HEAD
    include: {
      _count: {
        select: { registrations: true },
      },
    },
=======
    include: { _count: { select: { registrations: true } } },
>>>>>>> ae57e65dd9274a37015544b64ab523ad472f101e
  });

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#E0E0E1] p-4">
<<<<<<< HEAD

      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        {/* Soft ambient glow */}
        <div className="ambient-glow absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#6D4DFE]/20 blur-[120px]" />

        <div className="ambient-glow-two absolute -right-40 top-[15%] h-[500px] w-[500px] rounded-full bg-[#FF5A36]/15 blur-[130px]" />

        <div className="ambient-glow-three absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#6D4DFE]/15 blur-[120px]" />

        {/* Moving sunlight beams */}
        <div className="sunlight-beam absolute -left-[20%] top-[-30%] h-[150%] w-[35%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/30 to-transparent blur-3xl" />

        <div className="sunlight-beam-two absolute -right-[20%] top-[-20%] h-[140%] w-[25%] -rotate-[25deg] bg-gradient-to-r from-transparent via-[#FF5A36]/10 to-transparent blur-3xl" />

        {/* Fine texture */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#171717_0.6px,transparent_0.6px)] [background-size:22px_22px]" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#E0E0E1]/40" />
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center py-20 text-center sm:py-28">

        <div className="hero-enter relative z-10 inline-flex items-center gap-4 rounded-full border border-black/10 bg-white/80 px-7 py-4 shadow-lg shadow-black/5 backdrop-blur-xl">
          <img
            src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
            alt="E-Cell SMVIT"
            className="h-8 w-8 object-contain"
          />

          <p className="text-sm tracking-tight text-[#171717]">
            E-Cell | SMVIT Bengaluru
          </p>
        </div>

        <h1 className="hero-enter relative z-10 mt-8 max-w-7xl text-4xl font-black leading-[1.02] tracking-tight text-[#171717] sm:text-7xl lg:text-8xl">
          WHERE ASPIRATION
          <br />
          <span className="relative inline-block text-[#6D4DFE]">
            MEETS OPPORTUNITY.
            <span className="absolute -bottom-2 left-0 h-1 w-full origin-left scale-x-0 rounded-full bg-[#FF5A36] animate-underline" />
          </span>
        </h1>

        <p className="hero-enter relative z-10 mt-7 max-w-xl px-4 text-sm leading-7 text-[#555] sm:text-base">
          Empowering innovators, connecting entrepreneurs, and building
          the next generation of leaders.
        </p>

        <Link
          className="hero-enter group relative z-10 mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-7 py-4 font-bold text-white shadow-[0_5px_0_#171717] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171717] hover:shadow-[0_7px_0_#6D4DFE] active:translate-y-1 active:shadow-none"
          href="/events"
        >
          Explore Events
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>

        {/* Decorative floating label */}
        <div className="absolute left-[8%] top-[35%] hidden rounded-xl border border-white/70 bg-white/50 px-4 py-3 text-xs font-bold text-[#6D4DFE] shadow-lg backdrop-blur-xl lg:block float-slow">
          THINK BIG.
        </div>

        <div className="absolute right-[8%] bottom-[20%] hidden rounded-xl border border-white/70 bg-white/50 px-4 py-3 text-xs font-bold text-[#FF5A36] shadow-lg backdrop-blur-xl lg:block float-slow-two">
          BUILD BOLD.
        </div>
      </section>
<div className="relative z-10 w-full lg:w-auto">
    <FloatingEcellCard />
  </div>
      {/* Events */}
      <section className="relative z-10 mx-auto max-w-7xl pb-16">

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-widest text-[#6D4DFE]">
              WHAT'S HAPPENING
            </p>

=======
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="ambient-glow absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#6D4DFE]/10 blur-[140px]" />
        <div className="ambient-glow-two absolute -right-40 top-[15%] h-[500px] w-[500px] rounded-full bg-[#FF5A36]/[0.07] blur-[150px]" />
        <div className="ambient-glow-three absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#6D4DFE]/[0.07] blur-[140px]" />
        <div className="sunlight-beam absolute -left-[20%] top-[-30%] h-[150%] w-[35%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl" />
        <div className="sunlight-beam-two absolute -right-[20%] top-[-20%] h-[140%] w-[25%] -rotate-[25deg] bg-gradient-to-r from-transparent via-[#FF5A36]/[0.05] to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(#171717_0.6px,transparent_0.6px)] [background-size:24px_24px]" />
      </div>

      <section className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 py-14 sm:py-20 lg:flex-row lg:gap-8">
        <div className="relative z-10 flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-4 rounded-full border border-white bg-white/75 px-7 py-4 shadow-sm backdrop-blur-xl">
            <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995" alt="E-Cell SMVIT" className="h-8 w-8 object-contain" />
            <p className="text-sm tracking-tight text-[#171717]">E-Cell | SMVIT Bengaluru</p>
          </div>

          <h1 className="mt-8 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-[#171717] sm:text-6xl lg:text-7xl xl:text-8xl">
            WHERE ASPIRATION
            <br />
            <span className="text-[#6D4DFE]">MEETS OPPORTUNITY.</span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-[#555] sm:text-base">
            Empowering innovators, connecting entrepreneurs, and building the next generation of leaders.
          </p>

          <Link className="group mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-7 py-4 font-bold text-white shadow-[0_5px_0_#171717] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171717] hover:shadow-[0_7px_0_#6D4DFE] active:translate-y-1 active:shadow-none" href="/events">
            Explore Events
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>

        <div className="relative z-10 w-full lg:w-auto">
          <FloatingEcellCard />
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-widest text-[#6D4DFE]">WHAT'S HAPPENING</p>
>>>>>>> ae57e65dd9274a37015544b64ab523ad472f101e
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#171717] sm:text-4xl">
              Upcoming Events<span className="text-[#FF5A36]">.</span>
            </h2>
          </div>
<<<<<<< HEAD

          <Link
            className="whitespace-nowrap text-sm font-bold text-[#6D4DFE] transition-colors hover:text-[#FF5A36]"
            href="/events"
          >
            All events →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {events.map((event, index) => (
            <article
              className="event-card group relative overflow-hidden rounded-2xl border-2 border-[#171717]/10 bg-white/65 p-6 shadow-[0_5px_0_rgba(23,23,23,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#6D4DFE]/50 hover:shadow-[0_10px_0_rgba(109,77,254,0.15)]"
              style={{ animationDelay: `${index * 100}ms` }}
              key={event.id}
            >
              <div className="absolute right-0 top-0 h-28 w-28 translate-x-12 -translate-y-12 rounded-full bg-[#6D4DFE]/10 blur-2xl transition-all duration-500 group-hover:bg-[#FF5A36]/20" />

              <div className="relative">
                <p className="text-sm font-bold text-[#6D4DFE]">
                  {event.eventDate.toLocaleDateString("en-IN", {
                    dateStyle: "medium",
                  })}
                </p>

                <h3 className="mt-4 text-xl font-black text-[#171717] transition-colors group-hover:text-[#6D4DFE]">
                  {event.title}
                </h3>

                <p className="mt-2 text-sm text-[#666]">
                  {event.venue}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                  <p className="text-xs font-semibold text-[#777]">
                    {event._count.registrations} registered
                  </p>

                  <Link
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#171717] transition-all group-hover:gap-3 group-hover:text-[#6D4DFE]"
                    href="/events"
                  >
                    Explore <span>→</span>
                  </Link>
=======
          <Link className="whitespace-nowrap text-sm font-bold text-[#6D4DFE] transition-colors hover:text-[#FF5A36]" href="/events">All events →</Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article key={event.id} className="group relative overflow-hidden rounded-2xl border-2 border-[#171717]/10 bg-white/65 p-6 shadow-[0_5px_0_rgba(23,23,23,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#6D4DFE]/50 hover:shadow-[0_10px_0_rgba(109,77,254,0.15)]">
              <div className="absolute right-0 top-0 h-28 w-28 translate-x-12 -translate-y-12 rounded-full bg-[#6D4DFE]/10 blur-2xl transition-all duration-500 group-hover:bg-[#FF5A36]/20" />
              <div className="relative">
                <p className="text-sm font-bold text-[#6D4DFE]">{event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                <h3 className="mt-4 text-xl font-black text-[#171717] transition-colors group-hover:text-[#6D4DFE]">{event.title}</h3>
                <p className="mt-2 text-sm text-[#666]">{event.venue}</p>
                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                  <p className="text-xs font-semibold text-[#777]">{event._count.registrations} registered</p>
                  <Link className="inline-flex items-center gap-2 text-sm font-bold text-[#171717] transition-all group-hover:gap-3 group-hover:text-[#6D4DFE]" href="/events">Explore <span>→</span></Link>
>>>>>>> ae57e65dd9274a37015544b64ab523ad472f101e
                </div>
              </div>
            </article>
          ))}
<<<<<<< HEAD

          {events.length === 0 && (
            <p className="text-[#666]">
              No published events yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes ambientMove {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(65px, 45px, 0) scale(1.15);
          }
        }

        @keyframes ambientMoveTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-55px, -45px, 0) scale(1.2);
          }
        }

        @keyframes beamMove {
          0% {
            transform: translateX(-30%) rotate(25deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(180%) rotate(25deg);
            opacity: 0;
          }
        }

        @keyframes beamMoveTwo {
          0% {
            transform: translateX(30%) rotate(-25deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-180%) rotate(-25deg);
            opacity: 0;
          }
        }

        @keyframes heroEnter {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes underline {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        .ambient-glow {
          animation: ambientMove 12s ease-in-out infinite;
        }

        .ambient-glow-two {
          animation: ambientMoveTwo 15s ease-in-out infinite;
        }

        .ambient-glow-three {
          animation: ambientMove 18s ease-in-out infinite reverse;
        }

        .sunlight-beam {
          animation: beamMove 16s ease-in-out infinite;
        }

        .sunlight-beam-two {
          animation: beamMoveTwo 20s ease-in-out infinite;
        }

        .hero-enter {
          animation: heroEnter 0.9s cubic-bezier(.2,.7,.2,1) both;
        }

        .animate-underline {
          animation: underline 1s ease-out 1s forwards;
        }

        .float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }

        .float-slow-two {
          animation: floatSlow 6s ease-in-out infinite reverse;
        }

        .event-card {
          animation: heroEnter 0.7s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
=======
          {events.length === 0 && <p className="text-[#666]">No published events yet. Check back soon.</p>}
        </div>
      </section>

      <style jsx global>{`
        @keyframes ambientMove {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(55px,35px,0) scale(1.12); }
        }
        @keyframes ambientMoveTwo {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-45px,-35px,0) scale(1.15); }
        }
        @keyframes beamMove {
          0% { transform: translateX(-30%) rotate(25deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(180%) rotate(25deg); opacity: 0; }
        }
        @keyframes beamMoveTwo {
          0% { transform: translateX(30%) rotate(-25deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-180%) rotate(-25deg); opacity: 0; }
        }
        .ambient-glow { animation: ambientMove 14s ease-in-out infinite; }
        .ambient-glow-two { animation: ambientMoveTwo 17s ease-in-out infinite; }
        .ambient-glow-three { animation: ambientMove 20s ease-in-out infinite reverse; }
        .sunlight-beam { animation: beamMove 18s ease-in-out infinite; }
        .sunlight-beam-two { animation: beamMoveTwo 22s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ambient-glow, .ambient-glow-two, .ambient-glow-three, .sunlight-beam, .sunlight-beam-two { animation: none !important; }
>>>>>>> ae57e65dd9274a37015544b64ab523ad472f101e
        }
      `}</style>
    </main>
  );
}
