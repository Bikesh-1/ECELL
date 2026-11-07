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
  return <main className="mx-auto max-w-4xl px-5 py-10">
    <Link className="text-sm font-semibold text-violet-700" href="/events">← All events</Link>
    {event.posterUrl && <img src={event.posterUrl} alt={event.title+" poster"} className="mt-6 max-h-[480px] w-full rounded-3xl object-cover"/>}
    <div className="mt-7"><div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">{event.isPaid? `PAID · ₹${event.entryFee}`:"FREE ENTRY"}</span><span className="rounded-full bg-slate-100 px-3 py-1">{event.participationMode==="BOTH"?"SOLO / TEAM":event.participationMode}</span></div><h1 className="mt-3 text-4xl font-black">{event.title}</h1><p className="mt-4 whitespace-pre-wrap leading-7 text-slate-600">{event.description}</p></div>
    <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2"><p><span className="text-sm text-slate-500">Date & time</span><br/><b>{event.eventDate.toLocaleString("en-IN",{dateStyle:"full",timeStyle:"short"})}</b></p><p><span className="text-sm text-slate-500">Venue</span><br/><b>{event.venue}</b></p><p><span className="text-sm text-slate-500">Registration deadline</span><br/><b>{event.registrationDeadline.toLocaleString("en-IN")}</b></p><p><span className="text-sm text-slate-500">Prize pool</span><br/><b>{event.prizePool || "To be announced"}</b></p><p><span className="text-sm text-slate-500">Participation</span><br/><b>{event.participationMode==="SOLO"?"Solo":event.participationMode==="TEAM"?`Team of ${event.minTeamSize}–${event.maxTeamSize}`:`Solo or team of ${event.minTeamSize}–${event.maxTeamSize}`}</b></p><p><span className="text-sm text-slate-500">Registrations</span><br/><b>{event._count.registrations}{event.maxParticipants?` / ${event.maxParticipants}`:""}</b></p></div>
    {event.rounds.length>0 && <section className="mt-9"><h2 className="text-2xl font-bold">Event rounds</h2><div className="mt-4 space-y-3">{event.rounds.map((round,i)=><article className="rounded-2xl border border-slate-200 bg-white p-5" key={round.id}><p className="text-xs font-bold tracking-widest text-violet-700">ROUND {i+1}</p><h3 className="mt-1 text-lg font-bold">{round.title}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{round.description}</p></article>)}</div></section>}
    {event.contactName || event.contactPhone ? <section className="mt-8 rounded-2xl bg-slate-50 p-5"><h2 className="font-bold">Contact for queries</h2>{event.contactName && <p className="mt-1 text-sm">{event.contactName}</p>}{event.contactPhone && <a className="text-sm text-violet-700" href={"tel:"+event.contactPhone}>{event.contactPhone}</a>}</section>:null}
    <div className="mt-8">{session ? <Link className="inline-flex rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white" href={`/events/register/${event.id}`}>Register for this event →</Link>:<Link className="inline-flex rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white" href="/login">Login to register →</Link>}</div>
  </main>;
}
