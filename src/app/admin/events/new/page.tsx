import Link from "next/link";
import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";
import EventForm from "./event-form";
export default async function NewEventPage(){const session=await auth();if(session?.user?.role!=="ADMIN")redirect("/login");return <main className="container" style={{maxWidth:650,padding:"40px 0"}}><Link href="/admin">← Dashboard</Link><EventForm/></main>;}