import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, Search, CalendarDays,
  MapPin, Sparkles, Code2, Users, Filter
} from "lucide-react";

const events = [
  {id:"hack-01",name:"Buildathon 2026",category:"Hackathon",date:"15 November 2026",day:"15",month:"NOV",mode:"Online",description:"Turn your ideas into working products. Build, collaborate and present your innovation.",tags:["Innovation","Teamwork"],color:"#D8BDB2"},
  {id:"work-02",name:"Frontend Design Sprint",category:"Workshop",date:"20 November 2026",day:"20",month:"NOV",mode:"Online",description:"Explore modern frontend design, build responsive interfaces and sharpen your UI skills.",tags:["React","UI Design"],color:"#E9DCCF"},
  {id:"meet-03",name:"Developer Connect",category:"Community",date:"28 November 2026",day:"28",month:"NOV",mode:"Hybrid",description:"Meet fellow developers, exchange ideas and grow your professional network.",tags:["Networking","Community"],color:"#D9D2C6"},
  {id:"hack-04",name:"Code For Change",category:"Hackathon",date:"05 December 2026",day:"05",month:"DEC",mode:"Online",description:"Create technology-driven solutions for real-world challenges.",tags:["Social Impact","Coding"],color:"#D8BDB2"},
  {id:"work-05",name:"Java Development Lab",category:"Workshop",date:"12 December 2026",day:"12",month:"DEC",mode:"Offline",description:"Strengthen your Java fundamentals through guided practical challenges.",tags:["Java","Backend"],color:"#E9DCCF"},
  {id:"meet-06",name:"Campus Tech Meetup",category:"Community",date:"19 December 2026",day:"19",month:"DEC",mode:"Hybrid",description:"A space for students to share projects, discuss technology and connect.",tags:["Students","Technology"],color:"#D9D2C6"}
];

const categories = ["All Events","Hackathon","Workshop","Community"];

