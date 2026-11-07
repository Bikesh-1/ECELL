import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/signout-button";

export default async function Home() {
  const session = await auth();
  const events = await prisma.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { eventDate: "asc" }, take: 6, include: { _count: { select: { registrations: true } } } });
  return <main className="mx-auto max-w-screen p-4 bg-[#E0E0E1] z-10">
     <div className="pointer-events-none absolute inset-0">

  </div>
    <header className="flex flex-wrap items-center justify-between gap-5  pb-5 relative z-10">

      <header className="w-full ">
        <header className="w-full">
          <nav className="mx-auto grid max-w-[94vw] grid-cols-2 items-center gap-4 rounded-2xl border-2 border-[#171717] bg-white px-5 shadow-[0_7px_0_#171717,0_14px_25px_rgba(0,0,0,0.12)] transition-all duration-300 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-8 md:px-8">

            <Link href="/" className="flex items-center">
              <img
                src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
                alt="E-Cell SMVIT"
                className="h-12 w-12 object-contain md:h-[72px]"
              />
            </Link>

            {/* NAVIGATION */}
            <div className="hidden min-w-0 items-center justify-center gap-6 lg:flex xl:gap-8">
              {[
                { name: "HOME", href: "/" },
                { name: "EVENTS", href: "/events" },
                { name: "ABOUT US", href: "/about" },
                { name: "RESOURCES", href: "/resources" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative whitespace-nowrap text-sm font-bold tracking-wide text-[#171717] transition-colors duration-300 hover:text-[#FF5A36] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#FF5A36] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 lg:gap-5">
              {session ? (
                <>
                  <Link
                    href="/my-registrations"
                    className="hidden shrink-0 whitespace-nowrap text-sm font-bold text-[#171717] hover:text-[#FF5A36] lg:block"
                  >
                    My Registrations
                  </Link>

                  {session.user.role === "CORE" && (
                    <Link
                      href="/admin"
                      className="hidden shrink-0 whitespace-nowrap text-sm font-bold text-[#171717] hover:text-[#6D4DFE] lg:block"
                    >
                      Core Dashboard
                    </Link>
                  )}

                  <SignOutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden text-sm font-bold text-[#171717] hover:text-[#FF5A36] sm:block"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="group flex items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#FF5A36] px-5 py-3 text-sm font-bold text-[#171717] shadow-[0_5px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:bg-[#171717] hover:text-white hover:shadow-[0_7px_0_#FF5A36] active:translate-y-1 active:shadow-none"
                  >
                    Join Us
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>
                </>
              )}
            </div>

          </nav>
        </header>

      </header>


    </header>
    <section className="py-20 sm:py-28 flex items-center justify-center flex-col">



      <div className="inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 shadow-sm relative z-10">

        <img
          src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
          alt="E-Cell SMVIT"
          className="h-8 w-8 object-contain"
        />

        <p className="text-sm  tracking-tight text-[#171717]">
          E-Cell | SMVIT Bengaluru
        </p>

      </div>




      <h1 className="relative z-10 mt-8 max-w-7xl text-4xl font-black leading-[1.02] tracking-tight text-[#171717] sm:text-7xl lg:text-8xl">
        WHERE ASPIRATION <br />
        <span className="text-[#6D4DFE]">MEETS OPPORTUNITY.</span>
      </h1>


      <Link
        className="group mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-6 py-3.5 font-semibold text-white shadow-[0_5px_0_#171717] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171717] hover:shadow-[0_7px_0_#6D4DFE] active:translate-y-1 active:shadow-none"
        href="/events"
      >
        Explore Events
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>

    </section>
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-violet-700">WHAT'S HAPPENING</p>
        <h2 className="mt-2 text-2xl font-bold">Upcoming events</h2>
      </div>
      <Link className="text-sm font-semibold text-violet-700" href="/events">All events →</Link>
    </div>
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => <article className="rounded-2xl border border-slate-200 bg-[#E0E0E1] p-6 transition hover:-translate-y-1 hover:shadow-lg" key={event.id}><p className="text-sm font-medium text-violet-700">{event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p><h3 className="mt-3 text-xl font-bold">{event.title}</h3><p className="mt-2 text-sm text-slate-500">{event.venue}</p><p className="mt-4 text-sm text-slate-600">{event._count.registrations} registered</p><Link className="mt-5 inline-block text-sm font-semibold text-violet-700" href="/events">View event →</Link></article>)}
      {events.length === 0 && <p className="text-slate-500">No published events yet. Check back soon.</p>}
    </div>
  </main>;
}
