import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { AnimatedPage } from "@/components/AnimatedPage";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { ActionLink } from "@/components/ui/ActionLink";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "@/components/ui/Tag";
import { getProjects } from "@/lib/supabase-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected Laravel, mobile, Electron, automation, open-source, and AI projects by Karim Aouaouda.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <AnimatedPage>
      <main className="pt-16">
        <PageHero
          eyebrow="Project Portfolio"
          title="Work that shows Laravel depth, mobile delivery, and secure production thinking."
          description="Each project is written for hiring teams: what it is, the stack, the practical impact, and the engineering responsibility behind it."
        />

        <section className="section-pad">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Selected Projects"
              title="Production, startup, open-source, automation, and AI-oriented work."
              description="The strongest projects are listed first, with Doctolik and mobile product delivery positioned for Laravel/full-stack recruitment."
            />
            <div className="mt-10 grid gap-6">
              {projects.length > 0 ? projects.map((project, index) => (
                <Card
                  id={project.slug}
                  key={project.slug}
                  as="article"
                  variant="shell"
                  className="grid overflow-hidden lg:grid-cols-[0.78fr_1.22fr]"
                >
                  <div className="relative min-h-72 bg-[#0b1018]">
                    <Image
                      src={project.mainImage}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1018]/75 via-[#0b1018]/12 to-transparent" />
                    <div className="neural-grid absolute inset-0 opacity-20" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-sm font-semibold text-[#20c997]">{project.category}</p>
                      <p className="mt-2 text-sm text-white/72">{project.timeline}</p>
                    </div>
                  </div>
                  <div className="grid gap-6 p-6 lg:grid-cols-[0.82fr_1.18fr]">
                  <div>
                    <p className="text-sm font-semibold text-[#0f766e]">{project.category}</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#111827]">
                      {String(index + 1).padStart(2, "0")}. {project.title}
                    </h2>
                    <p className="mt-3 text-sm text-[#6b7280]">{project.timeline}</p>
                    <p className="mt-6 text-base leading-7 text-[#4b5563]">{project.summary}</p>
                    <p className="mt-5 rounded-md bg-[#f3f7f6] p-4 text-sm font-medium leading-6 text-[#0f766e]">
                      {project.impact}
                    </p>
                    <ActionLink href={`/projects/${project.slug}`} className="mt-5" icon={ExternalLink}>
                      Explore full case study
                    </ActionLink>
                  </div>
                  <div className="grid content-between gap-6">
                    <ul className="grid gap-3">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm leading-6 text-[#111827]">
                          <CheckCircle2 className="mt-1 shrink-0 text-[#20c997]" size={17} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </div>
                  </div>
                </Card>
              )) : (
                <EmptyState message="No public projects are available in Supabase yet." />
              )}
            </div>
            <Card variant="dark" className="mt-10">
              <p className="text-lg font-semibold">Projects are loaded from Supabase.</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68">
                If Supabase env vars are missing or a query fails, the portfolio falls back to the local CV-derived content so the static site never breaks.
              </p>
              <ActionLink className="mt-5 text-[#20c997]" href="https://supabase.com" target="_blank" rel="noreferrer" icon={ExternalLink}>
                Supabase backend ready
              </ActionLink>
            </Card>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
