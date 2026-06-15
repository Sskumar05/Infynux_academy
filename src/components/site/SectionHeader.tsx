import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        center ? "mx-auto text-center" : "",
        className
      )}
      data-aos="fade-up"
    >
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[var(--navy)] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
