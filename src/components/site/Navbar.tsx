import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/internships", label: "Internships" },
  { to: "/about", label: "About" },
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
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-soft)] text-[var(--navy)] shadow-md">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-[var(--navy)]">
            INFYNUX <span className="text-gradient-gold">Academy</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3.5 py-2 text-sm font-medium text-foreground/80 hover:text-[var(--navy)] rounded-md transition-colors"
              activeProps={{ className: "text-[var(--navy)] font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#community"
            className="btn-gold inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition"
          >
            Join Community
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-border bg-background"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="container-x flex flex-col py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-base font-medium rounded-md hover:bg-muted"
                activeProps={{ className: "text-[var(--navy)] bg-muted font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#community"
              onClick={() => setOpen(false)}
              className="btn-gold mt-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
            >
              Join Community
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
