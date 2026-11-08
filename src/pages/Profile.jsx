import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, UserRound, Mail, GraduationCap, Edit3,
  Save, X, Plus, Award, CalendarDays, Sparkles, LogOut
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user,setUser] = useState(null);
  const [editing,setEditing] = useState(false);
  const [skillInput,setSkillInput] = useState("");
  const [form,setForm] = useState({name:"",email:"",college:"",bio:"",skills:[]});

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("campusUser") || "null");
    if(localStorage.getItem("campusLoggedIn")!=="true" || !saved){
      navigate("/login");
      return;
    }
    const profile = {
      name:saved.name || "",
      email:saved.email || "",
      college:saved.college || "",
      bio:saved.bio || "Student passionate about technology, learning and building meaningful projects.",
      skills:saved.skills || ["Java","Python","Web Development"]
    };
    setUser(saved);
    setForm(profile);
  },[navigate]);

  const updateField = (e) => setForm({...form,[e.target.name]:e.target.value});

  const addSkill = () => {
    const skill = skillInput.trim();
    if(skill && !form.skills.includes(skill)){
      setForm({...form,skills:[...form.skills,skill]});
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => setForm({...form,skills:form.skills.filter(s=>s!==skill)});

  const saveProfile = () => {
    const updated = {...user,...form};
    localStorage.setItem("campusUser",JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
  };

  const logout = () => {
    localStorage.removeItem("campusLoggedIn");
    navigate("/");
  };

  if(!user) return null;

  const initials = form.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  const joined = JSON.parse(localStorage.getItem("joinedEvents") || "[]");

  return (
    <div className="min-h-screen bg-[#F8F3EF] text-[#493128]">
      <header className="flex items-center justify-between border-b border-[#E8DCD3] bg-[#FBF8F5] px-6 py-5 md:px-12">
        <Link to="/" className="font-display text-2xl font-bold">campus<span className="text-[#B78370]">code.</span></Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-xs font-bold text-[#88766E]">Dashboard</Link>
          <button onClick={logout} className="flex items-center gap-2 rounded-full border border-[#E8DCD3] px-4 py-2 text-xs font-bold"><LogOut size={14}/> Logout</button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-10 md:py-14">
        <Link to="/dashboard" className="mb-8 inline-flex items-center gap-2 text-xs text-[#88766E]"><ArrowLeft size={15}/> Back to dashboard</Link>

        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}>
          <p className="text-[10px] font-bold tracking-[3px] text-[#A16F5C]">YOUR IDENTITY</p>
          <h1 className="mt-3 font-display text-5xl">My <span className="italic text-[#B78370]">Profile.</span></h1>
          <p className="mt-4 text-sm text-[#88766E]">Your profile tells your story. Keep it updated as you grow.</p>
        </motion.div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[.8fr_1.5fr]">
          <section className="h-fit rounded-3xl bg-[#493128] p-7 text-white">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D8BDB2] font-display text-3xl text-[#493128]">{initials || "ST"}</div>
            <h2 className="mt-6 font-display text-3xl">{form.name}</h2>
            <p className="mt-2 text-xs text-white/60">{form.college || "College not added"}</p>
            <div className="mt-7 space-y-4 border-t border-white/15 pt-6">
              <div className="flex items-center gap-3 text-xs text-white/75"><Mail size={16} className="text-[#D8BDB2]"/>{form.email}</div>
              <div className="flex items-center gap-3 text-xs text-white/75"><GraduationCap size={16} className="text-[#D8BDB2]"/>CampusCode Student</div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-4"><CalendarDays size={18} className="text-[#D8BDB2]"/><p className="mt-3 font-display text-2xl">{joined.length.toString().padStart(2,"0")}</p><p className="mt-1 text-[10px] text-white/60">Events joined</p></div>
              <div className="rounded-xl bg-white/10 p-4"><Award size={18} className="text-[#D8BDB2]"/><p className="mt-3 font-display text-2xl">{form.skills.length.toString().padStart(2,"0")}</p><p className="mt-1 text-[10px] text-white/60">Skills listed</p></div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#E8DCD3] bg-[#FBF8F5] p-6 md:p-9">
            <div className="flex items-center justify-between gap-3">
              <div><p className="text-[10px] font-bold tracking-[3px] text-[#A16F5C]">PROFILE DETAILS</p><h2 className="mt-2 font-display text-2xl">About you</h2></div>
              {!editing && <button onClick={()=>setEditing(true)} className="flex items-center gap-2 rounded-full bg-[#493128] px-4 py-3 text-xs font-bold text-white"><Edit3 size={14}/> Edit profile</button>}
            </div>

            <div className="mt-8 space-y-6">
              <div><label className="mb-2 block text-xs font-bold">Full name</label><input disabled={!editing} name="name" value={form.name} onChange={updateField} className="w-full rounded-xl border border-[#E8DCD3] bg-[#F8F3EF] px-4 py-4 text-sm outline-none focus:border-[#A16F5C] disabled:opacity-70"/></div>
              <div><label className="mb-2 block text-xs font-bold">Email address</label><input disabled name="email" value={form.email} className="w-full rounded-xl border border-[#E8DCD3] bg-[#F8F3EF] px-4 py-4 text-sm opacity-70"/></div>
              <div><label className="mb-2 block text-xs font-bold">College / University</label><input disabled={!editing} name="college" value={form.college} onChange={updateField} placeholder="Enter your college name" className="w-full rounded-xl border border-[#E8DCD3] bg-[#F8F3EF] px-4 py-4 text-sm outline-none focus:border-[#A16F5C] disabled:opacity-70"/></div>
              <div><label className="mb-2 block text-xs font-bold">About me</label><textarea disabled={!editing} name="bio" value={form.bio} onChange={updateField} rows={4} className="w-full resize-none rounded-xl border border-[#E8DCD3] bg-[#F8F3EF] px-4 py-4 text-sm leading-6 outline-none focus:border-[#A16F5C] disabled:opacity-70"/></div>

              <div>
                <label className="mb-3 block text-xs font-bold">Skills & interests</label>
                <div className="flex flex-wrap gap-2">
                  {form.skills.map(skill=><span key={skill} className="flex items-center gap-2 rounded-full bg-[#EDE2D9] px-4 py-2 text-xs">{skill}{editing&&<button onClick={()=>removeSkill(skill)}><X size={13}/></button>}</span>)}
                </div>
                {editing&&<div className="mt-4 flex gap-2"><input value={skillInput} onChange={e=>setSkillInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),addSkill())} placeholder="Add a new skill..." className="min-w-0 flex-1 rounded-xl border border-[#E8DCD3] bg-[#F8F3EF] px-4 py-3 text-sm outline-none"/><button onClick={addSkill} className="rounded-xl bg-[#493128] px-4 text-white"><Plus size={18}/></button></div>}
              </div>
            </div>

            {editing&&<div className="mt-9 flex gap-3 border-t border-[#E8DCD3] pt-6"><button onClick={saveProfile} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#493128] py-4 text-xs font-bold text-white"><Save size={15}/> Save changes</button><button onClick={()=>{setForm({...user,bio:user.bio||"Student passionate about technology, learning and building meaningful projects.",skills:user.skills||["Java","Python","Web Development"]});setEditing(false)}} className="rounded-full border border-[#E8DCD3] px-6 py-4 text-xs font-bold">Cancel</button></div>}
          </section>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#EDE2D9] p-5 text-sm"><Sparkles size={20} className="shrink-0 text-[#A16F5C]"/><p className="text-xs leading-5 text-[#775F53]">Your profile is your personal space. Keep your skills and introduction updated as you learn new things.</p></div>
      </main>
    </div>
  );
}
