import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== "CORE") redirect("/login");
  const [events, total, coreCount] = await Promise.all([
    prisma.event.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { registrations: true } } } }),
    prisma.registration.count(),
    prisma.user.count({ where: { role: "CORE" } }),
  ]);
  return <main className="mx-auto max-w-6xl px-5 py-10">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><Link className="text-sm text-slate-500 hover:text-violet-700" href="/">← Home</Link><h1 className="mt-3 text-3xl font-bold tracking-tight">Core Team Dashboard</h1><p className="mt-1 text-slate-500">Manage E-Cell events and student registrations.</p></div>
      <Link className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700" href="/admin/events/new">+ Create event</Link>
    </div>
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Total events</p><p className="mt-2 text-3xl font-bold">{events.length}</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Registrations</p><p className="mt-2 text-3xl font-bold">{total}</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Core members</p><p className="mt-2 text-3xl font-bold">{coreCount}</p></div>
    </div>
    <h2 className="mb-4 mt-10 text-xl font-semibold">Manage events</h2>
    <div className="space-y-3">{events.map(event => <article className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5" key={event.id}><div><h3 className="font-semibold">{event.title}</h3><p className="mt-1 text-sm text-slate-500">{event.status} · {event._count.registrations} registrations</p></div><Link className="font-semibold text-violet-700 hover:text-violet-900" href={"/admin/events/" + event.id}>View registrations →</Link></article>)}</div>
  </main>;
}
