"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Member = { name: string; email: string; phone: string; collegeName: string };
const input = "mt-2 w-full rounded-xl border-2 border-[#171717]/20 bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-[#777] focus:border-[#6D4DFE] focus:ring-4 focus:ring-[#6D4DFE]/10";
const action = "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 hover:bg-[#171717] hover:shadow-[0_6px_0_#6D4DFE] active:translate-y-1 active:shadow-none disabled:opacity-50";
const softAction = "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#171717] bg-white px-5 py-3 text-sm font-bold text-[#171717] shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 hover:bg-[#FF5A36] active:translate-y-1 active:shadow-none";

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

  function changeMember(index:number,key:keyof Member,value:string) {
    setMembers(old=>old.map((m,i)=>i===index?{...m,[key]:value}:m));
  }

  async function register() {
    setBusy(true); setMessage("");
    try {
      const r = await fetch("/api/registrations", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({eventId:id,phone,collegeName,participationType:type,teamName:type==="TEAM"?teamName:undefined,teamMembers:type==="TEAM"?members:[]}) });
      const d = await r.json();
      if (!r.ok) { setMessage(d.error || "Registration failed."); setBusy(false); return; }
      router.push("/my-registrations");
    } catch {
      setMessage("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  if (!event) return <main className="min-h-screen bg-[#E0E0E1] px-5 py-16"><p className="mx-auto max-w-lg text-sm font-semibold text-[#66666c]">Loading event details...</p></main>;
  const canSolo = event.participationMode !== "TEAM";
  const canTeam = event.participationMode !== "SOLO";
  const totalTeam = members.length + 1;
  const optionClass = (active: boolean) => active ? action : softAction;

  return (
    <main className="min-h-screen bg-[#E0E0E1] px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <Link className="text-sm font-black text-[#6D4DFE] hover:text-[#FF5A36]" href="/events">← Back to events</Link>
        <section className="mt-6 rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_7px_0_#171717] sm:p-8">
          <p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">EVENT REGISTRATION</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#171717]">{event.title}</h1>
          <p className="mt-2 text-sm text-[#66666c]">{event.isPaid ? `Entry fee: ₹${event.entryFee} per participant` : "Free event"} · {event.venue}</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="ec-label">Your phone number<input className={input} value={phone} onChange={e=>setPhone(e.target.value)} required type="tel" placeholder="10-digit mobile number"/></label>
            <label className="ec-label">Your college name<input className={input} value={collegeName} onChange={e=>setCollegeName(e.target.value)} required placeholder="College / University"/></label>
          </div>

          {canSolo && canTeam && <div className="mt-7"><p className="ec-label">Participation</p><div className="mt-3 flex flex-wrap gap-3"><button type="button" onClick={()=>setType("SOLO")} className={optionClass(type==="SOLO")}>Solo</button><button type="button" onClick={()=>setType("TEAM")} className={optionClass(type==="TEAM")}>Team</button></div></div>}

          {type==="TEAM" && <div className="mt-7 space-y-5">
            <label className="ec-label">Team name<input className={input} value={teamName} onChange={e=>setTeamName(e.target.value)} required placeholder="Your team name"/></label>
            <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-black text-[#171717]">Other team members</h2><span className="ec-pill">{totalTeam} / {event.maxTeamSize} members</span></div>
            {members.map((m,i)=><div className="rounded-xl border-2 border-[#171717]/15 bg-[#E0E0E1]/40 p-4" key={i}><p className="mb-3 text-sm font-black">Member {i+2}</p><div className="grid gap-3 sm:grid-cols-2"><input className={input} placeholder="Full name" value={m.name} onChange={e=>changeMember(i,"name",e.target.value)}/><input className={input} type="email" placeholder="Email" value={m.email} onChange={e=>changeMember(i,"email",e.target.value)}/><input className={input} type="tel" placeholder="Phone number" value={m.phone} onChange={e=>changeMember(i,"phone",e.target.value)}/><input className={input} placeholder="College name" value={m.collegeName} onChange={e=>changeMember(i,"collegeName",e.target.value)}/></div><button type="button" className="mt-3 text-xs font-black text-red-600" onClick={()=>setMembers(old=>old.filter((_,j)=>j!==i))} disabled={totalTeam<=event.minTeamSize}>Remove member −</button></div>)}
            <button type="button" className={softAction} disabled={totalTeam>=event.maxTeamSize} onClick={()=>setMembers(old=>[...old,{name:"",email:"",phone:"",collegeName:""}])}>+ Add team member</button>
            <p className="text-xs font-semibold text-[#66666c]">Team size including you: {event.minTeamSize}–{event.maxTeamSize}</p>
          </div>}

          {message && <p role="alert" className="mt-5 rounded-xl border-2 border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>}
          <button className={`${action} mt-8 w-full`} onClick={register} disabled={busy}>{busy?"Submitting...":"Submit registration"} <span>↗</span></button>
          {event.isPaid && <p className="mt-4 text-xs font-semibold text-amber-700">Payment is not collected on this form yet. The event organiser will share payment instructions.</p>}
        </section>
      </div>
    </main>
  );
}
