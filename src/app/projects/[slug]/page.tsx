import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clapperboard,
  ExternalLink,
  Layers3,
  Target,
  UserRound,
} from "lucide-react";
import { AnimatedPage } from "@/components/AnimatedPage";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoFrame } from "@/components/VideoFrame";
import { ActionLink } from "@/components/ui/ActionLink";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { projects as fallbackProjects } from "@/lib/portfolio-data";
import { getProjectBySlug, getProjects } from "@/lib/supabase-content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return fallbackProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.mainImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProjectBySlug(slug), getProjects()]);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  return (
    <AnimatedPage>
      <main className="pt-16">
        <PageHero
          eyebrow={project.category}
          title={project.title}
          description={project.summary}
          backHref="/projects"
          backLabel="All projects"
          minHeightClass="min-h-[78vh]"
          image={{
            src: project.mainImage,
            alt: `${project.title} hero image`,
            priority: true,
          }}
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <Tag variant="dark" className="px-3 py-2 text-sm text-white/82">
              {project.timeline}
            </Tag>
            {project.stack.slice(0, 4).map((item) => (
              <Tag key={item} variant="dark" className="bg-[#20c997]/14 px-3 py-2 text-sm text-[#8ff0d2] ring-[#20c997]/25">
                {item}
              </Tag>
            ))}
            </div>
        </PageHero>

        <section className="section-pad">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <Card as="article">
              <Target className="text-[#0f766e]" size={28} />
              <h2 className="mt-5 text-2xl font-semibold">Problem to solve</h2>
              <p className="mt-4 text-base leading-7 text-[#4b5563]">{project.problem}</p>
            </Card>

            <Card as="article">
              <Layers3 className="text-[#0f766e]" size={28} />
              <h2 className="mt-5 text-2xl font-semibold">Solution</h2>
              <p className="mt-4 text-base leading-7 text-[#4b5563]">{project.solution}</p>
            </Card>
          </div>
        </section>

        <section className="section-pad section-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div data-reveal>
              <SectionHeader
                eyebrow="Contribution"
                title="What Karim owned in this project."
                description={project.role}
              />
              <Card variant="plain" className="mt-8">
                <UserRound className="text-[#0f766e]" size={28} />
                <ul className="mt-6 grid gap-4">
                  {project.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[#111827]">
                      <CheckCircle2 className="mt-1 shrink-0 text-[#20c997]" size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card variant="dark">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f59e0b]">Result</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">Impact and proof points</h2>
              <p className="mt-4 text-base leading-7 text-white/68">{project.impact}</p>
              <ul className="mt-6 grid gap-4">
                {project.results.map((result) => (
                  <li key={result} className="flex gap-3 text-sm leading-6 text-white/86">
                    <CheckCircle2 className="mt-1 shrink-0 text-[#20c997]" size={17} />
                    {result}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Tag key={item} variant="dark">{item}</Tag>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="section-pad">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Media"
              title="Project visuals and walkthrough material."
              description="Screenshots and videos can be connected to Supabase later; this static build already supports project-specific images and optional video embeds."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {project.gallery.map((image) => (
                <div key={`${image.src}-${image.caption}`} data-reveal>
                  <MediaFrame
                    src={image.src}
                    alt={image.alt}
                    caption={image.caption}
                    kind={image.kind}
                    poster={image.poster}
                  />
                </div>
              ))}

              {project.video?.url || project.video?.embedCode ? (
                <div data-reveal>
                  <VideoFrame
                    title={`${project.title} explaining video`}
                    videoType={project.video.type}
                    url={project.video.url}
                    embedCode={project.video.embedCode}
                    caption={project.video.title}
                    poster={project.video.poster}
                  />
                </div>
              ) : (
                <Card as="article" variant="dark" className="grid min-h-[320px] content-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                  <Clapperboard className="text-[#20c997]" size={34} />
                  {project.video ? (
                  <>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#f59e0b]">Explaining video</p>
                    <h3 className="mt-3 text-2xl font-semibold">{project.video.title}</h3>
                    <ActionLink className="mt-6 text-[#20c997]" href={project.video.url || "#"} target="_blank" rel="noreferrer" icon={ExternalLink}>
                      Watch walkthrough
                    </ActionLink>
                  </>
                  ) : (
                  <>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#f59e0b]">Video slot</p>
                    <h3 className="mt-3 text-2xl font-semibold">Explaining video not public yet</h3>
                    <p className="mt-4 text-sm leading-6 text-white/68">
                      The page is ready for a demo or technical walkthrough link when a public video becomes available.
                    </p>
                  </>
                  )}
                </Card>
              )}
            </div>
          </div>
        </section>

        <section className="section-pad section-band">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="More Projects"
                title="Continue exploring Karim's work."
                description="The case-study format is available for every project in the portfolio."
              />
              <ActionLink href="/contributions" icon={ArrowRight}>
                View contributions
              </ActionLink>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {relatedProjects.map((item) => (
                <div key={item.slug} data-reveal>
                  <ProjectCard project={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
