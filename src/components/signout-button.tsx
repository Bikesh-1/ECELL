"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-xl border-2 border-[#171717] bg-white px-4 py-2.5 text-sm font-black text-[#171717] shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 hover:bg-[#FF5A36] active:translate-y-1 active:shadow-none"
    >
      Sign out
    </button>
  );
}
