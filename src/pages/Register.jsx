import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";

export default function Register() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const user = { name, email, college, password };
    localStorage.setItem("campusUser", JSON.stringify(user));
    localStorage.setItem("campusLoggedIn", "true");
    navigate("/dashboard");
  }

  return (
    <main className="min-h-screen bg-cream grid md:grid-cols-2">
      <section className="p-7 md:p-12 flex flex-col">
        <Link to="/" className="flex items-center gap-3 text-cocoa font-extrabold text-xl">
          <span className="w-9 h-9 rounded-full bg-cocoa text-cream grid place-items-center"><Code2 size={20}/></span>
          campus<span className="font-normal -ml-3">code.</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-12">
          <Link to="/" className="flex items-center gap-2 text-muted text-xs mb-8"><ArrowLeft size={15}/> Back to home</Link>
          <p className="text-[10px] tracking-[2px] font-bold text-[#A77C6D]">YOUR JOURNEY STARTS HERE</p>
          <h1 className="font-display text-5xl text-cocoa mt-4">Make room<br/>for <i className="text-[#A77C6D]">possibility.</i></h1>
          <p className="text-muted text-sm mt-4 mb-7">Create your student account and find your community.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-cocoa mb-2">Full name</label>
              <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" className="w-full bg-white border border-[#E5D8CF] px-4 py-3.5 text-sm outline-none focus:border-[#A77C6D]"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-cocoa mb-2">Email address</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-white border border-[#E5D8CF] px-4 py-3.5 text-sm outline-none focus:border-[#A77C6D]"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-cocoa mb-2">College / University</label>
              <input required value={college} onChange={e=>setCollege(e.target.value)} placeholder="Your institution" className="w-full bg-white border border-[#E5D8CF] px-4 py-3.5 text-sm outline-none focus:border-[#A77C6D]"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-cocoa mb-2">Create password</label>
              <div className="relative">
                <input type={show?"text":"password"} required minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" className="w-full bg-white border border-[#E5D8CF] px-4 py-3.5 pr-12 text-sm outline-none focus:border-[#A77C6D]"/>
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-label="Toggle password visibility">{show?<EyeOff size={18}/>:<Eye size={18}/>}</button>
              </div>
            </div>
            {error && <p className="text-red-700 text-xs bg-red-50 p-3">{error}</p>}
            <button className="w-full bg-cocoa text-white py-4 text-sm font-bold hover:bg-[#705044] transition flex justify-center items-center gap-2">Create my account <ArrowUpRight size={16}/></button>
          </form>
          <p className="text-center text-xs text-muted mt-6">Already a member? <Link to="/login" className="font-bold text-cocoa underline">Log in</Link></p>
        </div>
        <p className="text-[9px] tracking-widest text-muted">© 2026 CAMPUSCODE</p>
      </section>

      <section className="hidden md:flex bg-[#E8D9CF] p-14 flex-col justify-between relative overflow-hidden">
        <span className="text-xs tracking-[3px] text-cocoa">CAMPUSCODE / YOUR NEXT CHAPTER</span>
        <div className="relative z-10">
          <p className="text-[10px] tracking-[3px] text-[#98766A]">A COMMUNITY OF CREATORS</p>
          <h2 className="font-display text-7xl leading-tight text-cocoa mt-5">Curiosity<br/>looks good<br/><i className="text-[#A77C6D]">on you.</i></h2>
          <p className="text-cocoa/70 text-sm mt-7 max-w-sm leading-7">Every connection, every idea and every experience can lead somewhere unexpected.</p>
        </div>
        <div className="absolute w-80 h-80 rounded-full bg-[#D4B4A5] -right-36 top-1/4"/>
        <span className="text-[10px] tracking-widest text-cocoa">START SOMETHING. ↗</span>
      </section>
    </main>
  );
}
