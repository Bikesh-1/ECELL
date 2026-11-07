import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/signout-button";

export default async function Home() {
  const session = await auth();
  const events = await prisma.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { eventDate: "asc" }, take: 6, include: { _count: { select: { registrations: true } } } });
  return <main className="container" style={{ padding: "48px 0" }}>
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 64 }}>
      <strong>E-CELL <span style={{ color: "#4f47ea" }}>SMVIT</span></strong>
      <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <Link href="/events">Events</Link>
        {session ? <><Link href="/my-registrations">My registrations</Link>{session.user.role === "ADMIN" && <Link href="/admin">Admin</Link>}<SignOutButton /></> : <><Link href="/login">Login</Link><Link className="btn" href="/signup">Create account</Link></>}
      </nav>
    </header>
    <section style={{ padding: "48px 0 60px" }}>
      <p style={{ color: "#4f47ea", fontWeight: 700 }}>ENTREPRENEURSHIP CELL · SMVIT</p>
      <h1 style={{ fontSize: "clamp(42px, 7vw, 76px)", lineHeight: 1.02, maxWidth: 800, margin: "18px 0" }}>Ideas become opportunities. Start here.</h1>
      <p className="muted" style={{ fontSize: 18, maxWidth: 600 }}>Explore workshops, competitions and entrepreneurship events. Register directly and keep track of your events.</p>
      <Link className="btn" href="/events" style={{ display: "inline-block", marginTop: 18 }}>Explore events →</Link>
    </section>
    <h2>Upcoming events</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16, marginTop: 20 }}>
      {events.map(event => <article className="card" key={event.id}>
        <p className="muted">{event.eventDate.toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
        <h3>{event.title}</h3><p className="muted">{event.venue}</p>
        <p>{event._count.registrations} registered</p>
        <Link href="/events" style={{ color: "#4f47ea", fontWeight: 700 }}>View event →</Link>
      </article>)}
      {events.length === 0 && <p className="muted">No published events yet. Check back soon.</p>}
    </div>
  </main>;
}
