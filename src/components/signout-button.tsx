"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex min-h-10 items-center rounded-lg border border-[#171717]/15 bg-white px-4 py-2 text-sm font-semibold text-[#171717] transition-colors hover:border-[#6D4DFE]/40 hover:text-[#6D4DFE]"
    >
      Sign out
    </button>
  );
}
