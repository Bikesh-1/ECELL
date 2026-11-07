import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function EventRegistrationsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "CORE") redirect("/login");
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id }, include: { registrations: { include: { user: { select: { name: true, email: true } } }, orderBy: { registeredAt: "desc" } } } });
  if (!event) notFound();
  const csv = ["Name,Email,Registered At", ...event.registrations.map(r => [r.user.name, r.user.email, r.registeredAt.toISOString()].map(v => '"' + v.replaceAll('"', '""') + '"').join(","))].join("\n");
  return <main className="mx-auto max-w-6xl px-5 py-10">
    <Link className="text-sm text-slate-500 hover:text-violet-700" href="/admin">← Core dashboard</Link>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-3xl font-bold">{event.title}</h1><p className="mt-1 text-slate-500">{event.registrations.length} registered participants</p></div><a className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white" href={"data:text/csv;charset=utf-8," + encodeURIComponent(csv)} download="event-registrations.csv">Export CSV</a></div>
    <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="px-5 py-4 font-semibold">Name</th><th className="px-5 py-4 font-semibold">Email</th><th className="px-5 py-4 font-semibold">Registered</th></tr></thead><tbody>{event.registrations.map(r => <tr className="border-t border-slate-100" key={r.id}><td className="px-5 py-4 font-medium">{r.user.name}</td><td className="px-5 py-4">{r.user.email}</td><td className="px-5 py-4 text-slate-500">{r.registeredAt.toLocaleString("en-IN")}</td></tr>)}</tbody></table></div>
  </main>;
}
