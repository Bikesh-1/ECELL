import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function EventsPage() {
  const [events, session] = await Promise.all([
    prisma.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { eventDate: "asc" }, include: { _count: { select: { registrations: true } } } }),
    auth(),
  ]);
  return <main className="mx-auto max-w-6xl px-5 py-10">
    <Link className="text-sm font-semibold text-violet-700" href="/">← Home</Link>
    <div className="mt-7"><p className="text-xs font-bold tracking-[.2em] text-violet-700">DISCOVER & PARTICIPATE</p><h1 className="mt-2 text-4xl font-black">E-Cell Events</h1><p className="mt-2 text-slate-500">Open to students from all colleges. Explore event details and register.</p></div>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg" key={event.id}>
        {event.posterUrl ? <img src={event.posterUrl} alt={event.title+" poster"} className="h-52 w-full object-cover"/> : <div className="flex h-36 items-center justify-center bg-violet-50 text-sm font-bold text-violet-300">E-CELL EVENT</div>}
        <div className="flex h-full flex-col p-6"><div className="flex flex-wrap gap-2 text-xs font-bold"><span className="text-violet-700">{event.eventDate.toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}</span><span className="rounded-full bg-slate-100 px-2 py-1">{event.isPaid ? `₹${event.entryFee}` : "FREE"}</span><span className="rounded-full bg-slate-100 px-2 py-1">{event.participationMode==="BOTH"?"Solo / Team":event.participationMode}</span></div>
          <h2 className="mt-3 text-xl font-bold">{event.title}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{event.description}</p>
          <div className="mt-5 space-y-1 text-sm text-slate-500"><p>Venue: {event.venue}</p><p>{event._count.registrations}{event.maxParticipants ? " / "+event.maxParticipants : ""} registrations</p><p>Deadline: {event.registrationDeadline.toLocaleDateString("en-IN")}</p></div>
          <div className="mt-auto flex flex-wrap gap-2 pt-6"><Link className="rounded-xl border border-violet-200 px-4 py-2.5 text-sm font-semibold text-violet-700" href={`/events/${event.id}`}>View details</Link>{session && <Link className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white" href={`/events/register/${event.id}`}>Register →</Link>}{!session && <Link className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white" href="/login">Login to register</Link>}</div>
        </div>
      </article>)}
      {events.length===0 && <p className="text-slate-500">No published events yet. Check back soon.</p>}
    </div>
  </main>;
}
