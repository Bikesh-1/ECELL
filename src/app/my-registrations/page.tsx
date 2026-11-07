import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export default async function MyRegistrationsPage() {
  const session = await auth(); if (!session) redirect("/login");
  const registrations = await prisma.registration.findMany({ where: { userId: session.user.id }, include: { event: true, teamMembers: true }, orderBy: { registeredAt: "desc" } });
  return <main className="mx-auto max-w-5xl px-5 py-10"><Link className="text-sm font-semibold text-violet-700" href="/events">← Events</Link><h1 className="mt-5 text-3xl font-black">My registrations</h1><p className="mt-2 text-slate-500">Your E-Cell event registrations in one place.</p><div className="mt-7 space-y-4">{registrations.map(item => <article className="rounded-2xl border border-slate-200 bg-white p-6" key={item.id}><h2 className="text-xl font-bold">{item.event.title}</h2><p className="mt-2 text-sm text-slate-600">{item.event.venue} · {item.event.eventDate.toLocaleDateString("en-IN")}</p><p className="mt-2 text-sm text-slate-600">Your phone: {item.phone} · College: {item.collegeName}</p><p className="mt-1 text-sm text-slate-600">Participation: {item.participationType}{item.teamName ? " · "+item.teamName : ""}</p>{item.teamMembers.length>0 && <p className="mt-1 text-sm text-slate-600">Team members: {item.teamMembers.map(m=>m.name).join(", ")}</p>}<p className="mt-2 text-xs text-slate-400">Registered on {item.registeredAt.toLocaleDateString("en-IN")}</p></article>)}{registrations.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">You have not registered for any events yet.</p>}</div></main>;
}
