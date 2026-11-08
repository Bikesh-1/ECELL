import Link from "next/link";
import SignOutButton from "@/components/signout-button";

type SiteNavbarProps = { role?: string | null; authenticated: boolean };
const links = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "About E-Cell", href: "/about" },
  { name: "Startups", href: "/startups" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

const actionClass = "whitespace-nowrap rounded-xl border-2 border-[#171717] px-4 py-2.5 text-sm font-black text-[#171717] shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none";

export default function SiteNavbar({ role, authenticated }: SiteNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#171717] bg-[#E0E0E1]/95 px-4 backdrop-blur-xl sm:px-6">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
        <Link href="/" aria-label="E-Cell SMVIT home" className="flex shrink-0 items-center gap-3 rounded-xl border-2 border-[#171717] bg-white px-3 py-2 shadow-[0_4px_0_#171717] transition-transform hover:-translate-y-0.5">
          <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995" alt="E-Cell SMVIT" className="h-10 w-10 object-contain" />
          <span className="text-sm font-black tracking-tight text-[#171717]">E-CELL <span className="text-[#6D4DFE]">SMVIT</span></span>
        </Link>

        <div className="order-3 flex w-full items-center gap-1 overflow-x-auto pb-1 md:order-none md:w-auto md:pb-0">
          {links.map(item => (
            <Link key={item.name} href={item.href} className="whitespace-nowrap rounded-lg border-2 border-transparent px-3 py-2 text-sm font-bold text-[#171717] transition-all hover:-translate-y-0.5 hover:border-[#171717] hover:bg-[#FF5A36] hover:shadow-[0_3px_0_#171717]">
              {item.name}
            </Link>
          ))}
          {authenticated && (
            <>
              <Link href="/startup-hub" className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-[#55555d] transition-colors hover:bg-white/70 hover:text-[#6D4DFE]">Startup Hub</Link>
              <Link href="/mentors" className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-[#55555d] transition-colors hover:bg-white/70 hover:text-[#6D4DFE]">Mentors</Link>
            </>
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {authenticated ? (
            <>
              <Link href="/dashboard" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[#44444b] transition-colors hover:bg-white/70 hover:text-[#6D4DFE] sm:inline-flex">Dashboard</Link>
              <Link href="/my-registrations" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[#44444b] transition-colors hover:bg-white/70 hover:text-[#6D4DFE] sm:inline-flex">My registrations</Link>
              {role === "CORE" && <Link href="/admin" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[#44444b] transition-colors hover:bg-white/70 hover:text-[#6D4DFE] sm:inline-flex">Core dashboard</Link>}
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className={actionClass + " bg-white hover:bg-[#FF5A36]"}>Login</Link>
              <Link href="/signup" className={actionClass + " bg-[#6D4DFE] text-white hover:bg-[#FF5A36] hover:text-[#171717]"}>Sign up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
