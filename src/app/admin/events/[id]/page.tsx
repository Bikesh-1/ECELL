import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export default async function EventRegistrationsPage({params}:{params:Promise<{id:string}>}) {
 const session=await auth(); if(session?.user?.role!=="ADMIN") redirect("/login");
 const {id}=await params;
 const event=await prisma.event.findUnique({where:{id},include:{registrations:{include:{user:{select:{name:true,email:true}}},orderBy:{registeredAt:"desc"}}}});
 if(!event) notFound();
 const csv=["Name,Email,Registered At",...event.registrations.map(r=>[r.user.name,r.user.email,r.registeredAt.toISOString()].map(v=>'"'+v.replaceAll('"','""')+'"').join(","))].join("\n");
 return <main className="container" style={{padding:"40px 0"}}><Link href="/admin">← Dashboard</Link><h1>{event.title}</h1><p className="muted">{event.registrations.length} registered</p><a className="btn" href={"data:text/csv;charset=utf-8,"+encodeURIComponent(csv)} download="event-registrations.csv">Export CSV</a><div style={{overflowX:"auto",marginTop:24}}><table style={{width:"100%",borderCollapse:"collapse",background:"white"}}><thead><tr><th style={{textAlign:"left",padding:12}}>Name</th><th style={{textAlign:"left",padding:12}}>Email</th><th style={{textAlign:"left",padding:12}}>Registered</th></tr></thead><tbody>{event.registrations.map(r=><tr key={r.id}><td style={{padding:12,borderTop:"1px solid #eee"}}>{r.user.name}</td><td style={{padding:12,borderTop:"1px solid #eee"}}>{r.user.email}</td><td style={{padding:12,borderTop:"1px solid #eee"}}>{r.registeredAt.toLocaleString("en-IN")}</td></tr>)}</tbody></table></div></main>;
}
