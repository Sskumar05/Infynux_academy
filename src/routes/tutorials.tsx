import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Play, ChevronRight } from "lucide-react";
import { useState } from "react";

const CATS = ["All", "Web Development", "Cloud (AWS)", "App Development", "AI & Automation", "Digital Marketing"] as const;

const tutorials = [
  { title: "Building React Apps from Scratch", cat: "Web Development", dur: "2h 15m", level: "Beginner" },
  { title: "TypeScript for React Developers", cat: "Web Development", dur: "1h 50m", level: "Intermediate" },
  { title: "Deploying to AWS with Confidence", cat: "Cloud (AWS)", dur: "3h 05m", level: "Intermediate" },
  { title: "Serverless on AWS Lambda", cat: "Cloud (AWS)", dur: "2h 30m", level: "Advanced" },
  { title: "Flutter UI Mastery", cat: "App Development", dur: "2h 40m", level: "Intermediate" },
  { title: "Kotlin Android Essentials", cat: "App Development", dur: "2h 10m", level: "Beginner" },
  { title: "Automating Workflows with AI", cat: "AI & Automation", dur: "1h 50m", level: "Beginner" },
  { title: "Building AI Agents End to End", cat: "AI & Automation", dur: "3h 15m", level: "Advanced" },
  { title: "SEO That Actually Ranks", cat: "Digital Marketing", dur: "2h 20m", level: "Advanced" },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200",
};

export const Route = createFileRoute("/tutorials")({
  head: () => ({
    meta: [
      { title: "Tutorials — INFYNUX Academy" },
      { name: "description", content: "Hands-on tutorials across web, cloud, app, AI and marketing." },
      { property: "og:title", content: "Tutorials — INFYNUX Academy" },
      { property: "og:description", content: "Watch, code along, and build portfolio-ready projects." },
    ],
  }),
  component: TutorialsPage,
});

function TutorialsPage() {
  const [active, setActive] = useState<string>("All");
  const visible = active === "All" ? tutorials : tutorials.filter(t => t.cat === active);

  return (
    <SiteLayout>
      <section className="hero-bg pt-16 pb-10">
        <div className="container-x text-center">
          <SectionHeader eyebrow="Tutorials Library" title="Learn by building, not just watching" description="Browse curated tutorials across every domain we teach." />
        </div>
      </section>
      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={"px-4 py-2 rounded-full text-sm font-semibold border transition-colors " +
                  (active === c
                    ? "bg-[var(--navy)] text-white border-[var(--navy)]"
                    : "bg-white border-border text-foreground/80 hover:border-[var(--gold)]")}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((t, i) => (
              <article key={t.title} data-aos="fade-up" data-aos-delay={i * 50} className="card-premium overflow-hidden">
                <div className="relative aspect-video bg-gradient-to-br from-[var(--navy)] to-[var(--navy)]/80 grid place-items-center">
                  <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_30%,var(--gold),transparent_45%)]" />
                  <div className="relative grid h-14 w-14 place-items-center rounded-full bg-[var(--gold)] text-[var(--navy)] shadow-lg">
                    <Play className="h-6 w-6 fill-[var(--navy)]" />
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white/80">{t.cat}</span>
                  <span className="absolute top-3 right-3 text-[10px] font-semibold text-[var(--gold)]">{t.dur}</span>
                </div>
                <div className="p-6">
                  <span className={"inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold " + levelColor[t.level]}>
                    {t.level}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[var(--navy)] leading-snug">{t.title}</h3>
                  <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)] hover:text-[var(--gold)] transition-colors">
                    Watch Tutorial <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
