"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const field = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100";
export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const f = new FormData(e.currentTarget);
    const r = await fetch("/api/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.get("name"), email: f.get("email"), password: f.get("password") }) });
    const d = await r.json(); setBusy(false);
    if (!r.ok) return setError(d.error ?? "Signup failed.");
    router.push("/login?created=1");
  }
  return <main className="mx-auto max-w-md px-5 py-16"><Link className="text-sm font-semibold text-violet-700" href="/">← E-Cell SMVIT</Link><section className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"><p className="text-xs font-bold tracking-[.18em] text-violet-700">JOIN THE COMMUNITY</p><h1 className="mt-3 text-3xl font-bold">Create your account</h1><p className="mt-2 text-sm text-slate-500">One account for all E-Cell events.</p><form className="mt-7 space-y-5" onSubmit={submit}><label className="block text-sm font-semibold">Full name<input className={field} name="name" required minLength={2} maxLength={80} placeholder="Your name"/></label><label className="block text-sm font-semibold">Email<input className={field} name="email" type="email" required placeholder="you@example.com"/></label><label className="block text-sm font-semibold">Password<input className={field} name="password" type="password" minLength={8} required placeholder="At least 8 characters"/></label>{error && <p className="text-sm text-red-600">{error}</p>}<button className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50" disabled={busy}>{busy ? "Creating account..." : "Create account"}</button></form><p className="mt-6 text-sm text-slate-500">Already registered? <Link className="font-semibold text-violet-700" href="/login">Login</Link></p></section></main>;
}