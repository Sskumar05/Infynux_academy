import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, Phone, MapPin, Github, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white/85 mt-24">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-soft)] text-[var(--navy)]">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-white">
              INFYNUX <span className="text-[var(--gold)]">Academy</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/65">
            Future-ready learning paths, hands-on tutorials, and real-world internships
            to launch your tech career.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-[var(--gold)] hover:text-[var(--navy)] hover:border-[var(--gold)] transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ["Home", "/"],
              ["Roadmaps", "/roadmaps"],
              ["Tutorials", "/tutorials"],
              ["Internships", "/internships"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-white/70 hover:text-[var(--gold)] transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Domains</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>Full Stack Web Dev</li>
            <li>Cloud Computing (AWS)</li>
            <li>App Development</li>
            <li>AI & Automation</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-[var(--gold)]" /> hello@infynux.academy</li>
            <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-[var(--gold)]" /> +91 98765 43210</li>
            <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-[var(--gold)]" /> Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/55">
          <p>© 2026 INFYNUX Academy. All Rights Reserved.</p>
          <p>Built with passion for future-ready learners.</p>
        </div>
      </div>
    </footer>
  );
}
