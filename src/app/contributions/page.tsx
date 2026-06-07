import type { Metadata } from "next";
import { CheckCircle2, ExternalLink, GitBranch, Handshake, Package, UsersRound } from "lucide-react";
import { AnimatedPage } from "@/components/AnimatedPage";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { ActionLink } from "@/components/ui/ActionLink";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "@/components/ui/Tag";
import { getContributions } from "@/lib/supabase-content";

export const metadata: Metadata = {
  title: "Contributions",
  description:
    "Open-source, startup, mentoring, and external project contributions by Karim Aouaouda.",
};

const contributionIcons = {
  "open-source": GitBranch,
  startup: Handshake,
  mentoring: UsersRound,
  package: Package,
};

export default async function ContributionsPage() {
  const contributions = await getContributions();

  return (
    <AnimatedPage>
      <main className="pt-16">
        <PageHero
          eyebrow="Contributions"
          title="Contributions to products, open source, teams, and learning communities."
          description="This page separates contribution work from personal projects, which helps recruiters understand where Karim collaborated, maintained, supported, or extended external systems."
        />

        <section className="section-pad">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Contribution Map"
              title="A professional view of external impact."
              description="Open-source package work, startup product contributions, and mentoring activity all show engineering maturity beyond isolated portfolio demos."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {contributions.length > 0 ? contributions.map((item) => {
                const Icon = contributionIcons[item.kind];
                return (
                  <Card key={item.title} as="article">
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="text-[#0f766e]" size={30} />
                      <Tag>
                        {item.kind.replace("-", " ")}
                      </Tag>
                    </div>
                    <p className="mt-6 text-sm font-semibold text-[#0f766e]">{item.organization} / {item.timeline}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-[#111827]">{item.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-[#4b5563]">{item.summary}</p>

                    <ul className="mt-6 grid gap-3">
                      {item.contribution.map((contribution) => (
                        <li key={contribution} className="flex gap-3 text-sm leading-6 text-[#111827]">
                          <CheckCircle2 className="mt-1 shrink-0 text-[#20c997]" size={17} />
                          {contribution}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 rounded-md bg-[#111827] p-4 text-sm font-medium leading-6 text-white/86">
                      {item.outcome}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.stack.map((stack) => (
                        <Tag key={stack}>{stack}</Tag>
                      ))}
                    </div>

                    {item.link ? (
                      <ActionLink className="mt-6" href={item.link} target="_blank" rel="noreferrer" icon={ExternalLink}>
                        View related profile
                      </ActionLink>
                    ) : null}
                  </Card>
                );
              }) : (
                <EmptyState className="lg:col-span-2" message="No public contributions are available in Supabase yet." />
              )}
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
