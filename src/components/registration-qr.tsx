"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function RegistrationQr({ code }: { code: string }) {
  const [src, setSrc] = useState("");
  useEffect(() => { QRCode.toDataURL(code, { width: 180, margin: 1, errorCorrectionLevel: "M", color: { dark: "#171717", light: "#FFFFFF" } }).then(setSrc).catch(() => setSrc("")); }, [code]);
  return <div className="flex items-center gap-4 rounded-xl border border-[#171717]/15 bg-[#F6F5F2] p-3">
    {src ? <img src={src} alt="Event entry QR code" className="h-24 w-24 rounded-lg bg-white p-1" /> : <div className="h-24 w-24 animate-pulse rounded-lg bg-[#E0E0E1]" />}
    <div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[.15em] text-[#6D4DFE]">Entry pass</p><p className="mt-1 break-all font-mono text-xs font-bold text-[#171717]">{code}</p><p className="mt-1 text-[10px] text-[#777]">Show this QR at the event entrance.</p></div>
  </div>;
}
