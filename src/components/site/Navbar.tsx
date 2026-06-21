import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/INfynux-Logo.png"

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/internships", label: "Internships" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
          : "bg-white"
      )}
    >
      <div className="container-x flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span >
            <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-[var(--navy)]">
            INFYNUX <span className="text-gradient-blue">Academy</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-[var(--electric)] rounded-md transition-colors"
              activeProps={{ className: "text-[var(--electric)] font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#community"
            className="btn-cta inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition"
          >
            Join Community
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-slate-50 text-[var(--navy)]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl">
          <nav className="container-x flex flex-col py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-base font-medium rounded-md text-slate-700 hover:bg-slate-50 hover:text-[var(--electric)]"
                activeProps={{ className: "text-[var(--electric)] bg-slate-50 font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#community"
              onClick={() => setOpen(false)}
              className="btn-cta mt-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
            >
              Join Community
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
