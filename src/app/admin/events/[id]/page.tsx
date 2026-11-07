import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function EventRegistrationsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "CORE") redirect("/login");
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id }, include: { registrations: { include: { user: { select: { name: true, email: true } }, teamMembers: true }, orderBy: { registeredAt: "desc" } } } });
  if (!event) notFound();
  const rows = event.registrations.flatMap(r => [
    [r.user.name,r.user.email,r.phone,r.collegeName,r.participationType,r.teamName||"",r.registeredAt.toISOString()],
    ...r.teamMembers.map(m=>[m.name,m.email,m.phone,m.collegeName,"TEAM MEMBER",r.teamName||"",r.registeredAt.toISOString()]),
  ]);
  const csv = [["Name","Email","Phone","College","Participation","Team","Registered At"],...rows].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(",")).join("\n");
  return <main className="mx-auto max-w-6xl px-5 py-10">
    <Link className="text-sm text-slate-500 hover:text-violet-700" href="/admin">← Core dashboard</Link>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-3xl font-bold">{event.title}</h1><p className="mt-1 text-slate-500">{event.registrations.length} registrations · {event.isPaid? `Paid · ₹${event.entryFee}`:"Free event"}</p></div><a className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white" href={"data:text/csv;charset=utf-8,"+encodeURIComponent(csv)} download="event-registrations.csv">Export CSV</a></div>
    <div className="mt-8 space-y-4">{event.registrations.map(r=><article className="rounded-2xl border border-slate-200 bg-white p-5" key={r.id}><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-bold">{r.teamName || r.user.name}</h2><p className="mt-1 text-sm text-slate-500">{r.participationType} · Registered {r.registeredAt.toLocaleString("en-IN")}</p></div><span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">{r.teamMembers.length+1} participant(s)</span></div><div className="mt-4 grid gap-2 text-sm sm:grid-cols-2"><p><b>Team leader:</b> {r.user.name}</p><p><b>Email:</b> {r.user.email}</p><p><b>Phone:</b> {r.phone}</p><p><b>College:</b> {r.collegeName}</p></div>{r.teamMembers.length>0 && <div className="mt-4 border-t pt-4"><h3 className="mb-3 text-sm font-bold">Team members</h3><div className="grid gap-3 sm:grid-cols-2">{r.teamMembers.map(m=><div className="rounded-xl bg-slate-50 p-3 text-sm" key={m.id}><p className="font-semibold">{m.name}</p><p className="text-slate-500">{m.email} · {m.phone}</p><p className="text-slate-500">{m.collegeName}</p></div>)}</div></div>}</article>)}</div>
  </main>;
}
