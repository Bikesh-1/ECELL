"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
export default function RegisterPage() {
  const { id } = useParams<{ id: string }>(); const router = useRouter();
  const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function register() {
    setBusy(true); setMessage("");
    const r = await fetch("/api/registrations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventId: id }) });
    const d = await r.json(); setBusy(false);
    if (!r.ok) return setMessage(d.error ?? "Registration failed.");
    router.push("/my-registrations");
  }
  return <main className="mx-auto max-w-lg px-5 py-16"><Link className="text-sm font-semibold text-violet-700" href="/events">← Back to events</Link><section className="mt-7 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-xs font-bold tracking-[.18em] text-violet-700">EVENT REGISTRATION</p><h1 className="mt-3 text-3xl font-bold">Confirm your spot</h1><p className="mt-3 leading-7 text-slate-600">Registration is direct. Your spot will be confirmed immediately if registration is open and seats are available.</p>{message && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{message}</p>}<button className="mt-7 w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50" onClick={register} disabled={busy}>{busy ? "Registering..." : "Confirm registration"}</button></section></main>;
}