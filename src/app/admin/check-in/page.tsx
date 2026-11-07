import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CheckInScanner from "@/components/check-in-scanner";

export default async function CheckInPage(){
 const session=await auth();if(session?.user?.role!=="CORE")redirect("/login");
 const [events,checkedIn,registrations]=await Promise.all([prisma.event.findMany({orderBy:{eventDate:"desc"},take:20,include:{_count:{select:{registrations:true}}}}),prisma.registration.count({where:{checkedInAt:{not:null}}}),prisma.registration.count()]);
 return <main className="min-h-screen bg-[#E0E0E1] px-5 py-10"><div className="mx-auto max-w-5xl"><Link href="/admin" className="text-sm font-black text-[#6D4DFE]">← Core dashboard</Link><header className="mt-7"><p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">CORE TEAM TOOL</p><h1 className="mt-2 text-4xl font-black tracking-[-.06em]">Event check-in<span className="text-[#FF5A36]">.</span></h1></header><div className="mt-7 grid grid-cols-2 gap-4"><div className="rounded-xl border-2 border-[#171717] bg-white p-5"><p className="text-xs text-[#777]">Total registrations</p><p className="mt-2 text-3xl font-black">{registrations}</p></div><div className="rounded-xl border-2 border-[#171717] bg-white p-5"><p className="text-xs text-[#777]">Checked in</p><p className="mt-2 text-3xl font-black text-[#6D4DFE]">{checkedIn}</p></div></div><div className="mt-7"><CheckInScanner/></div><section className="mt-8 rounded-2xl border-2 border-[#171717] bg-white p-6"><h2 className="font-black">Events</h2><div className="mt-4 space-y-3">{events.map(e=><div key={e.id} className="flex flex-wrap justify-between gap-3 border-b border-[#171717]/10 py-3"><div><p className="font-bold">{e.title}</p><p className="mt-1 text-xs text-[#777]">{e.eventDate.toLocaleDateString("en-IN")} · {e._count.registrations} registered</p></div><span className="text-xs font-black text-[#6D4DFE]">{e.status}</span></div>)}</div></section></div></main>;
}
