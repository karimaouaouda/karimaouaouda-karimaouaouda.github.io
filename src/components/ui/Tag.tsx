import { cn } from "@/lib/cn";

export function Tag({
  children,
  variant = "light",
  className,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "warm";
  className?: string;
}) {
  const variantClass = {
    light: "skill-pill",
    dark: "rounded bg-white/8 px-3 py-1 text-xs font-semibold text-white/78 ring-1 ring-white/10",
    warm: "rounded bg-[#fff7ed] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#b45309]",
  }[variant];

  return <span className={cn(variantClass, className)}>{children}</span>;
}

