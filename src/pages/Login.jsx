import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("campusUser") || "null");

    if (!user || user.email !== email || user.password !== password) {
      setError("Account not found or password is incorrect. Please register first.");
      return;
    }

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

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-16">
          <Link to="/" className="flex items-center gap-2 text-muted text-xs mb-10"><ArrowLeft size={15}/> Back to home</Link>
          <p className="text-[10px] tracking-[2px] font-bold text-[#A77C6D]">WELCOME BACK</p>
          <h1 className="font-display text-5xl text-cocoa mt-4">Good to see<br/><i className="text-[#A77C6D]">you again.</i></h1>
          <p className="text-muted text-sm mt-5 mb-9">Your next opportunity is just one step away.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-cocoa mb-2">Email address</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-white border border-[#E5D8CF] px-4 py-4 text-sm outline-none focus:border-[#A77C6D]"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-cocoa mb-2">Password</label>
              <div className="relative">
                <input type={show?"text":"password"} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-white border border-[#E5D8CF] px-4 py-4 pr-12 text-sm outline-none focus:border-[#A77C6D]"/>
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-label="Toggle password visibility">{show?<EyeOff size={18}/>:<Eye size={18}/>}</button>
              </div>
            </div>
            {error && <p className="text-red-700 text-xs bg-red-50 p-3">{error}</p>}
            <button className="w-full bg-cocoa text-white py-4 text-sm font-bold hover:bg-[#705044] transition flex justify-center items-center gap-2">Log in to your account <ArrowUpRight size={16}/></button>
          </form>

          <p className="text-center text-xs text-muted mt-8">New to CampusCode? <Link to="/register" className="font-bold text-cocoa underline">Create an account</Link></p>
        </div>
        <p className="text-[9px] tracking-widest text-muted">© 2026 CAMPUSCODE</p>
      </section>

      <section className="hidden md:flex bg-cocoa text-cream p-14 flex-col justify-between relative overflow-hidden">
        <span className="text-xs tracking-[3px]">CAMPUSCODE / COMMUNITY</span>
        <div className="relative z-10">
          <p className="text-[10px] tracking-[3px] text-rose">LEARN. BUILD. CONNECT.</p>
          <h2 className="font-display text-7xl leading-tight mt-5">Your ideas<br/>deserve a<br/><i className="text-rose">bigger stage.</i></h2>
          <p className="text-rose/80 text-sm mt-7 max-w-sm leading-7">Meet people who build, discover experiences that matter and make your student journey count.</p>
        </div>
        <div className="absolute w-80 h-80 rounded-full border border-rose/20 -right-32 top-1/4"/>
        <div className="absolute w-60 h-60 rounded-full border border-rose/20 -right-20 top-1/3"/>
        <span className="text-[10px] tracking-widest text-rose">MAKE YOUR MARK. ↗</span>
      </section>
    </main>
  );
}
