import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, CalendarDays, Clock3,
  MapPin, Users, CheckCircle2, Sparkles, Code2
} from "lucide-react";

const events = [
  {
    id:"hack-01", name:"Buildathon 2026", category:"Hackathon",
    date:"15 November 2026", day:"15", month:"NOV", mode:"Online",
    description:"Turn your ideas into working products. Build, collaborate and present your innovation.",
    details:"Buildathon 2026 is a student-focused hackathon experience where participants can transform ideas into practical solutions. Work with a team, explore new technologies and present your work.",
    tags:["Innovation","Teamwork","Problem Solving"],
    color:"#D8BDB2"
  },
  {
    id:"work-02", name:"Frontend Design Sprint", category:"Workshop",
    date:"20 November 2026", day:"20", month:"NOV", mode:"Online",
    description:"Explore modern frontend design, build responsive interfaces and sharpen your UI skills.",
    details:"A hands-on design and development session focused on creating modern, responsive user interfaces. Explore design principles and improve your frontend workflow.",
    tags:["React","UI Design","CSS"],
    color:"#E9DCCF"
  },
  {
    id:"meet-03", name:"Developer Connect", category:"Community",
    date:"28 November 2026", day:"28", month:"NOV", mode:"Hybrid",
    description:"Meet fellow developers, exchange ideas and grow your professional network.",
    details:"Connect with student developers, share your projects, exchange experiences and discover new opportunities within the developer community.",
    tags:["Networking","Community","Collaboration"],
    color:"#D9D2C6"
  },
  {
    id:"hack-04", name:"Code For Change", category:"Hackathon",
    date:"05 December 2026", day:"05", month:"DEC", mode:"Online",
    description:"Create technology-driven solutions for real-world challenges.",
    details:"Explore real-world challenges and develop technology-based solutions. Collaborate with peers and turn your ideas into meaningful projects.",
    tags:["Social Impact","Coding","Innovation"],
    color:"#D8BDB2"
  },
  {
    id:"work-05", name:"Java Development Lab", category:"Workshop",
    date:"12 December 2026", day:"12", month:"DEC", mode:"Offline",
    description:"Strengthen your Java fundamentals through guided practical challenges.",
    details:"Practice Java programming through structured exercises and practical development challenges. Strengthen your fundamentals and coding confidence.",
    tags:["Java","Backend","Programming"],
    color:"#E9DCCF"
  },
  {
    id:"meet-06", name:"Campus Tech Meetup", category:"Community",
    date:"19 December 2026", day:"19", month:"DEC", mode:"Hybrid",
    description:"A space for students to share projects, discuss technology and connect.",
    details:"A community gathering for students interested in technology, development and innovation. Showcase your work and connect with like-minded people.",
    tags:["Students","Technology","Community"],
    color:"#D9D2C6"
  }
];

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(item => item.id === id);
  const [joined,setJoined] = useState(() => JSON.parse(localStorage.getItem("joinedEvents") || "[]").includes(id));
  const [showMessage,setShowMessage] = useState(false);

  if (!event) {
    return <div className="min-h-screen bg-[#F8F3EF] p-10 text-[#493128]">
      <h1 className="font-display text-4xl">Event not found</h1>
      <Link to="/events" className="mt-5 inline-block underline">Back to events</Link>
    </div>;
  }

  const handleJoin = () => {
    const current = JSON.parse(localStorage.getItem("joinedEvents") || "[]");
    const updated = joined ? current.filter(item => item !== id) : [...current,id];
    localStorage.setItem("joinedEvents",JSON.stringify(updated));
    setJoined(!joined);
    setShowMessage(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F3EF] text-[#493128]">
      <header className="flex items-center justify-between border-b border-[#E8DCD3] bg-[#FBF8F5] px-6 py-5 md:px-12">
        <Link to="/" className="font-display text-2xl font-bold">campus<span className="text-[#B78370]">code.</span></Link>
        <Link to="/dashboard" className="rounded-full bg-[#493128] px-5 py-3 text-xs font-bold text-white">My Space ↗</Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
        <button onClick={() => navigate("/events")} className="mb-8 flex items-center gap-2 text-xs text-[#88766E]"><ArrowLeft size={15}/> Back to events</button>

        <motion.section initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="overflow-hidden rounded-[30px] border border-[#E8DCD3] bg-[#FBF8F5]">
          <div className="relative flex min-h-64 items-center justify-between overflow-hidden p-8 md:p-14" style={{backgroundColor:event.color}}>
            <div className="absolute -right-16 -top-28 h-96 w-96 rounded-full border border-[#493128]/10"/>
            <div className="absolute -right-5 -top-20 h-72 w-72 rounded-full border border-[#493128]/10"/>
            <div className="relative z-10 max-w-xl">
              <span className="rounded-full bg-white/40 px-4 py-2 text-[10px] font-bold tracking-[2px]">{event.category.toUpperCase()}</span>
              <h1 className="mt-7 font-display text-4xl leading-tight md:text-6xl">{event.name}</h1>
              <p className="mt-4 text-sm text-[#493128]/70">{event.description}</p>
            </div>
            <div className="relative z-10 mr-4 hidden text-center md:block">
              <p className="font-display text-8xl">{event.day}</p>
              <p className="text-sm font-bold tracking-[5px]">{event.month}</p>
            </div>
          </div>

          <div className="grid gap-8 p-7 md:grid-cols-[1.4fr_.8fr] md:p-12">
            <div>
              <p className="text-[10px] font-bold tracking-[3px] text-[#A16F5C]">ABOUT THIS EXPERIENCE</p>
              <h2 className="mt-3 font-display text-3xl">Make something meaningful.</h2>
              <p className="mt-5 text-sm leading-8 text-[#88766E]">{event.details}</p>

              <h3 className="mt-10 font-display text-2xl">What you'll explore</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {event.tags.map(tag=><div key={tag} className="flex items-center gap-3 rounded-xl bg-[#F2EAE4] p-4 text-sm"><CheckCircle2 size={17} className="text-[#A16F5C]"/>{tag}</div>)}
              </div>

              <div className="mt-10 rounded-2xl bg-[#493128] p-6 text-white">
                <Sparkles className="text-[#D8BDB2]"/>
                <h3 className="mt-3 font-display text-2xl">Ready to take part?</h3>
                <p className="mt-2 text-xs leading-6 text-white/60">Join this opportunity and keep track of your participation from your student dashboard.</p>
                <button onClick={handleJoin} className="mt-6 w-full rounded-full bg-[#F8F3EF] py-4 text-sm font-bold text-[#493128] transition hover:bg-[#D8BDB2]">{joined?"✓ You're registered — Leave event":"Register for this event →"}</button>
                {showMessage && <p className="mt-3 text-center text-xs text-[#D8BDB2]">{joined?"Your participation has been saved!":"You have left this event."}</p>}
              </div>
            </div>

            <aside>
              <div className="rounded-2xl border border-[#E8DCD3] bg-[#F8F3EF] p-6">
                <p className="text-[10px] font-bold tracking-[3px] text-[#A16F5C]">EVENT INFORMATION</p>
                <div className="mt-7 space-y-6">
                  <div className="flex gap-4"><CalendarDays className="shrink-0 text-[#A16F5C]"/><div><p className="text-xs text-[#88766E]">Date</p><p className="mt-1 text-sm font-bold">{event.date}</p></div></div>
                  <div className="flex gap-4"><Clock3 className="shrink-0 text-[#A16F5C]"/><div><p className="text-xs text-[#88766E]">Format</p><p className="mt-1 text-sm font-bold">{event.mode}</p></div></div>
                  <div className="flex gap-4"><MapPin className="shrink-0 text-[#A16F5C]"/><div><p className="text-xs text-[#88766E]">Location</p><p className="mt-1 text-sm font-bold">{event.mode==="Online"?"Online":"To be announced"}</p></div></div>
                  <div className="flex gap-4"><Users className="shrink-0 text-[#A16F5C]"/><div><p className="text-xs text-[#88766E]">For</p><p className="mt-1 text-sm font-bold">College students</p></div></div>
                </div>
              </div>
              <Link to="/events" className="mt-5 flex items-center justify-center gap-2 rounded-full border border-[#493128] py-4 text-xs font-bold hover:bg-[#EDE2D9]">Explore more events <ArrowUpRight size={15}/></Link>
            </aside>
          </div>
        </motion.section>
        <p className="mt-6 text-center text-[10px] text-[#A4938A]">Demo event information for prototype preview. Confirm official event details before launch.</p>
      </main>
    </div>
  );
}
