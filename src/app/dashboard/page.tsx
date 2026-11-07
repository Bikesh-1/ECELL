import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const [registrations, ideas, certificates, points, requests] = await Promise.all([
    prisma.registration.findMany({ where: { userId: session.user.id }, include: { event: true }, orderBy: { registeredAt: "desc" }, take: 5 }),
    prisma.startupIdea.count({ where: { userId: session.user.id } }),
    prisma.certificate.findMany({ where: { userId: session.user.id }, orderBy: { issuedAt: "desc" }, take: 5 }),
    prisma.activityPoint.aggregate({ where: { userId: session.user.id }, _sum: { points: true } }),
    prisma.mentorshipRequest.count({ where: { studentId: session.user.id } }),
  ]);
  const cards = [{label:"Event registrations",value:registrations.length},{label:"Startup ideas",value:ideas},{label:"Certificates",value:certificates.length},{label:"Community points",value:points._sum.points || 0}];
  return <main className="min-h-screen bg-[#E0E0E1] px-5 py-10 sm:py-14"><div className="mx-auto max-w-6xl">
    <p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">YOUR E-CELL SPACE</p><h1 className="mt-2 text-4xl font-black tracking-[-.06em] text-[#171717] sm:text-5xl">Hey, {session.user.name?.split(" ")[0] || "there"}<span className="text-[#FF5A36]">.</span></h1><p className="mt-3 text-sm text-[#66666c]">Your events, ideas and community progress in one place.</p>
    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{cards.map((card,i)=><article key={card.label} className="rounded-2xl border-2 border-[#171717] bg-white p-5 shadow-[0_5px_0_#171717]"><p className="text-xs font-bold text-[#777]">{card.label}</p><p className={`mt-4 text-4xl font-black ${i%2?"text-[#FF5A36]":"text-[#6D4DFE]"}`}>{card.value}</p></article>)}</div>
    <div className="mt-9 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <section className="rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_5px_0_#171717]"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-black">Your registrations</h2><Link className="text-xs font-black text-[#6D4DFE]" href="/my-registrations">View all ↗</Link></div><div className="mt-5 space-y-3">{registrations.map(r=><div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F4F3F0] p-4"><div><p className="font-black">{r.event.title}</p><p className="mt-1 text-xs text-[#777]">{r.event.eventDate.toLocaleDateString("en-IN")} · {r.event.venue}</p></div><span className={`rounded-full px-3 py-1 text-[10px] font-black ${r.checkedInAt?"bg-green-100 text-green-800":"bg-[#6D4DFE]/10 text-[#6D4DFE]"}`}>{r.checkedInAt?"ATTENDED":"REGISTERED"}</span></div>)}{!registrations.length&&<p className="py-7 text-sm text-[#777]">No event registrations yet.</p>}</div></section>
      <section className="space-y-4"><div className="rounded-2xl border-2 border-[#171717] bg-[#171717] p-6 text-white shadow-[0_5px_0_#6D4DFE]"><p className="text-[10px] font-black tracking-[.2em] text-[#B9A9FF]">BUILD SOMETHING</p><h2 className="mt-3 text-2xl font-black">Got a startup idea?</h2><p className="mt-2 text-sm text-white/60">Share your problem, solution and pitch with the E-Cell team.</p><Link href="/startup-hub" className="mt-5 inline-flex rounded-xl border-2 border-white bg-[#FF5A36] px-4 py-3 text-sm font-black text-[#171717]">Submit an idea ↗</Link></div>
      <div className="rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_5px_0_#171717]"><h2 className="font-black">Explore the community</h2><div className="mt-4 grid gap-3 text-sm font-bold"><Link className="rounded-lg bg-[#E0E0E1] p-3 hover:bg-[#B9A9FF]" href="/mentors">Find a mentor ↗</Link><Link className="rounded-lg bg-[#E0E0E1] p-3 hover:bg-[#B9A9FF]" href="/mentor-profile">Become a mentor ↗</Link><Link className="rounded-lg bg-[#E0E0E1] p-3 hover:bg-[#B9A9FF]" href="/mentor-requests">Mentorship inbox ({requests}) ↗</Link><Link className="rounded-lg bg-[#E0E0E1] p-3 hover:bg-[#B9A9FF]" href="/leaderboard">Community leaderboard ↗</Link><Link className="rounded-lg bg-[#E0E0E1] p-3 hover:bg-[#B9A9FF]" href="/certificates">My certificates ({certificates.length}) ↗</Link></div></div></section>
    </div>
    <section className="mt-7 rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_5px_0_#171717]"><h2 className="font-black">Recent certificates</h2>{certificates.length?<div className="mt-4 grid gap-3 sm:grid-cols-2">{certificates.map(c=><Link key={c.id} href={`/certificates/${c.code}`} className="rounded-xl border border-[#171717]/15 p-4 hover:border-[#6D4DFE]"><p className="font-black">{c.title}</p><p className="mt-1 text-xs text-[#777]">Issued {c.issuedAt.toLocaleDateString("en-IN")} · Verify ↗</p></Link>)}</div>:<p className="mt-3 text-sm text-[#777]">Certificates you earn will appear here.</p>}</section>
  </div></main>;
}
