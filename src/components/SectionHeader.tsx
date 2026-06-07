export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#111827] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-[#4b5563]">{description}</p> : null}
    </div>
  );
}
