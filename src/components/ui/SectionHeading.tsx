import { cn } from "@/lib/utils";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      <RevealOnScroll>
        <span className="chip-mono inline-block text-cyan-glow">
          // {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-balance text-ink-muted">
            {description}
          </p>
        )}
        <div className={cn("divider-scan mt-8", align === "center" && "mx-auto max-w-xs")} />
      </RevealOnScroll>
    </div>
  );
}
