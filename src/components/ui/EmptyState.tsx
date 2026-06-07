import { Card } from "./Card";

export function EmptyState({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <Card variant="plain" className={`text-sm leading-6 text-[#4b5563] ${className ?? ""}`}>
      {message}
    </Card>
  );
}

