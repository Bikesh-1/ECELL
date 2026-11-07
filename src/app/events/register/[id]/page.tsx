"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Member = { name: string; email: string; phone: string; collegeName: string };
const input = "mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-violet-500";
export default function RegisterPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [type, setType] = useState<"SOLO"|"TEAM">("SOLO");
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { fetch("/api/events").then(r=>r.json()).then(d=>setEvent(d.events?.find((e:any)=>e.id===id) || null)); }, [id]);
  useEffect(() => {
    if (!event) return;
    if (event.participationMode === "TEAM") setType("TEAM");
    else setType("SOLO");
    setMembers(Array.from({length: Math.max(0, event.minTeamSize - 1)}, () => ({name:"",email:"",phone:"",collegeName:""})));
  }, [event]);

  function changeMember(index:number,key:keyof Member,value:string) { setMembers(old=>old.map((m,i)=>i===index?{...m,[key]:value}:m)); }
  async function register() {
    setBusy(true); setMessage("");
    const r = await fetch("/api/registrations", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({eventId:id,phone,collegeName,participationType:type,teamName:type==="TEAM"?teamName:undefined,teamMembers:type==="TEAM"?members:[]}) });
    const d = await r.json(); setBusy(false);
    if (!r.ok) return setMessage(d.error || "Registration failed.");
    router.push("/my-registrations");
  }
  if (!event) return <main className="mx-auto max-w-lg px-5 py-16"><p>Loading event details...</p></main>;
  const canSolo = event.participationMode !== "TEAM";
  const canTeam = event.participationMode !== "SOLO";
  const totalTeam = members.length + 1;
  return <main className="mx-auto max-w-2xl px-5 py-12">
    <Link className="text-sm font-semibold text-violet-700" href="/events">← Back to events</Link>
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-bold tracking-[.18em] text-violet-700">EVENT REGISTRATION</p><h1 className="mt-2 text-3xl font-bold">{event.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{event.isPaid ? `Entry fee: ₹${event.entryFee} per participant` : "Free event"} · {event.venue}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Your phone number<input className={input} value={phone} onChange={e=>setPhone(e.target.value)} required type="tel" placeholder="10-digit mobile number"/></label>
        <label className="text-sm font-semibold">Your college name<input className={input} value={collegeName} onChange={e=>setCollegeName(e.target.value)} required placeholder="College / University"/></label>
      </div>
      {canSolo && canTeam && <div className="mt-6"><p className="text-sm font-semibold">Participation</p><div className="mt-2 flex gap-3"><button type="button" onClick={()=>setType("SOLO")} className={`rounded-xl border px-4 py-3 text-sm ${type==="SOLO"?"border-violet-600 bg-violet-50 text-violet-700":""}`}>Solo</button><button type="button" onClick={()=>setType("TEAM")} className={`rounded-xl border px-4 py-3 text-sm ${type==="TEAM"?"border-violet-600 bg-violet-50 text-violet-700":""}`}>Team</button></div></div>}
      {type==="TEAM" && <div className="mt-6 space-y-4"><label className="block text-sm font-semibold">Team name<input className={input} value={teamName} onChange={e=>setTeamName(e.target.value)} required placeholder="Your team name"/></label><div className="flex items-center justify-between"><h2 className="font-bold">Other team members</h2><p className="text-xs text-slate-500">{totalTeam} / {event.maxTeamSize} members (you included)</p></div>{members.map((m,i)=><div className="rounded-2xl border border-slate-200 p-4" key={i}><p className="mb-3 text-sm font-bold">Member {i+2}</p><div className="grid gap-3 sm:grid-cols-2"><input className={input} placeholder="Full name" value={m.name} onChange={e=>changeMember(i,"name",e.target.value)}/><input className={input} type="email" placeholder="Email" value={m.email} onChange={e=>changeMember(i,"email",e.target.value)}/><input className={input} type="tel" placeholder="Phone number" value={m.phone} onChange={e=>changeMember(i,"phone",e.target.value)}/><input className={input} placeholder="College name" value={m.collegeName} onChange={e=>changeMember(i,"collegeName",e.target.value)}/></div><button type="button" className="mt-2 text-xs text-red-600" onClick={()=>setMembers(old=>old.filter((_,j)=>i!==j))} disabled={totalTeam<=event.minTeamSize}>Remove member</button></div>)}<button type="button" className="rounded-lg border px-3 py-2 text-sm font-semibold" disabled={totalTeam>=event.maxTeamSize} onClick={()=>setMembers(old=>[...old,{name:"",email:"",phone:"",collegeName:""}])}>+ Add team member</button><p className="text-xs text-slate-500">Team size including you: {event.minTeamSize}–{event.maxTeamSize}</p></div>}
      {message && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{message}</p>}
      <button className="mt-7 w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white disabled:opacity-50" onClick={register} disabled={busy}>{busy?"Submitting...": "Submit registration"}</button>
      {event.isPaid && <p className="mt-3 text-xs text-amber-700">Payment is not collected on this form yet. The event organiser will share payment instructions.</p>}
    </section>
  </main>;
}
