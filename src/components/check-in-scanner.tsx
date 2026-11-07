"use client";

import { useEffect, useRef, useState } from "react";

export default function CheckInScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    let stream: MediaStream | null = null;
    let timer = 0;
    let stopped = false;
    const start = async () => {
      try {
        const detectorCtor = (window as any).BarcodeDetector;
        if (!detectorCtor) { setMessage("QR camera scanning is not supported in this browser. Enter the ticket code manually."); setScanning(false); return; }
        const detector = new detectorCtor({ formats: ["qr_code"] });
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (!videoRef.current || stopped) { stream.getTracks().forEach(track => track.stop()); return; }
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        const scan = async () => {
          if (stopped || !videoRef.current) return;
          try {
            const results = await detector.detect(videoRef.current);
            if (results.length && results[0].rawValue) {
              setCode(results[0].rawValue);
              setScanning(false);
              stream?.getTracks().forEach(track => track.stop());
              return;
            }
          } catch {}
          timer = window.setTimeout(scan, 350);
        };
        scan();
      } catch { setMessage("Camera permission denied or unavailable. Enter the ticket code manually."); setScanning(false); }
    };
    start();
    return () => { stopped = true; window.clearTimeout(timer); stream?.getTracks().forEach(track => track.stop()); };
  }, [scanning]);

  async function checkIn() {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/check-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: code.trim() }) });
      const data = await response.json();
      setMessage(response.ok ? `✓ Checked in ${data.attendee} for ${data.event}` : data.error || "Check-in failed");
      if (response.ok) setCode("");
    } catch { setMessage("Network error. Please retry."); }
    finally { setBusy(false); }
  }

  return <section className="rounded-2xl border-2 border-[#171717] bg-white p-5 shadow-[0_5px_0_#171717] sm:p-7">
    <p className="text-xs font-black tracking-[.2em] text-[#6D4DFE]">LIVE ENTRY DESK</p>
    <h2 className="mt-2 text-2xl font-black text-[#171717]">Scan an event pass</h2>
    <p className="mt-2 text-sm text-[#66666c]">Use a camera with QR support or enter the code printed below the attendee QR.</p>
    {scanning && <video ref={videoRef} className="mt-5 max-h-72 w-full rounded-xl bg-black object-cover" playsInline muted />}
    <div className="mt-5 flex flex-wrap gap-3"><button onClick={()=>{setMessage("");setScanning(v=>!v);}} className="rounded-xl border-2 border-[#171717] bg-[#FF5A36] px-4 py-3 text-sm font-black text-[#171717] shadow-[0_4px_0_#171717]">{scanning?"Stop camera":"Open QR scanner"}</button></div>
    <label className="mt-5 block text-xs font-black text-[#171717]">TICKET CODE<input value={code} onChange={e=>setCode(e.target.value)} placeholder="Paste or scan registration code" className="mt-2 w-full rounded-xl border-2 border-[#171717]/20 px-4 py-3 font-mono text-sm outline-none focus:border-[#6D4DFE]" /></label>
    <button onClick={checkIn} disabled={!code.trim()||busy} className="mt-4 w-full rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-3.5 text-sm font-black text-white shadow-[0_4px_0_#171717] disabled:opacity-40">{busy?"Checking...":"Confirm attendance →"}</button>
    {message && <p role="status" className="mt-4 rounded-xl border border-[#6D4DFE]/20 bg-[#6D4DFE]/5 p-3 text-sm font-semibold text-[#171717]">{message}</p>}
  </section>;
}
