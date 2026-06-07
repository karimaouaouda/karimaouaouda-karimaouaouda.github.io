import { cn } from "@/lib/cn";

type CardVariant = "premium" | "metric" | "dark" | "plain" | "shell";

const variants: Record<CardVariant, string> = {
  premium: "premium-card rounded-md p-6",
  metric: "metric-card rounded-md p-6",
  dark: "rounded-md border border-[#dbe3ea] bg-[#111827] p-6 text-white",
  plain: "rounded-md border border-[#dbe3ea] bg-white p-6",
  shell: "premium-card rounded-md",
};

export function Card({
  children,
  className,
  id,
  variant = "premium",
  as = "div",
  reveal = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: CardVariant;
  as?: "article" | "div" | "section";
  reveal?: boolean;
}) {
  const Component = as;

  return (
    <Component id={id} className={cn(variants[variant], className)} data-reveal={reveal ? true : undefined}>
      {children}
    </Component>
  );
}
