import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ActionLinkVariant = "primary" | "secondary" | "text" | "back" | "dark";

const variants: Record<ActionLinkVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  text: "text-link",
  back: "inline-flex items-center gap-2 text-sm font-semibold text-[#20c997] transition hover:text-[#8ff0d2]",
  dark: "inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#111827] px-5 text-sm font-semibold text-white transition hover:bg-[#0f766e]",
};

function isInternalHref(href: string) {
  return href.startsWith("/");
}

export function ActionLink({
  href,
  children,
  icon: Icon,
  iconPosition,
  variant = "text",
  className,
  target,
  rel,
  download,
  dataHero,
}: {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: ActionLinkVariant;
  className?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  dataHero?: boolean;
}) {
  const resolvedIconPosition = iconPosition ?? (variant === "back" ? "left" : "right");
  const content = (
    <>
      {Icon && resolvedIconPosition === "left" ? <Icon size={variant === "back" ? 17 : 18} /> : null}
      {children}
      {Icon && resolvedIconPosition === "right" ? <Icon size={variant === "back" ? 17 : 18} /> : null}
    </>
  );
  const classes = cn(variants[variant], className);

  if (isInternalHref(href) && !download) {
    return (
      <Link className={classes} href={href} data-hero={dataHero ? true : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={classes}
      href={href}
      target={target}
      rel={rel}
      download={download}
      data-hero={dataHero ? true : undefined}
    >
      {content}
    </a>
  );
}
