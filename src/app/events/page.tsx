import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function EventsPage() {
  const [events, session] = await Promise.all([
    prisma.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { eventDate: "asc" }, include: { _count: { select: { registrations: true } } } }),
    auth(),
  ]);

  return (
    <main className="min-h-screen bg-[#E0E0E1]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <Link className="text-sm font-black text-[#6D4DFE] transition hover:text-[#FF5A36]" href="/">← Home</Link>
        <header className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">DISCOVER & PARTICIPATE</p><h1 className="mt-2 text-4xl font-black tracking-[-.05em] text-[#171717] sm:text-5xl">E-Cell Events<span className="text-[#FF5A36]">.</span></h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#66666c]">Open to students from all colleges. Explore event details and register.</p></div>
          <span className="rounded-full border-2 border-[#171717] bg-white px-4 py-2 text-xs font-black">{events.length} EVENTS</span>
        </header>

        <div className="mt-9 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article className="group flex flex-col overflow-hidden rounded-2xl border-2 border-[#171717] bg-white shadow-[0_5px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_9px_0_#171717]" key={event.id}>
              {event.posterUrl ? <img src={event.posterUrl} alt={event.title + " poster"} className="h-52 w-full border-b-2 border-[#171717] object-cover transition-transform duration-500 group-hover:scale-[1.02]"/> : <div className="flex h-44 items-center justify-center border-b-2 border-[#171717] bg-[#6D4DFE] text-sm font-black tracking-[.2em] text-white">E-CELL / EVENT</div>}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-black">
                  <span className="text-[#6D4DFE]">{event.eventDate.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                  <span className="rounded-full border border-[#171717]/20 bg-[#E0E0E1] px-2.5 py-1">{event.isPaid ? `₹${event.entryFee}` : "FREE"}</span>
                  <span className="rounded-full border border-[#171717]/20 bg-[#E0E0E1] px-2.5 py-1">{event.participationMode === "BOTH" ? "SOLO / TEAM" : event.participationMode}</span>
                </div>
                <h2 className="mt-4 text-xl font-black leading-tight text-[#171717]">{event.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#66666c]">{event.description}</p>
                <div className="mt-5 space-y-2 text-xs font-semibold text-[#66666c]">
                  <p><span className="font-black text-[#171717]">VENUE</span> · {event.venue}</p>
                  <p><span className="font-black text-[#171717]">JOINED</span> · {event._count.registrations}{event.maxParticipants ? ` / ${event.maxParticipants}` : ""} registrations</p>
                  <p><span className="font-black text-[#171717]">DEADLINE</span> · {event.registrationDeadline.toLocaleDateString("en-IN")}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-3 border-t-2 border-[#171717]/10 pt-5 mt-6">
                  <Link className="inline-flex items-center justify-center rounded-xl border-2 border-[#171717] bg-white px-4 py-2.5 text-xs font-black text-[#171717] shadow-[0_3px_0_#171717] transition hover:-translate-y-0.5 hover:bg-[#FF5A36]" href={`/events/${event.id}`}>View details</Link>
                  <Link className="inline-flex items-center justify-center rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-4 py-2.5 text-xs font-black text-white shadow-[0_3px_0_#171717] transition hover:-translate-y-0.5 hover:bg-[#171717]" href={session ? `/events/register/${event.id}` : "/login"}>{session ? "Register now ↗" : "Login to register ↗"}</Link>
                </div>
              </div>
            </article>
          ))}
          {events.length === 0 && <p className="rounded-2xl border-2 border-dashed border-[#171717]/40 bg-white/60 p-8 text-sm font-semibold text-[#66666c]">No published events yet. Check back soon.</p>}
        </div>
      </div>
    </main>
  );
}
