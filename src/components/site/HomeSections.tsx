import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Code2, Cloud, Smartphone, Brain, Megaphone,
  ArrowRight, Sparkles, Award, Briefcase, GraduationCap,
  Star, Play, ChevronRight, CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { SectionHeader } from "@/components/site/SectionHeader";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { InternshipModal } from "./InternshipModal";

const domains = [
  { icon: Code2, title: "Full Stack Web Development", desc: "Build modern, scalable web applications with React, Node.js, and databases." },
  { icon: Cloud, title: "Cloud Computing (AWS)", desc: "Master AWS services, deployment, DevOps, and cloud-native architectures." },
  { icon: Smartphone, title: "App Development", desc: "Design and ship cross-platform mobile apps with Flutter and Kotlin." },
  { icon: Brain, title: "AI & Automation", desc: "Leverage AI tools and workflow automation to build smart products." },
  { icon: Megaphone, title: "Digital Marketing", desc: "Grow brands with SEO, content, and performance marketing strategies." },
];

const features = [
  { icon: Award, title: "Industry-Oriented Curriculum", desc: "Curriculum designed with industry experts to match real hiring needs." },
  { icon: Briefcase, title: "Internship Opportunities", desc: "Apply to real-world internships across multiple in-demand domains." },
  { icon: GraduationCap, title: "Career-Focused Learning", desc: "Mentorship, projects, and certifications that move your career forward." },
];

