import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight, Code2 } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-cocoa/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-cocoa text-cream grid place-items-center">
            <Code2 size={20}/>
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-cocoa">
            campus<span className="font-normal">code.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm text-cocoa/70">
          <a href="#home" className="hover:text-[#B17E70]">Home</a>
          <a href="#events" className="hover:text-[#B17E70]">Explore events</a>
          <a href="#passport" className="hover:text-[#B17E70]">Student passport</a>
          <a href="#about" className="hover:text-[#B17E70]">About</a>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="text-sm text-cocoa">Log in</Link>
          <Link to="/register" className="bg-cocoa text-white px-5 py-3 text-sm hover:bg-[#705044] transition flex items-center gap-2">
            Join CampusCode <ArrowUpRight size={16}/>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-cocoa" aria-label="Toggle menu">
          {open ? <X/> : <Menu/>}
        </button>
      </div>

      {open && (
        <nav className="md:hidden px-6 pb-6 flex flex-col gap-5 bg-cream text-cocoa text-sm">
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          <a href="#events" onClick={() => setOpen(false)}>Explore events</a>
          <a href="#passport" onClick={() => setOpen(false)}>Student passport</a>
          <Link to="/login">Log in</Link>
          <Link to="/register" className="font-bold">Join CampusCode ↗</Link>
        </nav>
      )}
    </header>
  );
}
