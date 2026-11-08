import Image from "next/image";
import Link from "next/link";
import { PageWrap, Eyebrow, PrimaryLink } from "@/components/brand-page-shell";

export default function AboutPage() {
 return <PageWrap>
  <section className="grid min-h-[570px] items-center gap-12 border-b border-[#171717]/10 py-12 lg:grid-cols-[1.05fr_.95fr]">
   <div className="page-hero-copy max-w-2xl">
    <Eyebrow>About E-Cell · SMVIT</Eyebrow>
    <h1 className="mt-5 text-[clamp(3.4rem,8vw,7rem)] font-black leading-[.9] tracking-[-.075em]">Ideas don't<br/><span className="text-[#6D4DFE]">build themselves.</span></h1>
    <p className="mt-7 max-w-xl text-base leading-8 text-[#66666e] sm:text-lg">We are a student-driven entrepreneurship community at SMVIT, bringing curious minds together to explore ideas, learn by doing and take the first steps towards building something meaningful.</p>
    <div className="mt-8 flex flex-wrap gap-3"><PrimaryLink href="/events">Explore what we do</PrimaryLink><Link href="/team" className="inline-flex items-center rounded-xl border-2 border-[#171717]/15 bg-white/70 px-5 py-3 text-sm font-bold hover:border-[#6D4DFE]">Meet the team</Link></div>
   </div>
   <div className="page-hero-image relative mx-auto w-full max-w-[540px]">
    <div className="absolute -inset-4 rotate-[-4deg] rounded-[2rem] bg-[#FF5A36]" />
    <div className="relative h-[420px] overflow-hidden rounded-[1.7rem] border-[5px] border-white shadow-xl">
     <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85" alt="Students collaborating around a table" className="h-full w-full object-cover"/>
     <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10"/>
     <p className="absolute bottom-7 left-7 max-w-xs text-3xl font-black leading-tight text-white">Curiosity is where it begins.</p>
    </div>
    <div className="absolute -bottom-6 -left-5 rotate-[-5deg] rounded-xl bg-[#171717] px-5 py-4 text-white shadow-xl"><p className="text-[9px] font-bold tracking-[.2em] text-white/50">OUR MINDSET</p><p className="mt-1 text-lg font-black">Think · Build · Grow</p></div>
   </div>
  </section>
  <section className="grid gap-8 py-20 lg:grid-cols-[.7fr_1.3fr]">
   <div className="reveal-up"><Eyebrow>What drives us</Eyebrow><h2 className="mt-4 text-4xl font-black leading-tight tracking-[-.06em] sm:text-5xl">A space to<br/>start something.</h2></div>
   <div className="grid gap-4 sm:grid-cols-2">
    {[["01","Learn by doing","Workshops, sessions and hands-on experiences that turn curiosity into practical skills."],["02","Find your people","A community of students who share ideas, exchange feedback and build together."],["03","Take the stage","Pitch ideas, participate in challenges and get comfortable presenting your work."],["04","Keep moving","Connect with mentors, explore opportunities and take the next step at your own pace."]].map(([n,t,d])=><article key={n} className="reveal-card rounded-2xl border border-[#171717]/10 bg-white/85 p-6"><p className="text-xs font-black text-[#FF5A36]">{n} /</p><h3 className="mt-5 text-xl font-black">{t}</h3><p className="mt-3 text-sm leading-7 text-[#686870]">{d}</p></article>)}
   </div>
  </section>
  <section className="reveal-up grid overflow-hidden rounded-[1.7rem] bg-[#171717] text-white md:grid-cols-[1fr_.85fr]">
   <div className="p-8 sm:p-12"><Eyebrow>Our belief</Eyebrow><h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.03] tracking-[-.06em] sm:text-5xl">The next big idea could come from your classroom.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-white/60">You don't need to have everything figured out. Bring your questions, your energy and the willingness to try.</p><div className="mt-8"><PrimaryLink href="/signup">Become part of E-Cell</PrimaryLink></div></div>
   <div className="min-h-[280px]"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85" alt="Team collaborating on a project" className="h-full w-full object-cover opacity-80"/></div>
  </section>
 </PageWrap>;
}