export function HomeSections() {
  const [internshipOpen, setInternshipOpen] = useState(false);
  const [presetDomain, setPresetDomain] = useState<string | undefined>();

  const openInternship = (d?: string) => {
    setPresetDomain(d);
    setInternshipOpen(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="hero-bg relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-12 lg:pt-20 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Future-Ready Tech Academy</span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.07]">
              Build Future-Ready Skills With{" "}
              <span className="text-gradient-blue">INFYNUX Academy</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed">
              Master Web Development, Cloud Computing, App Development, AI &amp; Automation,
              and Digital Marketing through structured learning paths and internships.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/roadmaps"
                className="btn-cta inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Explore Roadmaps <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/internships"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border border-[var(--cyan)]/30 text-[var(--cyan)] hover:bg-[var(--electric)] hover:text-white hover:border-[var(--electric)] transition-all duration-300"
              >
                Apply Internship
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["10k+", "Learners"],
                ["50+", "Mentors"],
                ["95%", "Satisfaction"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-tr from-[var(--electric)]/20 via-transparent to-[var(--cyan)]/10 rounded-[2rem] blur-2xl" />
            <div className="relative rounded-[1.75rem] overflow-hidden border border-[var(--cyan)]/15 bg-[var(--navy-light)] shadow-[var(--shadow-elegant)]">
              <img src={heroImg} alt="Students learning tech at INFYNUX Academy" className="w-full h-auto" width={1280} height={1024} />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 bg-[var(--navy-light)]/90 backdrop-blur-xl border border-[var(--cyan)]/15 rounded-2xl px-4 py-3 shadow-lg">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--electric)]/15 text-[var(--cyan)]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Certified Programs</div>
                <div className="text-xs text-[var(--muted-foreground)]">Industry recognized</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DOMAINS */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeader
            eyebrow="Featured Domains"
            title="Learn the skills shaping tomorrow"
            description="Five focused tracks designed to take you from fundamentals to job-ready mastery."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((d, i) => (
              <div
                key={d.title}
                data-aos="zoom-in"
                data-aos-delay={i * 80}
                className="card-premium p-7 group"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--electric)]/20 to-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/15 group-hover:bg-[var(--electric)] group-hover:text-white group-hover:border-[var(--electric)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300">
                  <d.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{d.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]">{d.desc}</p>
                <Link
                  to="/roadmaps"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cyan)] hover:text-[var(--electric)] transition-colors"
                >
                  Learn More <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 lg:py-24 bg-[var(--alt)]">
        <div className="container-x">
          <SectionHeader
            eyebrow="Why Choose INFYNUX"
            title="An academy built for outcomes, not just lectures"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="card-premium p-8 hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--electric)] to-[var(--cyan)] text-white shadow-md shadow-[var(--electric)]/20">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAPS PREVIEW */}
      <RoadmapsPreview />

      {/* TUTORIALS */}
      <TutorialsPreview />

      {/* INTERNSHIPS CTA */}
      <InternshipsHighlight onApply={openInternship} />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-[var(--alt)]">
        <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div data-aos="fade-right">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
              Everything you need to know before starting
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)]">
              Can't find the answer you're looking for? Reach out via the contact page.
            </p>
          </div>
          <div data-aos="fade-up">
            <Accordion type="single" collapsible className="w-full">
              {[
                ["Is internship free or paid?", "Our flagship internships are free. Premium mentor-led tracks are available at a nominal fee."],
                ["Will I receive a certificate?", "Yes. Every completed program comes with an industry-recognized digital certificate."],
                ["How can I apply?", "Tap any Apply button on the Internships page and submit the short application form."],
                ["Is mentor support available?", "Yes. Live mentor support is available across all premium tracks and on-demand for free tracks."],
                ["What are the eligibility criteria?", "Students, graduates, and early professionals are all welcome. Curiosity is the only prerequisite."],
              ].map(([q, a]) => (
                <AccordionItem key={q} value={q} className="border-b border-[var(--cyan)]/10">
                  <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-[var(--cyan)] hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <InternshipModal open={internshipOpen} onOpenChange={setInternshipOpen} presetDomain={presetDomain} />
    </>
  );
}

// --- Sub sections ---

const roadmaps = [
  { title: "Full Stack Web Development", steps: ["HTML/CSS/JS", "React + TypeScript", "Node & APIs", "Databases & Auth", "Deploy & Scale"] },
  { title: "Cloud Computing (AWS)", steps: ["Cloud Foundations", "EC2 / S3 / IAM", "VPC & Networking", "Serverless", "DevOps & CI/CD"] },
  { title: "App Development", steps: ["Dart & Flutter", "State Management", "Kotlin & Android", "APIs & Storage", "Play Store Launch"] },
  { title: "AI & Automation", steps: ["LLM Basics", "Prompt Engineering", "AI Tools", "Workflow Automation", "AI Agents"] },
  { title: "Digital Marketing", steps: ["SEO Foundations", "Content Strategy", "Social Media", "Ads & Analytics", "Growth Funnels"] },
];

function RoadmapsPreview() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Learning Roadmaps"
          title="Clear paths from beginner to pro"
          description="Structured roadmaps that show exactly what to learn, in what order, and how to practice."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((r, i) => (
            <div key={r.title} data-aos="fade-right" data-aos-delay={i * 80} className="card-premium p-7">
              <div className="flex items-center gap-2 text-[var(--cyan)] font-semibold text-xs tracking-wider uppercase">
                <Star className="h-3.5 w-3.5 fill-[var(--cyan)]" /> Roadmap
              </div>
              <h3 className="mt-3 text-xl font-bold text-white">{r.title}</h3>
              <ol className="mt-5 space-y-2.5">
                {r.steps.map((s, idx) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--electric)] text-[10px] font-bold text-white">{idx + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <Link
                to="/roadmaps"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cyan)] hover:text-[var(--electric)] transition-colors"
              >
                View Full Roadmap <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tutorials = [
  { title: "Building React Apps from Scratch", cat: "Web Development", dur: "2h 15m", level: "Beginner" },
  { title: "Deploying to AWS with Confidence", cat: "Cloud (AWS)", dur: "3h 05m", level: "Intermediate" },
  { title: "Flutter UI Mastery", cat: "App Development", dur: "2h 40m", level: "Intermediate" },
  { title: "Automating Workflows with AI", cat: "AI & Automation", dur: "1h 50m", level: "Beginner" },
  { title: "SEO That Actually Ranks", cat: "Digital Marketing", dur: "2h 20m", level: "Advanced" },
  { title: "REST APIs with Node.js", cat: "Web Development", dur: "2h 00m", level: "Intermediate" },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  Advanced: "bg-rose-500/15 text-rose-400 border-rose-500/25",
};

function TutorialsPreview() {
  return (
    <section className="py-20 lg:py-24 bg-[var(--alt)]">
      <div className="container-x">
        <SectionHeader
          eyebrow="Tutorials"
          title="Hands-on lessons, real projects"
          description="Watch, code along, and build portfolio-ready projects across every domain."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((t, i) => (
            <article key={t.title} data-aos="fade-up" data-aos-delay={i * 60} className="card-premium overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-[var(--navy)] to-[var(--navy-mid)] grid place-items-center">
                <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_30%,var(--electric),transparent_45%)]" />
                <div className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--electric)] to-[var(--cyan)] text-white shadow-lg shadow-[var(--electric)]/30">
                  <Play className="h-6 w-6 fill-white" />
                </div>
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white/70">{t.cat}</span>
                <span className="absolute top-3 right-3 text-[10px] font-semibold text-[var(--cyan)]">{t.dur}</span>
              </div>
              <div className="p-6">
                <span className={"inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold " + levelColor[t.level]}>
                  {t.level}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white leading-snug">{t.title}</h3>
                <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cyan)] hover:text-[var(--electric)] transition-colors">
                  Watch Tutorial <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const internshipDomains = [
  { group: "Web Development", items: ["Frontend Development", "Backend Development", "Full Stack Development"] },
  { group: "App Development", items: ["Flutter", "Android (Kotlin)"] },
  { group: "Cloud Computing", items: ["AWS"] },
  { group: "AI & Automation", items: ["AI Tools", "Automation Workflows"] },
  { group: "Digital Marketing", items: ["SEO", "Social Media Marketing"] },
];

