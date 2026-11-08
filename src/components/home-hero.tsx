"use client";

import Link from "next/link";
import { useRef } from "react";
const photos = [
  {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=85",
    alt: "Students collaborating on an idea",
    label: "Build together",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=85",
    alt: "Entrepreneurship workshop and discussion",
    label: "Make it happen",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=85",
    alt: "Team planning a startup project",
    label: "Think bigger",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=85",
    alt: "Founders working together around a table",
    label: "Create impact",
  },
];

function PhotoCard({ photo }: { photo: (typeof photos)[number] }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border-2 border-[#171717] bg-white p-2 shadow-[0_6px_0_#171717]">
      <img src={photo.src} alt={photo.alt} className="h-24 w-full rounded-lg object-cover sm:h-28" />
      <p className="px-2 pb-1 pt-2 text-left text-[10px] font-black uppercase tracking-wider text-[#6D4DFE] sm:text-xs">{photo.label}</p>
    </div>
  );
}

export default function HomeHero() {
  const loaderRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section
        className="relative isolate mx-auto mt-5 flex min-h-[680px] max-w-7xl flex-col items-center justify-center overflow-hidden px-5 py-16 text-center sm:min-h-[720px] sm:px-10"
        style={{ backgroundImage: "radial-gradient(#6D4DFE22 1.15px, transparent 1.15px)", backgroundSize: "19px 19px" }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#E0E0E1]/30 to-transparent" />
        <div className="relative z-10 mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#171717] bg-white p-3 shadow-[0_5px_0_#171717] sm:h-24 sm:w-24">
          <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg" alt="E-Cell SMVIT logo" className="h-full w-full object-contain" />
        </div>
        <p className="relative z-10 text-[10px] font-black uppercase tracking-[.22em] text-[#6D4DFE] sm:text-xs">Entrepreneurship Cell · SMVIT</p>
        <h1 className="relative z-10 mt-5 max-w-4xl text-[clamp(2rem,4.4vw,4rem)] font-black uppercase leading-[1.02] tracking-[-.065em] text-[#171717]">
          <span className="block normal-case">Where ideas</span>
          <span className="block text-[#6D4DFE]">MEET OPPORTUNITY.</span>
        </h1>
        <p className="relative z-10 mt-5 max-w-xl text-sm font-medium leading-7 text-[#686870] sm:text-base">
          A space for curious minds, bold builders and future founders to connect, create and turn ambition into action.
        </p>
        <div className="relative z-10 mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/events" className="inline-flex min-h-11 items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-2.5 text-sm font-black text-white shadow-[0_4px_0_#171717] transition-all hover:-translate-y-1 hover:bg-white hover:text-[#6D4DFE] active:translate-y-1 active:shadow-none">
            Explore events <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/signup" className="inline-flex min-h-11 items-center rounded-xl border-2 border-[#171717] bg-white px-5 py-2.5 text-sm font-black text-[#171717] shadow-[0_4px_0_#171717] transition-all hover:-translate-y-1 hover:bg-[#6D4DFE] hover:text-white active:translate-y-1 active:shadow-none">
            Join the community
          </Link>
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          <div className="absolute left-8 top-12 w-44 -rotate-6 xl:left-12 xl:w-52">
            <PhotoCard photo={photos[0]} />
          </div>
          <div className="absolute bottom-12 left-8 w-44 rotate-6 xl:bottom-14 xl:left-12 xl:w-52">
            <PhotoCard photo={photos[1]} />
          </div>
          <div className="absolute right-8 top-12 w-44 rotate-6 xl:right-12 xl:w-52">
            <PhotoCard photo={photos[2]} />
          </div>
          <div className="absolute bottom-12 right-8 w-44 -rotate-6 xl:bottom-14 xl:right-12 xl:w-52">
            <PhotoCard photo={photos[3]} />
          </div>
        </div>
        <div className="relative z-10 mt-8 grid w-full max-w-sm grid-cols-2 gap-4 lg:hidden">
          <PhotoCard photo={photos[0]} />
          <PhotoCard photo={photos[2]} />
        </div>
      </section>

      <div
        ref={loaderRef}
        className="ecell-welcome-loader fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#E0E0E1]"
        aria-label="Welcome to E-Cell SMVIT"
        role="status"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(#6D4DFE2b 1.2px, transparent 1.2px)", backgroundSize: "19px 19px" }} />
        <div data-welcome className="relative z-10 flex flex-col items-center px-6 text-center">
          <div data-loader-mark className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#171717] bg-white p-3 shadow-[0_5px_0_#171717] sm:h-24 sm:w-24">
            <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg" alt="" className="h-full w-full object-contain" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#6D4DFE] sm:text-xs">Entrepreneurship Cell · SMVIT</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-.06em] text-[#171717] sm:text-6xl">WELCOME TO <span className="text-[#6D4DFE]">SMVIT.</span></h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[.18em] text-[#686870]">Ideas start here. Futures take shape.</p>
        </div>
        <div data-intro-photo className="absolute left-[5vw] top-[58%] w-[34vw] max-w-[210px] -rotate-6 sm:left-[9vw] sm:top-[55%] sm:w-[23vw]">
          <PhotoCard photo={photos[0]} />
        </div>
        <div data-intro-photo className="absolute right-[5vw] top-[24%] w-[34vw] max-w-[210px] rotate-6 sm:right-[9vw] sm:top-[23%] sm:w-[23vw]">
          <PhotoCard photo={photos[1]} />
        </div>
      </div>
      <style>{`\n        @keyframes ecellWelcomeExit {\n          0%, 72% { opacity: 1; visibility: visible; }\n          100% { opacity: 0; visibility: hidden; }\n        }\n        @keyframes ecellWelcomeText {\n          0% { opacity: 0; transform: translateY(22px); }\n          15%, 70% { opacity: 1; transform: translateY(0); }\n          100% { opacity: 0; transform: translateY(-18px); }\n        }\n        @keyframes ecellIntroLeft {\n          0%, 16% { transform: translate3d(0, 0, 0) rotate(-9deg) scale(.92); }\n          72% { transform: translate3d(12vw, -7vh, 0) rotate(0deg) scale(1); }\n          100% { transform: translate3d(12vw, -7vh, 0) rotate(0deg) scale(1); }\n        }\n        @keyframes ecellIntroRight {\n          0%, 16% { transform: translate3d(0, 0, 0) rotate(9deg) scale(.92); }\n          72% { transform: translate3d(-12vw, 7vh, 0) rotate(0deg) scale(1); }\n          100% { transform: translate3d(-12vw, 7vh, 0) rotate(0deg) scale(1); }\n        }\n        .ecell-welcome-loader { animation: ecellWelcomeExit 3.8s ease forwards; }\n        .ecell-welcome-loader [data-welcome] { animation: ecellWelcomeText 3.5s ease both; }\n        .ecell-welcome-loader [data-intro-photo]:nth-child(3) { animation: ecellIntroLeft 3.5s cubic-bezier(.7,0,.2,1) both; }\n        .ecell-welcome-loader [data-intro-photo]:nth-child(4) { animation: ecellIntroRight 3.5s cubic-bezier(.7,0,.2,1) both; }\n        @media (prefers-reduced-motion: reduce) { .ecell-welcome-loader { animation-duration: 1ms; } }\n      `}</style>\n    </>
  );
}
