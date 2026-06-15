import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HomeSections } from "@/components/site/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INFYNUX Academy — Build Future-Ready Skills" },
      { name: "description", content: "Master Web Dev, Cloud, App Dev, AI & Digital Marketing with structured roadmaps, tutorials and real-world internships." },
      { property: "og:title", content: "INFYNUX Academy — Build Future-Ready Skills" },
      { property: "og:description", content: "Structured learning paths, tutorials, and internships for tomorrow's tech leaders." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <HomeSections />
    </SiteLayout>
  ),
});
