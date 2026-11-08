import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, Trophy, Users, Code2, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const events = [
  { category: "HACKATHON", date: "15 NOV 2026", title: "Build Beyond Limits", description: "Turn bold ideas into real-world solutions.", symbol: "✳", color: "bg-[#E8D4CC]" },
  { category: "WORKSHOP", date: "20 NOV 2026", title: "The Art of Building", description: "Learn, experiment and create together.", symbol: "⌘", color: "bg-[#EDE2D9]" },
  { category: "COMPETITION", date: "28 NOV 2026", title: "Code. Compete. Conquer.", description: "Challenge yourself and show what you can do.", symbol: "✦", color: "bg-cocoa text-cream" },
];

const rise = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Landing() {
  return (
    <>
      <Navbar/>

      <main id="home">
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={rise}>
            <div className="flex items-center gap-3 text-[10px] tracking-[2px] font-bold text-[#98766A]">
              <span className="w-7 h-px bg-[#B78C7D]"/> THE STUDENT COMMUNITY FOR DOERS
            </div>

            <h1 className="font-display text-[clamp(3.5rem,7vw,5.8rem)] leading-[1.02] tracking-tight text-cocoa mt-7">
              Don't just learn.<br/>
              <i className="font-medium text-[#A77C6D]">Make your mark.</i>
            </h1>

            <p className="text-muted max-w-lg leading-8 mt-7 text-sm md:text-base">
              A space for curious minds, ambitious builders and future changemakers.
              Discover opportunities, meet your people and build something that matters.
            </p>

            <div className="flex flex-wrap gap-5 items-center mt-9">
              <a href="#events" className="bg-cocoa text-white px-6 py-4 text-sm font-semibold hover:bg-[#705044] transition flex items-center gap-3">
                Explore opportunities <ArrowUpRight size={17}/>
              </a>
              <a href="#about" className="text-cocoa text-sm font-semibold flex items-center gap-2 hover:text-[#A77C6D]">
                Discover CampusCode <ArrowRight size={16}/>
              </a>
            </div>

            <div className="flex items-center gap-4 mt-12">
              <div className="flex -space-x-2">
                {["R","A","S","+"].map((v,i)=><span key={i} className={`w-8 h-8 rounded-full border-2 border-cream grid place-items-center text-xs font-bold ${i===3?"bg-cocoa text-white":"bg-rose text-cocoa"}`}>{v}</span>)}
              </div>
              <p className="text-xs text-muted leading-5"><b className="text-cocoa">Built for students.</b><br/>Driven by possibilities.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity:0,scale:.94,rotate:2}}
            animate={{opacity:1,scale:1,rotate:0}}
            transition={{duration:.8}}
            className="relative min-h-[420px] md:min-h-[490px] overflow-hidden bg-[#E8D9CF] p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between text-[9px] tracking-[2px] font-bold text-cocoa/70 relative z-10">
              <span>VOL. 01 / STUDENT EDITION</span><span>EST. FOR THE FUTURE</span>
            </div>
            <div className="absolute w-80 h-80 rounded-full bg-[#D4B4A5] -right-20 top-16"/>
            <div className="absolute w-64 h-64 rounded-full bg-[#B58E7E] -left-16 -bottom-36"/>
            <div className="relative z-10 font-display font-bold text-cocoa text-[clamp(4.5rem,8vw,7rem)] leading-[.85] tracking-[-5px] -rotate-6">
              MAKE<br/>IT<br/><i className="text-cream font-medium">HAPPEN.</i>
            </div>
            <div className="absolute right-8 bottom-24 w-28 h-28 rounded-full bg-cocoa text-cream flex flex-col items-center justify-center rotate-12 text-xs tracking-widest">
              IDEAS<br/>INTO<br/><b className="text-[#E6C9B8]">IMPACT ↗</b>
            </div>
            <div className="relative z-10 flex justify-between text-[9px] tracking-[2px] font-bold text-cocoa/70">
              <span>LEARN / BUILD / CONNECT</span><span>001 — CC</span>
            </div>
          </motion.div>
        </section>

        <section className="bg-[#EEE4DC] border-y border-cocoa/10 px-6 md:px-12 py-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-7">
            {[
              [Users,"ONE COMMUNITY","Many possibilities"],
              [CalendarDays,"LIVE OPPORTUNITIES","Events worth showing up for"],
              [Trophy,"REAL ACHIEVEMENTS","Your growth, recognised"]
            ].map(([Icon,title,sub])=>(
              <div key={title} className="flex items-center gap-4">
                <Icon className="text-[#98766A]" size={22}/>
                <div><b className="block text-[10px] tracking-widest text-cocoa">{title}</b><span className="text-xs text-muted">{sub}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section id="events" className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={rise} className="flex flex-wrap justify-between items-end gap-5 mb-10">
            <div>
              <div className="text-[10px] tracking-[2px] font-bold text-[#98766A]">— WHAT'S HAPPENING</div>
              <h2 className="font-display text-5xl md:text-6xl text-cocoa mt-4">Find your next <i className="text-[#A77C6D]">thing.</i></h2>
            </div>
            <Link to="/events" className="text-sm font-bold flex items-center gap-2 hover:text-[#A77C6D]">View all events <ArrowUpRight size={16}/></Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {events.map((event,i)=>(
              <motion.article key={event.title} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.12}} whileHover={{y:-7}} className={`${event.color} min-h-[320px] p-6 flex flex-col justify-between`}>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] tracking-[2px] font-bold">{event.category}</span>
                  <span className="w-8 h-8 rounded-full border border-current grid place-items-center"><ArrowUpRight size={16}/></span>
                </div>
                <div className="text-5xl opacity-60 font-display">{event.symbol}</div>
                <div>
                  <span className="text-[9px] tracking-widest font-bold opacity-70">{event.date}</span>
                  <h3 className="font-display text-3xl mt-2">{event.title}</h3>
                  <p className="text-xs opacity-75 leading-6 mt-2">{event.description}</p>
                </div>
                <Link to="/events" className="border-t border-current/20 pt-4 mt-5 text-xs font-bold flex items-center gap-2">Explore event <ArrowRight size={15}/></Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="passport" className="bg-[#F0E7E0] py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[10px] tracking-[2px] font-bold text-[#98766A]">— YOUR GROWTH, YOUR STORY</div>
              <h2 className="font-display text-5xl md:text-6xl text-cocoa leading-tight mt-5">Every step counts.<br/><i className="text-[#A77C6D]">Make it visible.</i></h2>
              <p className="text-muted text-sm leading-8 max-w-md mt-6">Your CampusCode Passport brings your student journey together. Track events, skills and milestones—all in one place.</p>
              <Link to="/register" className="inline-flex items-center gap-3 bg-cocoa text-white px-6 py-4 text-sm font-bold mt-7 hover:bg-[#705044] transition">Create your passport <ArrowUpRight size={17}/></Link>
            </div>

            <motion.div initial={{opacity:0,rotate:5,x:25}} whileInView={{opacity:1,rotate:0,x:0}} viewport={{once:true}} transition={{duration:.7}} className="bg-cocoa text-cream p-7 md:p-9 shadow-[16px_16px_0_#D8BDB2]">
              <div className="flex justify-between items-center text-sm font-bold tracking-widest"><span className="flex items-center gap-2"><Code2 size={18}/> CAMPUSCODE</span><span className="text-[9px] text-rose">CC / 2026</span></div>
              <p className="text-[9px] tracking-[3px] text-rose mt-10">STUDENT PROGRESS PASSPORT</p>
              <h3 className="font-display text-4xl mt-2">YOUR NAME</h3>
              <p className="text-[9px] tracking-widest text-rose mt-2">FUTURE BUILDER</p>
              <div className="flex justify-between text-xs tracking-widest mt-9"><span>YOUR JOURNEY</span><b className="text-rose">68%</b></div>
              <div className="h-1 bg-white/20 mt-3"><div className="h-full w-[68%] bg-rose"/></div>
              <div className="grid grid-cols-3 gap-3 mt-9">
                {[[Trophy,"04","Achievements"],[CalendarDays,"08","Events joined"],[Layers3,"06","Skills explored"]].map(([Icon,num,label])=><div key={label}><Icon size={18} className="text-rose"/><b className="font-display text-2xl block mt-2">{num}</b><span className="text-[9px] text-rose">{label}</span></div>)}
              </div>
              <div className="border-t border-white/20 mt-8 pt-4 flex justify-between text-[9px] tracking-widest text-rose"><span>LEARN. BUILD. BELONG.</span><span>✳</span></div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="bg-cocoa text-cream py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
            <div className="text-[10px] tracking-[2px] text-rose font-bold">— MORE THAN A PLATFORM</div>
            <h2 className="font-display text-5xl md:text-7xl leading-tight mt-6">Big things happen<br/>when <i className="text-rose">students connect.</i></h2>
            <p className="text-rose/90 text-sm leading-7 mt-6">Find opportunities. Share ideas. Celebrate progress.<br/>Your next chapter starts with one step.</p>
            <Link to="/register" className="inline-flex items-center gap-3 bg-cream text-cocoa px-6 py-4 text-sm font-bold mt-8 hover:bg-rose transition">Become part of it <ArrowUpRight size={17}/></Link>
            <span className="absolute right-8 top-0 text-[180px] font-display font-bold text-white/5 pointer-events-none">CC.</span>
          </div>
        </section>
      </main>

      <footer className="bg-cream px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-5 justify-between items-center">
          <Link to="/" className="text-xl font-extrabold text-cocoa">campus<span className="font-normal">code.</span></Link>
          <p className="text-xs text-muted">Made for the ones who make things happen.</p>
          <span className="text-[9px] tracking-widest text-muted">© 2026 CAMPUSCODE</span>
        </div>
      </footer>
    </>
  );
}
