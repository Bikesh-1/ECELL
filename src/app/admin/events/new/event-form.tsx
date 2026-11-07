"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
const field = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100";
export default function EventForm() {
  const router = useRouter(); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const f = new FormData(e.currentTarget);
    const r = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: f.get("title"), description: f.get("description"), venue: f.get("venue"), eventDate: f.get("eventDate"), registrationDeadline: f.get("registrationDeadline"), maxParticipants: f.get("maxParticipants") ? Number(f.get("maxParticipants")) : null, status: "PUBLISHED" }) });
    const d = await r.json(); setBusy(false);
    if (!r.ok) return setError(d.error ?? "Could not create event.");
    router.push("/admin");
  }
  return <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-xs font-bold tracking-[.18em] text-violet-700">CORE TEAM</p><h1 className="mt-2 text-3xl font-bold">Create an event</h1><form className="mt-7 space-y-5" onSubmit={submit}><label className="block text-sm font-semibold">Event title<input className={field} name="title" required minLength={3}/></label><label className="block text-sm font-semibold">Description<textarea className={field} name="description" rows={4} required minLength={10}/></label><label className="block text-sm font-semibold">Venue<input className={field} name="venue" required/></label><label className="block text-sm font-semibold">Event date and time<input className={field} name="eventDate" type="datetime-local" required/></label><label className="block text-sm font-semibold">Registration deadline<input className={field} name="registrationDeadline" type="datetime-local" required/></label><label className="block text-sm font-semibold">Maximum participants (optional)<input className={field} name="maxParticipants" type="number" min="1"/></label>{error && <p className="text-sm text-red-600">{error}</p>}<button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50" disabled={busy}>{busy ? "Publishing..." : "Publish event"}</button></form></section>;
}