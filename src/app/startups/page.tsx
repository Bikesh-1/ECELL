import Link from "next/link";
import { PageWrap, Eyebrow, PrimaryLink } from "@/components/brand-page-shell";

export default function StartupsPage(){
 const items=[
  {n:"01",title:"Idea validation",body:"Turn a rough thought into a clear problem statement and test your assumptions.",image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85"},
  {n:"02",title:"Mentor network",body:"Get fresh perspectives and guidance from people with experience across domains.",image:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85"},
  {n:"03",title:"Pitch practice",body:"Refine your story, explain your solution and prepare to present your work.",image:"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=85"},
  {n:"04",title:"Community & visibility",body:"Meet collaborators, find early supporters and share your progress with the ecosystem.",image:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85"}
 ];
 return <PageWrap>
  <section className="grid min-h-[540px] items-center gap-10 border-b border-[#171717]/10 py-12 lg:grid-cols-[1fr_.9fr]">
   <div className="page-hero-copy"><Eyebrow>Startup ecosystem · E-Cell SMVIT</Eyebrow><h1 className="mt-5 text-[clamp(3.2rem,7.5vw,6.7rem)] font-black leading-[.91] tracking-[-.075em]">From first<br/>thought to<br/><span className="text-[#6D4DFE]">first pitch.</span></h1><p className="mt-7 max-w-xl text-base leading-8 text-[#686870]">A place for student founders and aspiring builders to find direction, people and opportunities to move their ideas forward.</p><div className="mt-8"><PrimaryLink href="/contact">Talk to E-Cell</PrimaryLink></div></div>
   <div className="page-hero-image relative"><div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-[#6D4DFE]/15"/><div className="relative h-[400px] overflow-hidden rounded-[1.7rem] border-[5px] border-white shadow-xl"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" alt="Startup founders working together" className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><p className="absolute bottom-7 left-7 text-3xl font-black text-white">Build what matters.</p></div></div>
  </section>
  <section className="py-20"><div className="reveal-up max-w-2xl"><Eyebrow>How we can help</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-[-.06em] sm:text-5xl">The support behind<br/>your next move.</h2><p className="mt-4 text-sm leading-7 text-[#686870]">Explore the kinds of support and experiences that help student-led ideas grow. Availability may vary by programme and initiative.</p></div>
   <div className="mt-9 grid gap-5 sm:grid-cols-2">{items.map(item=><article key={item.n} className="reveal-card group overflow-hidden rounded-2xl border border-[#171717]/10 bg-white"><div className="h-52 overflow-hidden"><img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/></div><div className="p-6"><p className="text-xs font-black text-[#FF5A36]">{item.n} / ECOSYSTEM</p><h3 className="mt-3 text-2xl font-black tracking-tight">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#686870]">{item.body}</p></div></article>)}</div>
  </section>
  <section className="reveal-up rounded-[1.7rem] bg-[#FF5A36] p-8 sm:p-12"><Eyebrow>Have an idea?</Eyebrow><div className="mt-4 flex flex-col justify-between gap-7 md:flex-row md:items-end"><h2 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-.06em] sm:text-5xl">You bring the curiosity. Let's find the next step.</h2><PrimaryLink href="/contact">Connect with us</PrimaryLink></div></section>
 </PageWrap>;
}