export default function Events() {
  const [active,setActive] = useState("All Events");
  const [search,setSearch] = useState("");
  const [joined,setJoined] = useState(JSON.parse(localStorage.getItem("joinedEvents") || "[]"));

  const filtered = useMemo(() => events.filter(event => {
    const matchesCategory = active === "All Events" || event.category === active;
    const matchesSearch = (event.name + event.description + event.tags.join(" ")).toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }),[active,search]);

  const toggleJoin = (id) => {
    const updated = joined.includes(id) ? joined.filter(x=>x!==id) : [...joined,id];
    setJoined(updated);
    localStorage.setItem("joinedEvents",JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F8F3EF] text-[#493128]">
      <header className="flex items-center justify-between border-b border-[#E8DCD3] bg-[#FBF8F5] px-6 py-5 md:px-12">
        <Link to="/" className="font-display text-2xl font-bold">campus<span className="text-[#B78370]">code.</span></Link>
        <div className="flex items-center gap-5 text-sm">
          <Link to="/dashboard" className="hidden text-[#88766E] hover:text-[#493128] sm:block">Dashboard</Link>
          <Link to="/profile" className="hidden text-[#88766E] hover:text-[#493128] sm:block">Profile</Link>
          <Link to="/dashboard" className="rounded-full bg-[#493128] px-5 py-2.5 text-xs font-bold text-white">My Space ↗</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-14">
        <Link to="/dashboard" className="mb-8 inline-flex items-center gap-2 text-xs text-[#88766E] hover:text-[#493128]"><ArrowLeft size={15}/> Back to dashboard</Link>

        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}>
          <p className="text-[10px] font-bold tracking-[3px] text-[#A16F5C]">DISCOVER • PARTICIPATE • GROW</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight md:text-6xl">Find your next <span className="italic text-[#B78370]">opportunity.</span></h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#88766E]">Discover hackathons, workshops and community experiences designed to help you learn by doing.</p>
        </motion.div>

        <div className="mt-10 grid gap-4 rounded-3xl bg-[#493128] p-6 text-white md:grid-cols-3 md:p-8">
          <div><CalendarDays className="mb-3 text-[#D8BDB2]"/><p className="font-display text-3xl">06</p><p className="mt-1 text-xs text-white/60">Featured opportunities</p></div>
          <div><Users className="mb-3 text-[#D8BDB2]"/><p className="font-display text-3xl">03</p><p className="mt-1 text-xs text-white/60">Event categories</p></div>
          <div><Sparkles className="mb-3 text-[#D8BDB2]"/><p className="font-display text-3xl">{joined.length.toString().padStart(2,"0")}</p><p className="mt-1 text-xs text-white/60">Events you've joined</p></div>
        </div>

        <section className="mt-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div><p className="text-[10px] font-bold tracking-[3px] text-[#A4938A]">THE EVENT BOARD</p><h2 className="mt-1 font-display text-3xl">Explore experiences</h2></div>
            <div className="flex items-center gap-3 rounded-full border border-[#E2D4CA] bg-[#FBF8F5] px-4 py-3 md:w-72">
              <Search size={17} className="text-[#A4938A]"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search events..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#A4938A]"/>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {categories.map(category=><button key={category} onClick={()=>setActive(category)} className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${active===category?"bg-[#493128] text-white":"border border-[#E2D4CA] bg-[#FBF8F5] text-[#88766E] hover:border-[#493128]"}`}>{category}</button>)}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((event,i)=>(
              <motion.article key={event.id} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*.05}} whileHover={{y:-5}} className="overflow-hidden rounded-3xl border border-[#E8DCD3] bg-[#FBF8F5]">
                <div className="relative flex h-40 items-center justify-between overflow-hidden p-6" style={{backgroundColor:event.color}}>
                  <div className="absolute -right-8 -top-16 h-52 w-52 rounded-full border border-[#493128]/10"/>
                  <div className="absolute -right-2 -top-10 h-36 w-36 rounded-full border border-[#493128]/10"/>
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold tracking-[3px] text-[#493128]/60">{event.category.toUpperCase()}</p>
                    <p className="mt-3 font-display text-5xl">{event.day}</p>
                    <p className="text-xs font-bold tracking-[3px]">{event.month}</p>
                  </div>
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/40">
                    {event.category==="Hackathon"?<Code2 size={30}/>:event.category==="Workshop"?<Sparkles size={30}/>:<Users size={30}/>}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2"><span className="text-[10px] text-[#88766E]">{event.date}</span><span className="rounded-full bg-[#EDE2D9] px-3 py-1 text-[10px]">{event.mode}</span></div>
                  <h3 className="mt-4 font-display text-2xl">{event.name}</h3>
                  <p className="mt-3 min-h-14 text-xs leading-6 text-[#88766E]">{event.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{event.tags.map(tag=><span key={tag} className="rounded-full border border-[#E8DCD3] px-3 py-1.5 text-[10px] text-[#88766E]">{tag}</span>)}</div>
                  <div className="mt-6 flex gap-2">
                    <Link to={`/events/${event.id}`} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#493128] py-3 text-xs font-bold transition hover:bg-[#EDE2D9]">Details <ArrowUpRight size={14}/></Link>
                    <button onClick={()=>toggleJoin(event.id)} className="flex-1 rounded-full bg-[#493128] py-3 text-xs font-bold text-white transition hover:bg-[#775747]">{joined.includes(event.id)?"✓ Joined":"Join event"}</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          {filtered.length===0 && <div className="py-20 text-center"><Filter size={30} className="mx-auto text-[#B78370]"/><h3 className="mt-4 font-display text-2xl">No events found</h3><p className="mt-2 text-sm text-[#88766E]">Try another search or category.</p></div>}
        </section>
        <p className="mt-10 text-center text-[10px] text-[#A4938A]">Demo event data for the hackathon prototype. Replace with verified official listings before launch.</p>
      </main>
    </div>
  );
}
