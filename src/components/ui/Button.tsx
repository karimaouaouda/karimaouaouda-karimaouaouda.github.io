import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "dark";

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  dark: "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#111827] px-5 text-sm font-semibold text-white transition hover:bg-[#0f766e] disabled:cursor-not-allowed disabled:opacity-60",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: ButtonVariant;
};

export function Button({
  children,
  icon: Icon,
  iconPosition = "left",
  variant = "dark",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(variants[variant], className)} {...props}>
      {Icon && iconPosition === "left" ? <Icon size={17} /> : null}
      {children}
      {Icon && iconPosition === "right" ? <Icon size={17} /> : null}
    </button>
  );
}
