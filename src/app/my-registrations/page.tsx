import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import RegistrationQr from "@/components/registration-qr";

export default async function MyRegistrationsPage() {
  const session = await auth();
  if (!session) redirect("/login");
  const registrations = await prisma.registration.findMany({ where: { userId: session.user.id }, include: { event: true, teamMembers: true }, orderBy: { registeredAt: "desc" } });

  return (
    <main className="min-h-screen bg-[#E0E0E1]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <Link className="text-sm font-black text-[#6D4DFE] hover:text-[#FF5A36]" href="/events">← Events</Link>
        <header className="mt-7"><p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">YOUR E-CELL ACTIVITY</p><h1 className="mt-2 text-4xl font-black tracking-[-.05em] text-[#171717]">My registrations<span className="text-[#FF5A36]">.</span></h1><p className="mt-3 text-sm text-[#66666c]">Your event registrations, all in one place.</p></header>

        <div className="mt-8 space-y-5">
          {registrations.map(item => (
            <article className="rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_5px_0_#171717]" key={item.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><p className="text-[10px] font-black tracking-[.18em] text-[#6D4DFE]">REGISTERED EVENT</p><h2 className="mt-2 text-xl font-black text-[#171717]">{item.event.title}</h2></div>
                <span className="rounded-full border border-[#171717] bg-[#FF5A36] px-3 py-1.5 text-[10px] font-black">{item.participationType}</span>
              </div>
              <div className="mt-5 grid gap-3 border-t-2 border-[#171717]/10 pt-5 sm:grid-cols-2">
                <p className="text-sm text-[#66666c]"><b className="text-[#171717]">Venue</b><br/>{item.event.venue}</p>
                <p className="text-sm text-[#66666c]"><b className="text-[#171717]">Event date</b><br/>{item.event.eventDate.toLocaleDateString("en-IN", { dateStyle: "full" })}</p>
                <p className="text-sm text-[#66666c]"><b className="text-[#171717]">Phone</b><br/>{item.phone}</p>
                <p className="text-sm text-[#66666c]"><b className="text-[#171717]">College</b><br/>{item.collegeName}</p>
                {item.teamName && <p className="text-sm text-[#66666c]"><b className="text-[#171717]">Team name</b><br/>{item.teamName}</p>}
                {item.teamMembers.length>0 && <p className="text-sm text-[#66666c] sm:col-span-2"><b className="text-[#171717]">Team members</b><br/>{item.teamMembers.map(m=>m.name).join(", ")}</p>}
              </div>
              <div className="mt-5 grid gap-4 border-t border-[#171717]/10 pt-5 sm:grid-cols-2 sm:items-center"><p className="text-[11px] font-semibold text-[#88888d]">Registered on {item.registeredAt.toLocaleDateString("en-IN")}{item.checkedInAt ? " · Checked in" : ""}</p><RegistrationQr code={item.checkInCode} /></div>
            </article>
          ))}
          {registrations.length === 0 && <div className="rounded-2xl border-2 border-dashed border-[#171717]/40 bg-white/60 p-10 text-center"><p className="font-black text-[#171717]">No registrations yet</p><p className="mt-2 text-sm text-[#66666c]">Find an event and reserve your spot.</p><Link className="ec-btn mt-5" href="/events">Explore events ↗</Link></div>}
        </div>
      </div>
    </main>
  );
}
