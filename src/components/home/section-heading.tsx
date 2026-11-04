export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl sm:text-4xl">{title}</h2>
      <svg
        viewBox="0 0 120 20"
        aria-hidden="true"
        className="mx-auto mt-3 h-4 w-28 text-primary"
      >
        <path
          d="M0 10 H40 L50 2 L62 18 L72 10 H120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}
    </div>
  );
}