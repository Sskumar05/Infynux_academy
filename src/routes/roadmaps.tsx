import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Code2, Cloud, Smartphone, Brain, Megaphone, CheckCircle2 } from "lucide-react";

const roadmaps = [
  { icon: Code2, title: "Full Stack Web Development",
    steps: ["HTML, CSS, Modern JavaScript", "TypeScript & React fundamentals", "Component patterns & state management", "Node.js, Express & REST APIs", "Databases: SQL + Postgres", "Auth, security, testing", "Deployment & DevOps basics"] },
  { icon: Cloud, title: "Cloud Computing (AWS)",
    steps: ["Cloud fundamentals", "EC2, S3, IAM essentials", "VPC, networking & security", "Serverless: Lambda + API Gateway", "Containers & ECS / EKS", "CI/CD with CodePipeline", "Well-architected projects"] },
  { icon: Smartphone, title: "App Development",
    steps: ["Dart & Flutter basics", "UI & state management", "Kotlin & Android fundamentals", "Native APIs & storage", "REST + Firebase integrations", "Play Store launch"] },
  { icon: Brain, title: "AI & Automation",
    steps: ["LLM fundamentals", "Prompt engineering", "AI tools for productivity", "Workflow automation (n8n, Make)", "Building AI agents", "Real-world automation projects"] },
  { icon: Megaphone, title: "Digital Marketing",
    steps: ["SEO foundations", "Content strategy", "Social media marketing", "Paid ads & analytics", "Email & automation", "Growth funnels"] },
];

export const Route = createFileRoute("/roadmaps")({
  head: () => ({
    meta: [
      { title: "Learning Roadmaps — INFYNUX Academy" },
      { name: "description", content: "Step-by-step roadmaps for Web Dev, Cloud, App Dev, AI and Digital Marketing." },
      { property: "og:title", content: "Learning Roadmaps — INFYNUX Academy" },
      { property: "og:description", content: "Clear, structured paths from beginner to job-ready professional." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="hero-bg pt-16 pb-12">
        <div className="container-x text-center">
          <SectionHeader eyebrow="Learning Roadmaps" title="Pick your path. Master it end to end." description="Roadmaps designed by industry experts. Each step is curated, actionable, and project-driven." />
        </div>
      </section>
      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          {roadmaps.map((r, i) => (
            <div key={r.title} data-aos="fade-up" data-aos-delay={i * 80} className="card-premium p-8">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--navy)] text-[var(--gold)]">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--navy)]">{r.title}</h3>
              </div>
              <ol className="mt-6 space-y-3">
                {r.steps.map((s, idx) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-foreground/85">
                    <CheckCircle2 className="h-5 w-5 text-[var(--gold)] mt-0.5 shrink-0" />
                    <span><span className="font-semibold text-[var(--navy)] mr-1">{idx + 1}.</span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  ),
});
