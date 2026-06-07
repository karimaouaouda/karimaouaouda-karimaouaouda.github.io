import Image from "next/image";
import { CheckCircle2, Code2, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";

type ProfilePortraitVariant = "hero" | "profile";

const portrait = {
  hero: {
    src: "./my_pics/me_with_black_bg.png",
    alt: "Karim Aouaouda professional portrait on a black background",
  },
  profile: {
    src: "./my_pics/me_with_white_bg.png",
    alt: "Karim Aouaouda professional portrait on a white background",
  },
};

const signals = [
  { label: "Laravel", detail: "Backend ownership", icon: Code2 },
  { label: "Mobile", detail: "Product apps", icon: Smartphone },
  { label: "Delivery", detail: "CI/CD mindset", icon: CheckCircle2 },
];

export function ProfilePortrait({
  variant = "hero",
  className,
}: {
  variant?: ProfilePortraitVariant;
  className?: string;
}) {
  const image = portrait[variant];
  const isHero = variant === "hero";

  return (
    <figure
      data-hero={isHero ? true : undefined}
      data-reveal={!isHero ? true : undefined}
      data-float={isHero ? true : undefined}
      className={cn(
        "relative overflow-hidden rounded-md",
        isHero
          ? "border border-white/14 bg-[#030506] shadow-[0_30px_100px_rgba(0,0,0,0.42)]"
          : "border border-[#dbe3ea] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.1)]",
        className,
      )}
    >
      <div className={cn("relative", isHero ? "aspect-[5/6]" : "aspect-[4/3]")}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={isHero}
          sizes={isHero ? "(min-width: 1024px) 34vw, 92vw" : "(min-width: 1024px) 36vw, 92vw"}
          className={cn("object-cover", isHero ? "opacity-92" : "object-[center_42%]")}
        />
        <div
          className={cn(
            "absolute inset-0",
            isHero
              ? "bg-[linear-gradient(180deg,rgba(3,5,6,0.04),rgba(3,5,6,0.48)),linear-gradient(135deg,rgba(32,201,151,0.22),transparent_40%)]"
              : "bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.8))]",
          )}
        />
        <div className={cn("neural-grid absolute inset-0", isHero ? "opacity-18" : "opacity-0")} />
      </div>

      {isHero ? (
        <figcaption className="absolute inset-x-4 bottom-4 rounded border border-white/12 bg-[#07130f]/78 p-4 text-white shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#facc6b]">Available for product teams</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.label} className="rounded border border-white/10 bg-white/8 p-3">
                  <Icon className="text-[#8ff0d2]" size={17} />
                  <p className="mt-2 text-xs font-semibold">{signal.label}</p>
                  <p className="mt-1 text-[0.68rem] leading-4 text-white/56">{signal.detail}</p>
                </div>
              );
            })}
          </div>
        </figcaption>
      ) : (
        <figcaption className="p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">Engineer profile</p>
          <p className="mt-3 text-lg font-semibold leading-7 text-[#111827]">
            Calm production ownership across Laravel backends, mobile interfaces, secure workflows, and release systems.
          </p>
        </figcaption>
      )}
    </figure>
  );
}
