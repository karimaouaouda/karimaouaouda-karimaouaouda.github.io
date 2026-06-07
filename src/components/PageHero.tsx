import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ActionLink } from "./ui/ActionLink";
import { NeuralParticles } from "./NeuralParticles";

export function PageHero({
  eyebrow,
  title,
  description,
  backHref = "/",
  backLabel = "Back home",
  image,
  minHeightClass = "",
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  image?: {
    src: string;
    alt: string;
    priority?: boolean;
  };
  minHeightClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`relative overflow-hidden bg-[#0b1018] px-4 py-24 text-white sm:px-6 lg:px-8 ${minHeightClass}`}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={image.priority}
          sizes="100vw"
          className="object-cover opacity-55"
        />
      ) : null}
      <div className="hero-surface absolute inset-0" />
      <div className="neural-grid absolute inset-0 opacity-35" />
      <NeuralParticles className="opacity-55" density={22} />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f7faf9] to-transparent" />

      <div className="relative mx-auto grid max-w-7xl content-center">
        <ActionLink dataHero href={backHref} variant="back" icon={ArrowLeft} className="w-fit">
          {backLabel}
        </ActionLink>
        <div data-hero className="mt-8 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f59e0b]">{eyebrow}</p>
          <h1 className="hero-title mt-4 text-5xl font-semibold tracking-normal sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
