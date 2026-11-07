"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const field = "mt-2 w-full rounded-xl border-2 border-[#171717]/20 bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-[#777] focus:border-[#6D4DFE] focus:ring-4 focus:ring-[#6D4DFE]/10";
const card = "rounded-2xl border-2 border-[#171717] bg-white shadow-[0_5px_0_#171717] transition-all duration-200";
const action = "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 hover:bg-[#171717] hover:shadow-[0_6px_0_#6D4DFE] active:translate-y-1 active:shadow-none disabled:opacity-50";
const softAction = "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#171717] bg-white px-5 py-3 text-sm font-bold text-[#171717] shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 hover:bg-[#FF5A36] active:translate-y-1 active:shadow-none";
type Round = { title: string; description: string };

export default function EventForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [posterUrl, setPosterUrl] = useState("");
  const [mode, setMode] = useState("SOLO");
  const [isPaid, setIsPaid] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([{ title: "", description: "" }]);

  async function uploadPoster(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please select an image file.");
    if (file.size > 5 * 1024 * 1024) return setError("Poster image must be under 5 MB.");
    setUploading(true); setError("");
    const body = new FormData(); body.append("file", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) setError(data.error || "Poster upload failed.");
      else setPosterUrl(data.url);
    } catch { setError("Poster upload failed. Check your Cloudinary configuration."); }
    finally { setUploading(false); }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const f = new FormData(e.currentTarget);
    const cleanRounds = rounds.filter(r => r.title.trim() && r.description.trim());
    const payload = {
      title: f.get("title"), description: f.get("description"), venue: f.get("venue"),
      eventDate: f.get("eventDate"), registrationDeadline: f.get("registrationDeadline"),
      maxParticipants: f.get("maxParticipants") ? Number(f.get("maxParticipants")) : null,
      posterUrl, prizePool: f.get("prizePool"), contactName: f.get("contactName"), contactPhone: f.get("contactPhone"),
      participationMode: mode, minTeamSize: Number(f.get("minTeamSize") || 2), maxTeamSize: Number(f.get("maxTeamSize") || 4),
      isPaid, entryFee: isPaid ? Number(f.get("entryFee") || 0) : 0, rounds: cleanRounds, status: "PUBLISHED",
    };
    try {
      const r = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const d = await r.json();
      if (!r.ok) { setError(d.error ?? "Could not create event."); setBusy(false); return; }
      router.push("/admin");
    } catch { setError("Something went wrong. Please try again."); setBusy(false); }
  }

  const choice = (selected: boolean) => selected
    ? "border-[#6D4DFE] bg-[#6D4DFE]/10 text-[#6D4DFE]"
    : "border-[#171717]/20 bg-white text-[#171717] hover:border-[#171717]";

  return (
    <section className="mt-7 rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[0_6px_0_#171717] sm:p-8">
      <p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">CORE TEAM / NEW EVENT</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-[#171717]">Create an event</h1>
      <p className="mt-2 text-sm text-[#66666c]">Add the details students need to discover and join your event.</p>
      <form className="mt-8 space-y-7" onSubmit={submit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="ec-label sm:col-span-2">Event title<input className={field} name="title" required minLength={3} placeholder="e.g. Startup Pitch Night"/></label>
          <label className="ec-label sm:col-span-2">Description<textarea className={field} name="description" rows={4} required minLength={10} placeholder="Tell participants what the event is about..."/></label>
          <div className="sm:col-span-2">
            <p className="ec-label">Event poster</p>
            <input className={field} type="file" accept="image/*" onChange={e => uploadPoster(e.target.files?.[0])}/>
            <p className="mt-2 text-xs text-[#77777d]">JPG, PNG or WEBP · maximum 5 MB · {uploading ? "Uploading..." : "Upload poster to Cloudinary"}</p>
            {posterUrl && <img src={posterUrl} alt="Event poster preview" className="mt-4 max-h-64 rounded-xl border-2 border-[#171717] object-contain"/>}
          </div>
          <label className="ec-label">Venue<input className={field} name="venue" required placeholder="Event venue"/></label>
          <label className="ec-label">Prize pool<input className={field} name="prizePool" placeholder="e.g. ₹25,000 or goodies"/></label>
          <label className="ec-label">Event date & time<input className={field} name="eventDate" type="datetime-local" required/></label>
          <label className="ec-label">Registration deadline<input className={field} name="registrationDeadline" type="datetime-local" required/></label>
          <label className="ec-label">Maximum registrations<input className={field} name="maxParticipants" type="number" min="1" placeholder="Optional"/></label>
          <label className="ec-label">Contact person<input className={field} name="contactName" placeholder="Name"/></label>
          <label className="ec-label">Contact number<input className={field} name="contactPhone" type="tel" placeholder="10-digit number"/></label>
        </div>

        <div className="rounded-xl border-2 border-[#171717]/15 bg-[#E0E0E1]/40 p-5">
          <h2 className="font-black text-[#171717]">Participation type</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {([["SOLO","Solo only"],["TEAM","Team only"],["BOTH","Solo or team"]] as const).map(([value,label]) => (
              <label key={value} className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${choice(mode===value)}`}>
                <input type="radio" name="mode" checked={mode===value} onChange={() => setMode(value)} className="accent-[#6D4DFE]"/>{label}
              </label>
            ))}
          </div>
          {mode !== "SOLO" && <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="ec-label">Minimum team size (including leader)<input className={field} name="minTeamSize" type="number" min="2" max="20" defaultValue="2"/></label><label className="ec-label">Maximum team size (including leader)<input className={field} name="maxTeamSize" type="number" min="2" max="20" defaultValue="4"/></label></div>}
        </div>

        <div className="rounded-xl border-2 border-[#171717]/15 bg-[#E0E0E1]/40 p-5">
          <h2 className="font-black text-[#171717]">Registration fee</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => setIsPaid(false)} className={`${isPaid ? softAction : action} px-5`}>Free event</button>
            <button type="button" onClick={() => setIsPaid(true)} className={`${isPaid ? action : softAction} px-5`}>Paid event</button>
          </div>
          {isPaid && <label className="ec-label mt-4 block">Entry fee per participant (₹)<input className={field} name="entryFee" type="number" min="1" required placeholder="e.g. 200"/></label>}
          {isPaid && <p className="mt-3 text-xs font-semibold text-amber-700">This saves and displays the fee. Online payment collection needs a payment gateway setup.</p>}
        </div>

        <div className="rounded-xl border-2 border-[#171717]/15 bg-[#E0E0E1]/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h2 className="font-black text-[#171717]">Event rounds</h2><p className="mt-1 text-xs text-[#77777d]">Add round-wise details for participants.</p></div>
            <button type="button" onClick={() => setRounds([...rounds,{title:"",description:""}])} className={softAction}>+ Add round</button>
          </div>
          <div className="mt-4 space-y-4">
            {rounds.map((round,index)=><div className="rounded-xl border-2 border-[#171717]/10 bg-white p-4" key={index}>
              <div className="mb-2 flex items-center justify-between"><p className="text-sm font-black">Round {index+1}</p>{rounds.length>1 && <button type="button" onClick={()=>setRounds(rounds.filter((_,i)=>i!==index))} className="text-xs font-bold text-red-600">Remove</button>}</div>
              <input className={field} placeholder="Round title" value={round.title} onChange={e=>setRounds(rounds.map((r,i)=>i===index?{...r,title:e.target.value}:r))}/>
              <textarea className={field} rows={2} placeholder="Round description and rules" value={round.description} onChange={e=>setRounds(rounds.map((r,i)=>i===index?{...r,description:e.target.value}:r))}/>
            </div>)}
          </div>
        </div>
        {error && <p role="alert" className="rounded-xl border-2 border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
        <button className={action} disabled={busy || uploading}>{busy ? "Publishing..." : "Publish event"} <span>↗</span></button>
      </form>
    </section>
  );
}
