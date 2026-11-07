import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import EventForm from "./event-form";
export default async function NewEventPage() {
  const session = await auth();
  if (session?.user?.role !== "CORE") redirect("/login");
  return <main className="mx-auto max-w-3xl px-5 py-10"><Link className="text-sm font-semibold text-violet-700" href="/admin">← Core dashboard</Link><EventForm/></main>;
}