"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const field = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100";
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

  return <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <p className="text-xs font-bold tracking-[.18em] text-violet-700">CORE TEAM</p>
    <h1 className="mt-2 text-3xl font-bold">Create an event</h1>
    <form className="mt-7 space-y-6" onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold sm:col-span-2">Event title<input className={field} name="title" required minLength={3}/></label>
        <label className="block text-sm font-semibold sm:col-span-2">Description<textarea className={field} name="description" rows={4} required minLength={10}/></label>
        <div className="sm:col-span-2"><p className="text-sm font-semibold">Event poster</p><input className={field} type="file" accept="image/*" onChange={e => uploadPoster(e.target.files?.[0])}/><p className="mt-1 text-xs text-slate-500">JPG, PNG or WEBP · maximum 5 MB · {uploading ? "Uploading..." : "Upload poster to Cloudinary"}</p>{posterUrl && <img src={posterUrl} alt="Event poster preview" className="mt-3 max-h-64 rounded-xl border object-contain"/>}</div>
        <label className="block text-sm font-semibold">Venue<input className={field} name="venue" required/></label>
        <label className="block text-sm font-semibold">Prize pool<input className={field} name="prizePool" placeholder="e.g. ₹25,000 or Goodies + certificates"/></label>
        <label className="block text-sm font-semibold">Event date & time<input className={field} name="eventDate" type="datetime-local" required/></label>
        <label className="block text-sm font-semibold">Registration deadline<input className={field} name="registrationDeadline" type="datetime-local" required/></label>
        <label className="block text-sm font-semibold">Maximum registrations (optional)<input className={field} name="maxParticipants" type="number" min="1"/></label>
        <label className="block text-sm font-semibold">Contact person<input className={field} name="contactName" placeholder="Name"/></label>
        <label className="block text-sm font-semibold">Contact number<input className={field} name="contactPhone" type="tel" placeholder="10-digit number"/></label>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <h2 className="font-bold">Participation type</h2>
        <div className="mt-3 flex flex-wrap gap-3">{[["SOLO","Solo only"],["TEAM","Team only"],["BOTH","Solo or team"]].map(([value,label]) => <label key={value} className="flex items-center gap-2 rounded-xl border px-4 py-3 text-sm"><input type="radio" name="mode" checked={mode===value} onChange={() => setMode(value)}/>{label}</label>)}</div>
        {mode !== "SOLO" && <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Minimum team size (including leader)<input className={field} name="minTeamSize" type="number" min="2" max="20" defaultValue="2"/></label><label className="text-sm font-semibold">Maximum team size (including leader)<input className={field} name="maxTeamSize" type="number" min="2" max="20" defaultValue="4"/></label></div>}
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <h2 className="font-bold">Registration fee</h2>
        <div className="mt-3 flex gap-3"><button type="button" onClick={() => setIsPaid(false)} className={`rounded-xl border px-5 py-3 text-sm font-semibold ${!isPaid ? "border-violet-600 bg-violet-50 text-violet-700" : ""}`}>Free event</button><button type="button" onClick={() => setIsPaid(true)} className={`rounded-xl border px-5 py-3 text-sm font-semibold ${isPaid ? "border-violet-600 bg-violet-50 text-violet-700" : ""}`}>Paid event</button></div>
        {isPaid && <label className="mt-4 block text-sm font-semibold">Entry fee per participant (₹)<input className={field} name="entryFee" type="number" min="1" required placeholder="e.g. 200"/></label>}
        {isPaid && <p className="mt-2 text-xs text-amber-700">This saves and displays the fee. Online payment collection needs a payment gateway setup.</p>}
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-bold">Event rounds</h2><p className="mt-1 text-xs text-slate-500">Add round-wise details for participants.</p></div><button type="button" onClick={() => setRounds([...rounds,{title:"",description:""}])} className="rounded-lg border px-3 py-2 text-sm font-semibold">+ Add round</button></div>
        <div className="mt-4 space-y-4">{rounds.map((round,index)=><div className="rounded-xl bg-slate-50 p-4" key={index}><div className="mb-2 flex items-center justify-between"><p className="text-sm font-bold">Round {index+1}</p>{rounds.length>1 && <button type="button" onClick={()=>setRounds(rounds.filter((_,i)=>i!==index))} className="text-xs text-red-600">Remove</button>}</div><input className={field} placeholder="Round title" value={round.title} onChange={e=>setRounds(rounds.map((r,i)=>i===index?{...r,title:e.target.value}:r))}/><textarea className={field} rows={2} placeholder="Round description and rules" value={round.description} onChange={e=>setRounds(rounds.map((r,i)=>i===index?{...r,description:e.target.value}:r))}/></div>)}</div>
      </div>
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50" disabled={busy || uploading}>{busy ? "Publishing..." : "Publish event"}</button>
    </form>
  </section>;
}
