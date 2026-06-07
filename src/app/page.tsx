import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Mail,
  MapPin,
  ShieldCheck,
  Smartphone,
  TerminalSquare,
} from "lucide-react";
import { AnimatedPage } from "@/components/AnimatedPage";
import { ContactForm } from "@/components/ContactForm";
import { NeuralParticles } from "@/components/NeuralParticles";
import { ProfilePortrait } from "@/components/ProfilePortrait";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ActionLink } from "@/components/ui/ActionLink";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "@/components/ui/Tag";
import {
  education,
  experiences,
  profile,
  recruiterSignals,
  skills,
  stats,
} from "@/lib/portfolio-data";
import { getContributions, getProjects } from "@/lib/supabase-content";

export default async function Home() {
  const [projects, contributions] = await Promise.all([getProjects(), getContributions()]);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <AnimatedPage>
      <main>
        <section className="relative min-h-screen overflow-hidden bg-[#0b1018] pt-28 text-white">
          <Image
            src="/karim-engineering-hero.png"
            alt="Engineering workstation with mobile app and secure medical system dashboards"
            fill
            priority
            data-parallax
            className="object-cover opacity-62"
          />
          <div className="hero-surface absolute inset-0" />
          <div className="neural-grid absolute inset-0 opacity-45" />
          <NeuralParticles className="opacity-75" density={34} />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7faf9] to-transparent" />

          <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl content-center gap-10 px-4 pb-28 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:px-8">
            <div className="max-w-3xl">
              <p data-hero className="glass-panel inline-flex rounded-md px-3 py-2 text-sm font-semibold text-[#8ff0d2]">
                Full-stack Laravel, mobile apps, secure production systems
              </p>
              <h1 data-hero className="hero-title mt-6 text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p data-hero className="mt-6 max-w-2xl text-xl leading-8 text-white/78">
                {profile.summary}
              </p>
              <div data-hero className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="/projects" variant="primary" icon={ArrowRight}>
                  See projects
                </ActionLink>
                <ActionLink href={`mailto:${profile.email}`} variant="secondary" icon={Mail}>
                  Contact me
                </ActionLink>
              </div>
              <div data-hero className="mt-8 flex flex-wrap gap-4 text-sm text-white/64">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} /> {profile.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Download size={16} /> CV-informed portfolio
                </span>
              </div>
            </div>
            <ProfilePortrait variant="hero" className="mx-auto w-full max-w-[420px] lg:ml-auto" />
          </div>
        </section>

        <section className="section-pad -mt-16">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <Card key={stat.label} variant="metric">
                <p className="relative text-4xl font-semibold text-[#111827]">{stat.value}</p>
                <p className="relative mt-3 text-sm leading-6 text-[#4b5563]">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-pad">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
            <ProfilePortrait variant="profile" />
            <div>
              <SectionHeader
                eyebrow="Positioning"
                title="A practical product engineer who can own Laravel backend, mobile UI, and release reliability."
                description="The strongest recruiter signal is not one isolated technology. It is the ability to take product requirements through architecture, implementation, security, deployment, and iteration."
              />
              <div className="mt-10 grid gap-5">
                {recruiterSignals.map((signal) => (
                  <Card key={signal}>
                    <CheckCircle2 className="text-[#20c997]" size={24} />
                    <p className="mt-5 text-base leading-7 text-[#111827]">{signal}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad section-band">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Core Skills"
              title="Built around Laravel, mobile apps, secure desktop delivery, and DevOps."
              description="Skills are grouped the way a hiring team would evaluate them: product backend, customer-facing UI, secure offline workflows, and deployment discipline."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {skills.map((skill, index) => {
                const Icon = [TerminalSquare, Smartphone, ShieldCheck, CheckCircle2][index] || TerminalSquare;
                return (
                  <Card key={skill.title} as="article">
                    <Icon className="text-[#0f766e]" size={28} />
                    <h3 className="mt-5 text-2xl font-semibold text-[#111827]">{skill.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#4b5563]">{skill.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Contributions"
                title="External impact across products, packages, and teams."
                description="A separate contribution page makes it easier for recruiters to distinguish personal projects from maintained products, open-source work, and team support."
              />
              <ActionLink href="/contributions" variant="text" icon={ArrowRight}>
                Explore contributions
              </ActionLink>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {contributions.slice(0, 4).map((item) => (
                <Card key={item.title} as="article">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                    {item.kind.replace("-", " ")}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-[#111827]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#4b5563]">{item.outcome}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Featured Work"
                title="Production-grade projects with Laravel, mobile, and secure workflow depth."
                description="These are the homepage highlights. The full projects page includes more detail and additional work."
              />
              <ActionLink href="/projects" variant="text" icon={ArrowRight}>
                See all projects
              </ActionLink>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {featuredProjects.length > 0 ? (
                featuredProjects.map((project) => (
                  <div key={project.slug} data-reveal>
                    <ProjectCard project={project} />
                  </div>
                ))
              ) : (
                <EmptyState className="lg:col-span-3" message="No featured projects are published in Supabase yet." />
              )}
            </div>
          </div>
        </section>

        <section className="section-pad section-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <SectionHeader
              eyebrow="Experience"
              title="Startup delivery, technical ownership, and production maintenance."
              description="Karim's recent experience is strongest where product work needs security, velocity, and pragmatic architecture."
            />
            <div className="grid gap-5">
              {experiences.map((experience) => (
                <Card key={experience.company} as="article">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[#111827]">{experience.role}</h3>
                      <p className="mt-1 text-sm font-semibold text-[#0f766e]">{experience.company}</p>
                    </div>
                    <p className="text-sm text-[#6b7280]">{experience.timeline}</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#4b5563]">{experience.summary}</p>
                  <ul className="mt-5 grid gap-3">
                    {experience.wins.map((win) => (
                      <li key={win} className="flex gap-3 text-sm leading-6 text-[#111827]">
                        <CheckCircle2 className="mt-1 shrink-0 text-[#20c997]" size={17} />
                        {win}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <SectionHeader
                eyebrow="Education"
                title="Software engineering foundations, now extended with AI."
                description="The portfolio keeps Laravel and mobile apps in front, while showing a credible AI/MLOps path for future-facing product teams."
              />
              <div className="mt-8 grid gap-4">
                {education.map((item) => (
                  <Card key={item.degree} as="article">
                    <p className="text-sm font-semibold text-[#0f766e]">{item.timeline}</p>
                    <h3 className="mt-2 text-xl font-semibold">{item.degree}</h3>
                    <p className="mt-1 text-sm text-[#4b5563]">{item.school}</p>
                    <p className="mt-4 text-sm leading-6 text-[#4b5563]">{item.note}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div data-reveal>
              <SectionHeader
                eyebrow="Contact"
                title="Recruiting, freelance builds, and product engineering conversations."
                description={profile.availability}
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
