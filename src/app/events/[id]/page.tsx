import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [event, session] = await Promise.all([
    prisma.event.findFirst({ where: { OR: [{id},{slug:id}], status: "PUBLISHED" }, include: { rounds: { orderBy: { order: "asc" } }, _count: { select: { registrations: true } } } }),
    auth(),
  ]);
  if (!event) notFound();

  const facts = [
    ["DATE & TIME", event.eventDate.toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })],
    ["VENUE", event.venue],
    ["REGISTRATION DEADLINE", event.registrationDeadline.toLocaleString("en-IN")],
    ["PRIZE POOL", event.prizePool || "To be announced"],
    ["PARTICIPATION", event.participationMode === "SOLO" ? "Solo" : event.participationMode === "TEAM" ? `Team of ${event.minTeamSize}–${event.maxTeamSize}` : `Solo or team of ${event.minTeamSize}–${event.maxTeamSize}`],
    ["REGISTRATIONS", `${event._count.registrations}${event.maxParticipants ? ` / ${event.maxParticipants}` : ""}`],
  ];

  return (
    <main className="min-h-screen bg-[#E0E0E1]">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <Link className="text-sm font-black text-[#6D4DFE] hover:text-[#FF5A36]" href="/events">← All events</Link>
        {event.posterUrl && <img src={event.posterUrl} alt={event.title + " poster"} className="mt-7 max-h-[480px] w-full rounded-2xl border-2 border-[#171717] object-cover shadow-[0_5px_0_#171717]"/>}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2 text-[11px] font-black">
            <span className="rounded-full border border-[#171717] bg-[#FF5A36] px-3 py-1.5">{event.isPaid ? `PAID · ₹${event.entryFee}` : "FREE ENTRY"}</span>
            <span className="rounded-full border border-[#171717] bg-white px-3 py-1.5">{event.participationMode === "BOTH" ? "SOLO / TEAM" : event.participationMode}</span>
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-[-.05em] text-[#171717] sm:text-5xl">{event.title}</h1>
          <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-[#55555c]">{event.description}</p>
        </div>

        <section className="mt-9 grid gap-3 sm:grid-cols-2">
          {facts.map(([label, value]) => <article key={label} className="rounded-xl border-2 border-[#171717] bg-white p-5 shadow-[0_3px_0_#171717]"><p className="text-[10px] font-black tracking-[.18em] text-[#6D4DFE]">{label}</p><p className="mt-2 text-sm font-bold text-[#171717]">{value}</p></article>)}
        </section>

        {event.rounds.length > 0 && <section className="mt-11"><p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">HOW IT WORKS</p><h2 className="mt-2 text-2xl font-black text-[#171717]">Event rounds</h2><div className="mt-5 space-y-4">{event.rounds.map((round, i) => <article className="rounded-xl border-2 border-[#171717] bg-white p-5 shadow-[0_4px_0_#171717]" key={round.id}><p className="text-[10px] font-black tracking-[.18em] text-[#6D4DFE]">ROUND {i+1}</p><h3 className="mt-2 text-lg font-black text-[#171717]">{round.title}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#66666c]">{round.description}</p></article>)}</div></section>}

        {(event.contactName || event.contactPhone) && <section className="mt-9 rounded-xl border-2 border-[#171717] bg-white p-5 shadow-[0_4px_0_#171717]"><h2 className="font-black">Contact for queries</h2>{event.contactName && <p className="mt-2 text-sm text-[#66666c]">{event.contactName}</p>}{event.contactPhone && <a className="mt-1 inline-block text-sm font-black text-[#6D4DFE] hover:text-[#FF5A36]" href={"tel:" + event.contactPhone}>{event.contactPhone}</a>}</section>}

        <div className="mt-9"><Link className="ec-btn" href={session ? `/events/register/${event.id}` : "/login"}>{session ? "Register for this event" : "Login to register"} <span>↗</span></Link></div>
      </div>
    </main>
  );
}
