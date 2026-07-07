"use client";

import * as SiIcons from "react-icons/si";
import { IconType } from "react-icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { techStack } from "@/data/skills";
import { TechStackItem } from "@/types";

function TechBadge({ item }: { item: TechStackItem }) {
  const Icon = (SiIcons as unknown as Record<string, IconType>)[item.icon];

  return (
    <div
      className="group mx-3 flex shrink-0 items-center gap-3 rounded-2xl border border-glass-border bg-glass-fill px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/30 hover:bg-white/[0.06]"
      data-cursor="hover"
    >
      {Icon && (
        <Icon
          size={26}
          style={{ color: item.color }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      )}
      <span className="whitespace-nowrap font-mono text-sm text-ink-muted transition-colors group-hover:text-ink">
        {item.name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const loopedStack = [...techStack, ...techStack];

  return (
    <section
      id="tech-stack"
      className="section-shell relative overflow-hidden"
      aria-label="Technology stack"
    >
      <div className="container">
        <SectionHeading
          eyebrow="tech_stack"
          title="Tools I reach for."
          description="The languages, frameworks and platforms in daily rotation."
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent sm:w-40" />

        <div className="marquee-track py-2" aria-hidden="false">
          {loopedStack.map((item, i) => (
            <TechBadge key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
      <span className="sr-only">
        Technologies: {techStack.map((t) => t.name).join(", ")}
      </span>
    </section>
  );
}
