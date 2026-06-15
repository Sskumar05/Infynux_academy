import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, Phone, MapPin, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/INfynux-Logo.png"

export function Footer() {
  return (
    <footer className="bg-[#060D1B] text-white/85 mt-24 border-t border-[var(--cyan)]/8">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
             <span >
            <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
          </span>
            <span className="font-display text-lg font-bold text-white">
              INFYNUX <span className="text-[var(--cyan)]">Academy</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/55">
            Future-ready learning paths, hands-on tutorials, and real-world internships
            to launch your tech career.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:bg-[var(--electric)] hover:text-white hover:border-[var(--electric)] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300"
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
              ["About", "/about"],
              ["Roadmaps", "/roadmaps"],
              ["Tutorials", "/tutorials"],
              ["Internships", "/internships"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-white/60 hover:text-[var(--cyan)] transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Domains</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li>Full Stack Web Dev</li>
            <li>Cloud Computing (AWS)</li>
            <li>App Development</li>
            <li>AI & Automation</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-[var(--cyan)]" /> support@infynuxsolutions.in</li>
            <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-[var(--cyan)]" /> +91 7010850923</li>
            <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-[var(--cyan)]" /> Thiruvarur, Tamil Nadu 610001, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/6">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© 2026 INFYNUX Academy. All Rights Reserved.</p>
          <p>Built with passion for future-ready learners.</p>
        </div>
      </div>
    </footer>
  );
}