function InternshipsHighlight({ onApply }: { onApply: (d?: string) => void }) {
  return (
    <section id="community" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[var(--electric)]/10 to-[var(--cyan)]/5 backdrop-blur-sm border border-[var(--cyan)]/15 text-white p-10 md:p-14 lg:p-20">
          <div className="absolute inset-0 opacity-40 [background:radial-gradient(900px_400px_at_90%_-10%,rgba(37,99,235,0.35),transparent_60%)]" />
          <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
            <div data-aos="fade-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--cyan)]/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--cyan)]">
                <Briefcase className="h-3.5 w-3.5" /> Internships
              </span>
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Launch Your Career With <span className="text-gradient-blue">Real-World Internships</span>
              </h2>
              <p className="mt-5 text-white/65 leading-relaxed max-w-xl">
                Build production-grade projects under expert mentorship across every domain
                INFYNUX teaches. Apply once, learn for life.
              </p>
              <Button
                onClick={() => onApply()}
                className="mt-8 btn-cta rounded-full px-6 py-6 text-sm font-semibold hover:opacity-95"
              >
                Apply Now <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              {internshipDomains.map((g, i) => (
                <div
                  key={g.group}
                  data-aos="zoom-in"
                  data-aos-delay={i * 80}
                  className="rounded-2xl border border-[var(--cyan)]/10 bg-white/[0.04] backdrop-blur p-5"
                >
                  <div className="text-sm font-bold text-[var(--cyan)] uppercase tracking-wider">{g.group}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <button
                        key={it}
                        onClick={() => onApply(`${g.group} – ${it}`)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 text-white/80 hover:bg-[var(--electric)] hover:text-white hover:border-[var(--electric)] hover:shadow-[0_0_12px_rgba(37,99,235,0.3)] transition-all duration-300"
                      >
                        {it}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { name: "Aarav Sharma", course: "Full Stack Web Development", text: "INFYNUX gave me clarity and confidence. The roadmaps and mentors changed everything for my career." },
  { name: "Priya Verma", course: "AI & Automation", text: "I went from zero to building real AI workflows. The internship was the cherry on top." },
  { name: "Rohan Iyer", course: "Cloud Computing (AWS)", text: "Hands-on labs and structured roadmaps made AWS finally click for me. Highly recommend." },
];

function Testimonials() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container-x">
        <SectionHeader
          eyebrow="Student Stories"
          title="Loved by learners across the country"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <div key={r.name} data-aos="fade-up" data-aos-delay={i * 100} className="card-premium p-7">
              <div className="flex gap-1 text-[var(--cyan)]">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-[var(--cyan)]" />)}
              </div>
              <p className="mt-4 text-white/80 leading-relaxed">"{r.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[var(--electric)] to-[var(--cyan)] text-white font-bold text-sm">
                  {r.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">{r.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
