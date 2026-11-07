"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const field = "mt-2 w-full rounded-xl border-2 border-[#171717]/20 bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-[#777] focus:border-[#6D4DFE] focus:ring-4 focus:ring-[#6D4DFE]/10";
export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const r = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.get("name"), email: f.get("email"), password: f.get("password") }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error ?? "Signup failed.");
        setBusy(false);
        return;
      }
      router.push("/login?created=1");
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#E0E0E1] px-5 py-10 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-3 rounded-xl border-2 border-[#171717] bg-white px-4 py-2.5 text-sm font-black shadow-[0_4px_0_#171717] transition hover:-translate-y-0.5 hover:bg-[#FF5A36]">
          <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995" alt="" className="h-7 w-7" />
          E-CELL SMVIT <span className="text-[#6D4DFE]">↗</span>
        </Link>

        <div className="mt-10 grid overflow-hidden rounded-[26px] border-2 border-[#171717] bg-white shadow-[0_8px_0_#171717] md:grid-cols-[.9fr_1.1fr]">
          <aside className="relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-[#FF5A36] p-7 text-[#171717] sm:p-10 md:min-h-[610px]">
            <div className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full border border-black/15" />
            <div className="relative z-10 text-xs font-black tracking-[.22em]">E-CELL / SMVIT</div>
            <div className="relative z-10 mt-12 md:mt-0">
              <p className="text-xs font-black tracking-[.2em] text-black/60">YOUR NEXT CHAPTER</p>
              <h1 className="mt-4 max-w-sm text-4xl font-black leading-[.98] tracking-[-.05em] sm:text-5xl">Make ideas happen.</h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-black/70">Join founders, builders and changemakers creating what comes next.</p>
            </div>
            <p className="relative z-10 mt-10 text-xs font-black tracking-wide text-black/60">ENTREPRENEURSHIP CELL · BENGALURU</p>
          </aside>

          <section className="p-7 sm:p-10 md:p-12">
            <p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">JOIN THE COMMUNITY</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">Create your account</h2>
            <p className="mt-3 text-sm leading-6 text-[#66666c]">One account for all E-Cell events and experiences.</p>
            <form className="mt-8 space-y-5" onSubmit={submit}>
              <label className="block text-sm font-bold text-[#171717]">Full name
                <input className={field} name="name" required minLength={2} maxLength={80} placeholder="Your name" autoComplete="name" />
              </label>
              <label className="block text-sm font-bold text-[#171717]">Email
                <input className={field} name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
              </label>
              <label className="block text-sm font-bold text-[#171717]">Password
                <input className={field} name="password" type="password" minLength={8} required placeholder="At least 8 characters" autoComplete="new-password" />
              </label>
              {error && <p role="alert" className="rounded-xl border-2 border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
              <button className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-3.5 font-black text-white shadow-[0_5px_0_#171717] transition-all hover:-translate-y-1 hover:bg-[#171717] hover:shadow-[0_7px_0_#6D4DFE] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60" disabled={busy}>
                {busy ? "Creating account..." : "Create account"} <span className="transition-transform group-hover:translate-x-1">↗</span>
              </button>
            </form>
            <p className="mt-7 text-sm text-[#66666c]">Already registered? <Link className="font-black text-[#6D4DFE] hover:text-[#FF5A36]" href="/login">Login →</Link></p>
          </section>
        </div>
      </div>
    </main>
  );
}
