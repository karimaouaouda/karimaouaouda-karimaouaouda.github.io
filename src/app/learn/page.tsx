import type { Metadata } from "next";
import { BookOpen, Clapperboard, ExternalLink, Route } from "lucide-react";
import { AnimatedPage } from "@/components/AnimatedPage";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoFrame } from "@/components/VideoFrame";
import { ActionLink } from "@/components/ui/ActionLink";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "@/components/ui/Tag";
import { getLearningItems } from "@/lib/supabase-content";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Learning, courses, videos, and technical study tracks for Karim Aouaouda.",
};

const icons = {
  course: BookOpen,
  video: Clapperboard,
  track: Route,
};

export default async function LearnPage() {
  const learningItems = await getLearningItems();

  return (
    <AnimatedPage>
      <main className="pt-16">
        <PageHero
          eyebrow="Learning and Education"
          title="Courses, videos, and study tracks that support the engineering roadmap."
          description="This page is ready for future videos, course links, and Supabase-managed learning resources. The current content reflects the strongest development themes from the CV."
        />

        <section className="section-pad">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Learning Tracks"
              title="A public learning log built around Laravel, mobile apps, secure delivery, and MLOps."
              description="Use this page for course notes, video walkthroughs, technical writing, and recruiter-facing proof of continuous learning."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {learningItems.length > 0 ? learningItems.map((item) => {
                const Icon = icons[item.type];
                return (
                  <Card key={item.title} as="article" variant="shell" className="overflow-hidden">
                    {item.videoUrl || item.videoEmbedCode ? (
                      <VideoFrame
                        title={`${item.title} course video`}
                        videoType={item.videoType}
                        url={item.videoUrl}
                        embedCode={item.videoEmbedCode}
                        caption=""
                        poster={item.thumbnailUrl}
                        framed={false}
                      />
                    ) : null}
                    <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="text-[#0f766e]" size={28} />
                      <Tag variant="warm">
                        {item.status}
                      </Tag>
                    </div>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{item.type}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-[#111827]">{item.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-[#4b5563]">{item.focus}</p>
                    <p className="mt-5 rounded-md bg-[#f3f7f6] p-4 text-sm leading-6 text-[#111827]">{item.notes}</p>
                    {item.url ? (
                      <ActionLink className="mt-5" href={item.url} target="_blank" rel="noreferrer" icon={ExternalLink}>
                        Open resource
                      </ActionLink>
                    ) : null}
                    </div>
                  </Card>
                );
              }) : (
                <EmptyState className="md:col-span-2" message="No public learning resources are available in Supabase yet." />
              )}
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
