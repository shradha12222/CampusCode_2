import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, CalendarDays, Award, UserRound, LogOut,
  ArrowUpRight, Clock3, CheckCircle2, Sparkles, Code2,
  BriefcaseBusiness, BookOpen, Menu, X, Bell, TrendingUp
} from "lucide-react";

const activities = [
  { title: "Profile created", detail: "Your CampusCode journey started", date: "Today", icon: UserRound },
  { title: "First learning milestone", detail: "You are ready to explore opportunities", date: "Recently", icon: Award },
  { title: "Joined the community", detail: "Welcome to CampusCode", date: "Recently", icon: Sparkles },
];

const upcomingEvents = [
  { id: "hack-01", name: "Buildathon 2026", type: "Hackathon", date: "15 NOV", mode: "Online" },
  { id: "work-02", name: "Frontend Design Sprint", type: "Workshop", date: "20 NOV", mode: "Online" },
  { id: "meet-03", name: "Developer Connect", type: "Community", date: "28 NOV", mode: "Hybrid" },
];

const skills = ["Problem Solving", "Web Development", "Java", "Python", "UI/UX", "Teamwork"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [joined, setJoined] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("campusLoggedIn");
    const savedUser = JSON.parse(localStorage.getItem("campusUser") || "null");

    if (loggedIn !== "true" || !savedUser) {
      navigate("/login");
      return;
    }

    setUser(savedUser);
    setJoined(JSON.parse(localStorage.getItem("joinedEvents") || "[]"));
  }, [navigate]);

  const joinEvent = (id) => {
    const updated = joined.includes(id)
      ? joined.filter((item) => item !== id)
      : [...joined, id];

    setJoined(updated);
    localStorage.setItem("joinedEvents", JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem("campusLoggedIn");
    navigate("/");
  };

  if (!user) return null;

  const firstName = user.name?.split(" ")[0] || "Student";
  const initials = user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "ST";

  return (
    <div className="min-h-screen bg-[#F8F3EF] text-[#493128] font-body">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-[#E8DCD3] bg-[#FBF8F5] px-6 py-8">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight">
            campus<span className="text-[#B78370]">code.</span>
          </Link>
          <p className="mt-2 text-[10px] tracking-[3px] text-[#88766E]">STUDENT SPACE</p>

          <div className="mt-12 space-y-2">
            <p className="mb-4 text-[10px] font-bold tracking-[2px] text-[#A4938A]">MENU</p>
            <div className="flex items-center gap-3 rounded-xl bg-[#493128] px-4 py-3 text-sm text-white">
              <LayoutDashboard size={18} /> Dashboard
            </div>
            <Link to="/events" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#88766E] transition hover:bg-[#F0E6DF] hover:text-[#493128]">
              <CalendarDays size={18} /> Explore Events
            </Link>
            <Link to="/profile" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#88766E] transition hover:bg-[#F0E6DF] hover:text-[#493128]">
              <UserRound size={18} /> My Profile
            </Link>
          </div>

          <div className="mt-auto rounded-2xl bg-[#EDE2D9] p-5">
            <Sparkles size={20} className="mb-3 text-[#A16F5C]" />
            <p className="font-display text-lg">Keep growing.</p>
            <p className="mt-1 text-xs leading-5 text-[#88766E]">Every small step builds your future.</p>
            <Link to="/events" className="mt-4 inline-flex items-center gap-2 text-xs font-bold">Explore now <ArrowUpRight size={14}/></Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[#E8DCD3] bg-[#FBF8F5] px-5 py-5 md:px-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
                {menuOpen ? <X size={22}/> : <Menu size={22}/>}
              </button>
              <div>
                <p className="text-xs text-[#88766E]">Student workspace</p>
                <h2 className="font-display text-xl">Dashboard</h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="rounded-full border border-[#E8DCD3] p-2 text-[#88766E]"><Bell size={17}/></button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8BDB2] text-sm font-bold">{initials}</div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="text-[11px] text-[#88766E]">Student</p>
                </div>
              </div>
              <button onClick={logout} title="Logout" className="rounded-full p-2 text-[#88766E] hover:bg-[#EDE2D9]"><LogOut size={18}/></button>
            </div>
          </header>

          {menuOpen && (
            <div className="space-y-3 border-b border-[#E8DCD3] bg-[#FBF8F5] px-6 py-4 lg:hidden">
              <Link onClick={() => setMenuOpen(false)} to="/events" className="block text-sm">Explore Events</Link>
              <Link onClick={() => setMenuOpen(false)} to="/profile" className="block text-sm">My Profile</Link>
            </div>
          )}

          <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-10">
            <motion.section initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="relative overflow-hidden rounded-[28px] bg-[#493128] p-7 text-white md:p-10">
              <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border border-white/10"/>
              <div className="pointer-events-none absolute -right-2 -top-10 h-52 w-52 rounded-full border border-white/10"/>
              <div className="relative z-10 max-w-xl">
                <p className="text-xs tracking-[3px] text-[#D8BDB2]">SUNDAY, 08 NOVEMBER 2026</p>
                <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">Good to see you,<br/><span className="italic text-[#D8BDB2]">{firstName}.</span></h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/65">Your next opportunity starts with what you do today. Keep learning, building and making your mark.</p>
                <Link to="/events" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#F8F3EF] px-6 py-3 text-sm font-bold text-[#493128] transition hover:bg-[#D8BDB2]">Explore opportunities <ArrowUpRight size={16}/></Link>
              </div>
              <div className="absolute bottom-0 right-8 hidden h-56 w-56 items-center justify-center rounded-t-full border border-[#D8BDB2]/25 bg-[#D8BDB2]/10 md:flex">
                <div className="text-center">
                  <Sparkles size={36} className="mx-auto text-[#D8BDB2]"/>
                  <p className="mt-3 font-display text-2xl italic">Your journey.</p>
                  <p className="text-[10px] tracking-[3px] text-[#D8BDB2]">YOUR GROWTH</p>
                </div>
              </div>
            </motion.section>

            <section className="mt-9">
              <div className="mb-5 flex items-end justify-between">
                <div><p className="text-[10px] font-bold tracking-[3px] text-[#A4938A]">YOUR OVERVIEW</p><h2 className="mt-1 font-display text-2xl">A little progress, every day.</h2></div>
                <TrendingUp className="text-[#B78370]"/>
              </div>
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {[
                  {label:"Events joined",value:String(joined.length).padStart(2,"0"),icon:CalendarDays},
                  {label:"Skills to explore",value:"06",icon:Code2},
                  {label:"Achievements",value:"02",icon:Award},
                  {label:"Learning streak",value:"03 days",icon:TrendingUp},
                ].map((item,i)=>(
                  <motion.div key={item.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*.08}} className="rounded-2xl border border-[#E8DCD3] bg-[#FBF8F5] p-5">
                    <div className="flex items-center justify-between"><span className="text-xs text-[#88766E]">{item.label}</span><item.icon size={18} className="text-[#B78370]"/></div>
                    <p className="mt-5 font-display text-3xl">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="mt-10 grid gap-7 xl:grid-cols-[1.35fr_.85fr]">
              <section>
                <div className="mb-5 flex items-end justify-between">
                  <div><p className="text-[10px] font-bold tracking-[3px] text-[#A4938A]">YOUR PASSPORT</p><h2 className="mt-1 font-display text-2xl">Progress Passport</h2></div>
                  <Link to="/profile" className="text-xs font-bold text-[#A16F5C]">View profile ↗</Link>
                </div>
                <div className="rounded-3xl border border-[#E8DCD3] bg-[#FBF8F5] p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div><p className="text-xs text-[#88766E]">YOUR LEARNING JOURNEY</p><h3 className="mt-1 font-display text-2xl">{user.name}</h3><p className="mt-1 text-xs text-[#88766E]">{user.college || "CampusCode Student"}</p></div>
                    <div className="rounded-full bg-[#EDE2D9] p-4"><Award size={27} className="text-[#A16F5C]"/></div>
                  </div>
                  <div className="mt-8 flex items-end justify-between"><div><p className="text-sm font-bold">Profile progress</p><p className="mt-1 text-xs text-[#88766E]">Your starting point</p></div><span className="font-display text-3xl">68%</span></div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EDE2D9]"><div className="h-full w-[68%] rounded-full bg-[#A16F5C]"/></div>
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {skills.map((skill,i)=><div key={skill} className="flex items-center gap-2 rounded-xl bg-[#F2EAE4] px-3 py-3 text-xs"><CheckCircle2 size={15} className={i<3?"text-[#A16F5C]":"text-[#B9A9A0"}/>{skill}</div>)}
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-5"><p className="text-[10px] font-bold tracking-[3px] text-[#A4938A]">YOUR JOURNEY</p><h2 className="mt-1 font-display text-2xl">Recent activity</h2></div>
                <div className="rounded-3xl border border-[#E8DCD3] bg-[#FBF8F5] p-6">
                  {activities.map((activity,i)=>(
                    <div key={activity.title} className="relative flex gap-4 pb-7 last:pb-0">
                      {i!==activities.length-1 && <div className="absolute left-[17px] top-10 h-full w-px bg-[#E8DCD3]"/>}
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDE2D9]"><activity.icon size={16} className="text-[#A16F5C]"/></div>
                      <div><p className="text-sm font-bold">{activity.title}</p><p className="mt-1 text-xs leading-5 text-[#88766E]">{activity.detail}</p><p className="mt-2 text-[10px] text-[#A4938A]">{activity.date}</p></div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="mt-10">
              <div className="mb-5 flex items-end justify-between">
                <div><p className="text-[10px] font-bold tracking-[3px] text-[#A4938A]">DON'T MISS OUT</p><h2 className="mt-1 font-display text-2xl">Upcoming opportunities</h2></div>
                <Link to="/events" className="text-xs font-bold text-[#A16F5C]">All events ↗</Link>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {upcomingEvents.map((event,i)=>(
                  <motion.div key={event.id} whileHover={{y:-4}} className="rounded-2xl border border-[#E8DCD3] bg-[#FBF8F5] p-5">
                    <div className="flex items-center justify-between"><span className="rounded-full bg-[#EDE2D9] px-3 py-1 text-[10px] font-bold">{event.type}</span><span className="text-xs font-bold text-[#A16F5C]">{event.date}</span></div>
                    <h3 className="mt-5 font-display text-xl">{event.name}</h3>
                    <p className="mt-2 flex items-center gap-2 text-xs text-[#88766E]"><Clock3 size={14}/>{event.mode}</p>
                    <button onClick={()=>joinEvent(event.id)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#493128] py-3 text-xs font-bold transition hover:bg-[#493128] hover:text-white">
                      {joined.includes(event.id)?"✓ Joined":"Join event"} <ArrowUpRight size={14}/>
                    </button>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-[#A4938A]">Demo events for interface preview. Replace with official event data before launch.</p>
            </section>

            <footer className="mt-14 border-t border-[#E8DCD3] py-7 text-center text-xs text-[#A4938A]">Made for students who love to build. <span className="font-display italic text-[#493128]">CampusCode.</span></footer>
          </div>
        </main>
      </div>
    </div>
  );
}
