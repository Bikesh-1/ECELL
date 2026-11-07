"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function SignupPage() {
 const router=useRouter(); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");const f=new FormData(e.currentTarget);const r=await fetch("/api/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:f.get("name"),email:f.get("email"),password:f.get("password")})});const d=await r.json();setBusy(false);if(!r.ok)return setError(d.error??"Signup failed.");router.push("/login?created=1");}
 return <main className="container" style={{maxWidth:440,padding:"70px 0"}}><Link href="/">← E-Cell SMVIT</Link><section className="card" style={{marginTop:24}}><h1>Create account</h1><p className="muted">Register for E-Cell events with one account.</p><form onSubmit={submit}><label className="field">Full name<input name="name" required minLength={2} maxLength={80}/></label><label className="field">Email<input name="email" type="email" required/></label><label className="field">Password<input name="password" type="password" minLength={8} required/></label>{error&&<p style={{color:"crimson"}}>{error}</p>}<button className="btn" disabled={busy} style={{width:"100%"}}>{busy?"Creating...":"Create account"}</button></form><p className="muted">Already registered? <Link href="/login">Login</Link></p></section></main>;
}