import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/signout-button";

export default async function Home() {
  const session = await auth();
  const events = await prisma.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { eventDate: "asc" }, take: 6, include: { _count: { select: { registrations: true } } } });
  return <main className="mx-auto max-w-6xl px-5 py-8">
    <header className="flex flex-wrap items-center justify-between gap-5 border-b border-slate-200 pb-5">
      <Link href="/" className="text-lg font-black tracking-tight">E-CELL <span className="text-violet-600">SMVIT</span></Link>
      <nav className="flex flex-wrap items-center gap-5 text-sm font-medium">
        <Link className="hover:text-violet-700" href="/events">Events</Link>
        {session ? <><Link href="/my-registrations">My registrations</Link>{session.user.role === "CORE" && <Link className="text-violet-700" href="/admin">Core dashboard</Link>}<SignOutButton /></> : <><Link href="/login">Login</Link><Link className="rounded-xl bg-violet-600 px-4 py-2.5 text-white" href="/signup">Create account</Link></>}
      </nav>
    </header>
    <section className="py-20 sm:py-28">
      <p className="text-sm font-bold tracking-[.2em] text-violet-700">ENTREPRENEURSHIP CELL · SMVIT</p>
      <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1.04] tracking-tight sm:text-7xl">Where ideas meet opportunity.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Discover workshops, competitions and entrepreneurship events. Register directly and keep all your event registrations in one place.</p>
      <Link className="mt-8 inline-flex rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white hover:bg-violet-700" href="/events">Explore events <span className="ml-2">→</span></Link>
    </section>
    <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-violet-700">WHAT'S HAPPENING</p><h2 className="mt-2 text-2xl font-bold">Upcoming events</h2></div><Link className="text-sm font-semibold text-violet-700" href="/events">All events →</Link></div>
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => <article className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg" key={event.id}><p className="text-sm font-medium text-violet-700">{event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p><h3 className="mt-3 text-xl font-bold">{event.title}</h3><p className="mt-2 text-sm text-slate-500">{event.venue}</p><p className="mt-4 text-sm text-slate-600">{event._count.registrations} registered</p><Link className="mt-5 inline-block text-sm font-semibold text-violet-700" href="/events">View event →</Link></article>)}
      {events.length === 0 && <p className="text-slate-500">No published events yet. Check back soon.</p>}
    </div>
  </main>;
}
