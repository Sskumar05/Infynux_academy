import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Target, Eye, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — INFYNUX Academy" },
      { name: "description", content: "INFYNUX Academy is on a mission to make future-ready tech education accessible to every learner." },
      { property: "og:title", content: "About — INFYNUX Academy" },
      { property: "og:description", content: "Our mission, vision and the team behind INFYNUX Academy." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="hero-bg pt-16 pb-12">
        <div className="container-x text-center">
          <SectionHeader eyebrow="About INFYNUX" title="Future-ready learning for every ambitious mind" description="We are an education technology academy on a mission to bridge the gap between classroom learning and industry reality." />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, title: "Our Mission", text: "Make industry-grade tech education accessible, structured, and outcome-driven." },
            { icon: Eye, title: "Our Vision", text: "A generation of confident creators shipping the future of technology." },
            { icon: Heart, title: "Our Values", text: "Curiosity, craftsmanship, community, and consistency." },
            { icon: Users, title: "Our People", text: "Industry mentors, engineers, and educators who care about your growth." },
          ].map((c, i) => (
            <div key={c.title} data-aos="fade-up" data-aos-delay={i * 80} className="card-premium p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--electric)] to-[var(--cyan)] text-white shadow-md shadow-[var(--electric)]/20">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[var(--alt)]">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
              Built by practitioners, for the next generation of builders
            </h2>
            <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed">
              INFYNUX Academy was founded with one belief: ambitious learners deserve roadmaps,
              mentors and real-world projects — not just videos. Today we help thousands of
              students transform their careers across five high-impact domains.
            </p>
          </div>
          <div data-aos="fade-left" className="grid grid-cols-2 gap-5">
            {[
              ["10,000+", "Active learners"],
              ["50+", "Industry mentors"],
              ["120+", "Projects shipped"],
              ["95%", "Recommend us"],
            ].map(([n, l]) => (
              <div key={l} className="card-premium p-6 text-center">
                <div className="text-3xl font-bold text-gradient-blue">{n}</div>
                <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  ),
});
