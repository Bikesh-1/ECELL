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

  const stats = [
    { label: "Total events", value: events.length, accent: "#6D4DFE", note: "Across all statuses" },
    { label: "Registrations", value: total, accent: "#FF5A36", note: "Student sign-ups" },
    { label: "Core members", value: coreCount, accent: "#171717", note: "Dashboard access" },
  ];

  return (
    <main className="min-h-screen bg-[#E0E0E1]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <header className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Link className="text-sm font-black text-[#6D4DFE] transition hover:text-[#FF5A36]" href="/">← Back to home</Link>
            <p className="mt-7 text-xs font-black tracking-[.2em] text-[#6D4DFE]">E-CELL / CORE TEAM</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-.05em] text-[#171717] sm:text-5xl">Core dashboard<span className="text-[#FF5A36]">.</span></h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#66666c]">Your command centre for events, participation and the E-Cell community.</p>
          </div>
          <Link className="group inline-flex items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#FF5A36] px-5 py-3.5 text-sm font-black text-[#171717] shadow-[0_5px_0_#171717] transition-all hover:-translate-y-1 hover:bg-[#171717] hover:text-white hover:shadow-[0_7px_0_#FF5A36] active:translate-y-1 active:shadow-none" href="/admin/events/new">
            + Create event <span className="transition-transform group-hover:translate-x-1">↗</span>
          </Link>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_5px_0_#171717]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[#66666c]">{stat.label}</p>
                <span className="h-3 w-3 rounded-full border border-[#171717]" style={{ backgroundColor: stat.accent }} />
              </div>
              <p className="mt-5 text-4xl font-black tracking-tight text-[#171717]">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold text-[#77777d]">{stat.note}</p>
            </article>
          ))}
        </section>

        <section className="mt-9 grid gap-3 sm:grid-cols-3"><Link href="/admin/check-in" className="rounded-xl border-2 border-[#171717] bg-[#FF5A36] p-4 text-sm font-black shadow-[0_4px_0_#171717]">QR event check-in ↗</Link><Link href="/admin/startup-ideas" className="rounded-xl border-2 border-[#171717] bg-[#B9A9FF] p-4 text-sm font-black shadow-[0_4px_0_#171717]">Review startup ideas ↗</Link><Link href="/mentor-requests" className="rounded-xl border-2 border-[#171717] bg-white p-4 text-sm font-black shadow-[0_4px_0_#171717]">Mentorship inbox ↗</Link></section>
        <section className="mt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">WORKSPACE</p><h2 className="mt-2 text-2xl font-black tracking-tight text-[#171717]">Manage events</h2></div>
            <span className="rounded-full border border-[#171717] bg-white px-3 py-1.5 text-xs font-bold">{events.length} total</span>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <article key={event.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-[#171717] bg-white p-5 shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_#171717] sm:p-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black text-[#171717]">{event.title}</h3>
                    <span className="rounded-full border border-[#171717] bg-[#E0E0E1] px-2.5 py-1 text-[10px] font-black tracking-wide">{event.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#66666c]">{event._count.registrations} registrations · {event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                </div>
                <Link className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-4 py-2.5 text-sm font-black text-white shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 hover:bg-[#171717] hover:shadow-[0_5px_0_#6D4DFE]" href={"/admin/events/" + event.id}>
                  View registrations <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </article>
            ))}
            {events.length === 0 && <p className="rounded-2xl border-2 border-dashed border-[#171717]/40 bg-white/60 p-10 text-center text-sm font-semibold text-[#66666c]">No events yet. Create your first event to get started.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
