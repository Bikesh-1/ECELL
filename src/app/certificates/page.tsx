import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CertificatesPage(){
 const session=await auth();if(!session?.user?.id)redirect("/login");
 const certificates=await prisma.certificate.findMany({where:{userId:session.user.id},orderBy:{issuedAt:"desc"}});
 return <main className="min-h-screen bg-[#E0E0E1] px-5 py-10"><div className="mx-auto max-w-5xl"><Link href="/dashboard" className="text-sm font-black text-[#6D4DFE]">← Dashboard</Link><header className="mt-7"><p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">YOUR ACHIEVEMENTS</p><h1 className="mt-2 text-4xl font-black tracking-[-.06em]">Certificates<span className="text-[#FF5A36]">.</span></h1></header><div className="mt-8 grid gap-4 md:grid-cols-2">{certificates.map(c=><article key={c.id} className="rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_5px_0_#171717]"><p className="text-[10px] font-black tracking-[.2em] text-[#6D4DFE]">E-CELL SMVIT · CERTIFICATE</p><h2 className="mt-3 text-xl font-black">{c.title}</h2><p className="mt-2 text-sm text-[#666]">Issued to {c.recipient} on {c.issuedAt.toLocaleDateString("en-IN")}</p><p className="mt-4 font-mono text-xs text-[#777]">ID: {c.code}</p><Link href={`/certificates/${c.code}`} className="mt-5 inline-flex rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-4 py-2.5 text-xs font-black text-white shadow-[0_3px_0_#171717]">View & print ↗</Link></article>)}{!certificates.length&&<p className="rounded-xl border-2 border-dashed border-[#171717]/30 bg-white/60 p-8 text-sm text-[#777]">Certificates earned from attended events will appear here.</p>}</div></div></main>;
}
