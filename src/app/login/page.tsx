"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const field = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100";
export default function LoginPage() {
  const router = useRouter(); const params = useSearchParams();
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const f = new FormData(e.currentTarget);
    const r = await signIn("credentials", { email: f.get("email"), password: f.get("password"), redirect: false });
    setBusy(false);
    if (r?.error) return setError("Invalid email or password.");
    router.push("/events"); router.refresh();
  }
  return <main className="mx-auto max-w-md px-5 py-16"><Link className="text-sm font-semibold text-violet-700" href="/">← E-Cell SMVIT</Link><section className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"><p className="text-xs font-bold tracking-[.18em] text-violet-700">WELCOME BACK</p><h1 className="mt-3 text-3xl font-bold">Login to your account</h1>{params.get("created") && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">Account created. Please log in.</p>}<form className="mt-7 space-y-5" onSubmit={submit}><label className="block text-sm font-semibold">Email<input className={field} name="email" type="email" required placeholder="you@example.com"/></label><label className="block text-sm font-semibold">Password<input className={field} name="password" type="password" required placeholder="Your password"/></label>{error && <p className="text-sm text-red-600">{error}</p>}<button className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50" disabled={busy}>{busy ? "Signing in..." : "Login"}</button></form><p className="mt-6 text-sm text-slate-500">New here? <Link className="font-semibold text-violet-700" href="/signup">Create account</Link></p></section></main>;
}