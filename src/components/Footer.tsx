import { Code2, Contact, Mail } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b1018] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
            Laravel full-stack engineer focused on mobile apps, secure medical workflows, CI/CD, and practical AI/MLOps integration.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <IconButton variant="footer" href={`mailto:${profile.email}`} label="Email" icon={Mail} />
          <IconButton variant="footer" href={profile.github} target="_blank" rel="noreferrer" label="GitHub" icon={Code2} />
          <IconButton variant="footer" href={profile.linkedin} target="_blank" rel="noreferrer" label="LinkedIn" icon={Contact} />
        </div>
      </div>
    </footer>
  );
}
