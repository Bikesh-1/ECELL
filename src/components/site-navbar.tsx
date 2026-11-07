import Link from "next/link";
import SignOutButton from "@/components/signout-button";

type SiteNavbarProps = { role?: string | null; authenticated: boolean };
const links = [
  { name: "HOME", href: "/" },
  { name: "EVENTS", href: "/events" },
  { name: "ABOUT US", href: "/about" },
  { name: "RESOURCES", href: "/resources" },
  { name: "COMMUNITY", href: "/leaderboard" },
];

const actionClass = "whitespace-nowrap rounded-xl border-2 border-[#171717] px-4 py-2.5 text-sm font-black text-[#171717] shadow-[0_4px_0_#171717] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none";

export default function SiteNavbar({ role, authenticated }: SiteNavbarProps) {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="mx-auto grid max-w-[94vw] grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 rounded-2xl border-2 border-[#171717] bg-white px-4 py-2 shadow-[0_7px_0_#171717,0_14px_25px_rgba(0,0,0,0.12)] sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6 md:px-8">
        <Link href="/" aria-label="E-Cell SMVIT home" className="flex shrink-0 items-center">
          <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995" alt="E-Cell SMVIT" className="h-11 w-11 object-contain md:h-14 md:w-14" />
        </Link>

        <div className="hidden min-w-0 items-center justify-center gap-5 lg:flex xl:gap-8">
          {links.map(item => <Link key={item.name} href={item.href} className="relative whitespace-nowrap text-xs font-black tracking-wide text-[#171717] transition-colors hover:text-[#FF5A36] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#FF5A36] after:transition-all hover:after:w-full xl:text-sm">{item.name}</Link>)}
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4">
          {authenticated ? (
            <>
              <Link href="/dashboard" className="hidden whitespace-nowrap text-xs font-extrabold text-[#171717] transition-colors hover:text-[#6D4DFE] sm:block md:text-sm">Dashboard</Link>
              <Link href="/my-registrations" className="hidden whitespace-nowrap text-xs font-extrabold text-[#171717] transition-colors hover:text-[#FF5A36] sm:block md:text-sm">My Registrations</Link>
              {role === "CORE" && <Link href="/admin" className="hidden whitespace-nowrap text-xs font-extrabold text-[#171717] transition-colors hover:text-[#6D4DFE] sm:block md:text-sm">Core Dashboard</Link>}
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className={actionClass + " bg-white hover:bg-[#E0E0E1]"}>Login</Link>
              <Link href="/signup" className={actionClass + " bg-[#6D4DFE] text-white hover:bg-[#FF5A36]"}>Sign up</Link>
            </>
          )}
        </div>

        <div className="col-span-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#171717]/10 pt-2 lg:hidden">
          {links.map(item => <Link key={item.name} href={item.href} className="whitespace-nowrap py-1 text-[11px] font-black tracking-wide text-[#171717] transition-colors hover:text-[#FF5A36]">{item.name}</Link>)}
          {authenticated ? (
            <>
              <Link href="/dashboard" className="whitespace-nowrap py-1 text-[11px] font-black text-[#171717] hover:text-[#6D4DFE]">DASHBOARD</Link>
              <Link href="/my-registrations" className="whitespace-nowrap py-1 text-[11px] font-black text-[#171717] hover:text-[#FF5A36] sm:hidden">MY REGISTRATIONS</Link>
              <Link href="/startup-hub" className="whitespace-nowrap py-1 text-[11px] font-black text-[#171717] hover:text-[#FF5A36]">STARTUP HUB</Link>
              <Link href="/mentors" className="whitespace-nowrap py-1 text-[11px] font-black text-[#171717] hover:text-[#6D4DFE]">MENTORS</Link>
              {role === "CORE" && <Link href="/admin" className="whitespace-nowrap py-1 text-[11px] font-black text-[#171717] hover:text-[#6D4DFE] sm:hidden">CORE DASHBOARD</Link>}
            </>
          ) : (
            <>
              <Link href="/login" className="whitespace-nowrap py-1 text-[11px] font-black text-[#171717] hover:text-[#6D4DFE]">LOGIN</Link>
              <Link href="/signup" className="whitespace-nowrap py-1 text-[11px] font-black text-[#171717] hover:text-[#FF5A36]">SIGN UP</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
