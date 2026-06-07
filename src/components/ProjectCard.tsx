import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ui/ActionLink";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/portfolio-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article" variant="shell" reveal={false} className="group grid min-h-[430px] content-between overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0b1018]">
        <Image
          src={project.mainImage}
          alt={`${project.title} project preview`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1018]/68 via-[#0b1018]/8 to-transparent" />
        <div className="neural-grid absolute inset-0 opacity-18" />
      </div>
      <div className="grid flex-1 content-between p-6">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#0f766e]">{project.category}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#111827]">{project.title}</h3>
          </div>
          <ArrowUpRight className="mt-1 text-[#9ca3af] transition group-hover:text-[#20c997]" size={22} />
        </div>
        <p className="mt-4 text-sm leading-6 text-[#4b5563]">{project.summary}</p>
        <p className="mt-4 text-sm font-medium leading-6 text-[#111827]">{project.impact}</p>
      </div>
      <div>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <ActionLink href={`/projects/${project.slug}`} className="mt-6" icon={ArrowUpRight}>
          Explore case study
        </ActionLink>
      </div>
      </div>
    </Card>
  );
}
