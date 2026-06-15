import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useState } from "react";
import { InternshipModal } from "@/components/site/InternshipModal";
import { Code2, Cloud, Smartphone, Brain, Megaphone, Layers, Server, Layout } from "lucide-react";

const DOMAINS = [
  { icon: Layout, title: "Frontend Development", desc: "Build pixel-perfect React UIs with strong UX fundamentals." },
  { icon: Server, title: "Backend Development", desc: "Design APIs, services and databases that scale." },
  { icon: Layers, title: "Full Stack Development", desc: "Ship complete products end-to-end with modern stacks." },
  { icon: Smartphone, title: "Flutter", desc: "Cross-platform mobile apps with a single codebase." },
  { icon: Code2, title: "Android (Kotlin)", desc: "Native Android development with Kotlin best practices." },
  { icon: Cloud, title: "AWS", desc: "Deploy, monitor and scale on Amazon Web Services." },
  { icon: Brain, title: "AI Tools", desc: "Use AI tools to ship faster and smarter." },
  { icon: Brain, title: "Automation Workflows", desc: "Build automations that save real hours every week." },
  { icon: Megaphone, title: "SEO", desc: "Drive organic growth with technical & content SEO." },
  { icon: Megaphone, title: "Social Media Marketing", desc: "Plan, create and scale content across channels." },
];

export const Route = createFileRoute("/internships")({
  head: () => ({
    meta: [
      { title: "Internships — INFYNUX Academy" },
      { name: "description", content: "Apply to real-world internships across web, cloud, app, AI and marketing." },
      { property: "og:title", content: "Internships — INFYNUX Academy" },
      { property: "og:description", content: "Launch your career with mentor-led internship programs." },
    ],
  }),
  component: InternshipsPage,
});

function InternshipsPage() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>();

  const apply = (d?: string) => { setPreset(d); setOpen(true); };

  return (
    <SiteLayout>
      <section className="hero-bg pt-16 pb-12">
        <div className="container-x text-center">
          <SectionHeader eyebrow="Internships" title="Launch your career with real-world experience" description="Hands-on internships across every domain INFYNUX teaches. Mentor-led, project-based, career-focused." />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((d, i) => (
            <div key={d.title} data-aos="zoom-in" data-aos-delay={i * 60} className="card-premium p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 text-[var(--gold)] border border-[var(--gold)]/20">
                <d.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-[var(--navy)]">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              <button
                onClick={() => apply(d.title)}
                className="btn-gold mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </section>

      <InternshipModal open={open} onOpenChange={setOpen} presetDomain={preset} />
    </SiteLayout>
  );
}
