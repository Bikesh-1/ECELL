"use client";
import Link from "next/link";
import { FormEvent,useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LoginPage(){const router=useRouter();const[error,setError]=useState("");const[busy,setBusy]=useState(false);
async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");const f=new FormData(e.currentTarget);const r=await signIn("credentials",{email:f.get("email"),password:f.get("password"),redirect:false});setBusy(false);if(r?.error)return setError("Invalid email or password.");router.push("/events");router.refresh();}
return <main className="container" style={{maxWidth:440,padding:"70px 0"}}><Link href="/">← E-Cell SMVIT</Link><section className="card" style={{marginTop:24}}><h1>Welcome back</h1><form onSubmit={submit}><label className="field">Email<input name="email" type="email" required/></label><label className="field">Password<input name="password" type="password" required/></label>{error&&<p style={{color:"crimson"}}>{error}</p>}<button className="btn" disabled={busy} style={{width:"100%"}}>{busy?"Signing in...":"Login"}</button></form><p className="muted">New here? <Link href="/signup">Create account</Link></p></section></main>;}