import Link from "next/link";
import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
export default async function MyRegistrationsPage(){const session=await auth();if(!session)redirect("/login");const registrations=await prisma.registration.findMany({where:{userId:session.user.id},include:{event:true},orderBy:{registeredAt:"desc"}});
return <main className="container" style={{padding:"40px 0"}}><Link href="/events">← Events</Link><h1>My registrations</h1>{registrations.map(item=><article className="card" key={item.id} style={{margin:"14px 0"}}><h2>{item.event.title}</h2><p>{item.event.venue} · {item.event.eventDate.toLocaleDateString("en-IN")}</p><p className="muted">Registered on {item.registeredAt.toLocaleDateString("en-IN")}</p></article>)}{registrations.length===0&&<p className="muted">You have not registered for any events yet.</p>}</main>;}