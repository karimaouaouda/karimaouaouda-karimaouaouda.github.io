import type { MouseEventHandler } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type IconButtonVariant = "header" | "footer" | "mobile";
type IconButtonAccent = "teal" | "amber";

const accents: Record<IconButtonAccent, string> = {
  teal: "hover:border-[#20c997]/60 hover:text-[#20c997]",
  amber: "hover:border-[#f59e0b]/60 hover:text-[#f59e0b]",
};

const variants: Record<IconButtonVariant, string> = {
  header: "grid size-10 place-items-center rounded-md border border-white/10 text-white/72 transition",
  footer: "footer-link",
  mobile: "grid size-10 place-items-center rounded-md border border-white/10 text-white md:hidden",
};

export function IconButton({
  icon: Icon,
  label,
  href,
  target,
  rel,
  onClick,
  type = "button",
  variant = "header",
  accent = "teal",
  className,
}: {
  icon: LucideIcon;
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant?: IconButtonVariant;
  accent?: IconButtonAccent;
  className?: string;
}) {
  const classes = cn(variants[variant], variant === "header" && accents[accent], className);

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel} aria-label={label}>
        <Icon size={18} />
      </a>
    );
  }

  return (
    <button type={type} aria-label={label} className={classes} onClick={onClick}>
      <Icon size={variant === "mobile" ? 19 : 18} />
    </button>
  );
}
