"use client";
import Link from "next/link";
import {useParams,useRouter} from "next/navigation";
import {useState} from "react";
export default function RegisterPage(){const{id}=useParams<{id:string}>();const router=useRouter();const[message,setMessage]=useState("");const[busy,setBusy]=useState(false);
async function register(){setBusy(true);setMessage("");const r=await fetch("/api/registrations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eventId:id})});const d=await r.json();setBusy(false);if(!r.ok)return setMessage(d.error??"Registration failed.");setMessage("Registration successful!");router.push("/my-registrations");}
return <main className="container" style={{maxWidth:520,padding:"70px 0"}}><Link href="/events">← Back to events</Link><section className="card" style={{marginTop:24}}><h1>Confirm registration</h1><p>Registration is direct. You will be registered immediately if seats are available.</p>{message&&<p>{message}</p>}<button className="btn" onClick={register} disabled={busy}>{busy?"Registering...":"Confirm registration"}</button></section></main>;}