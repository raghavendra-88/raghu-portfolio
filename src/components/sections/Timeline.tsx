"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { timelineItems } from "@/data/timeline";
import { cn } from "@/lib/utils";

type FilterType = "all" | "experience" | "education";

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Experience", value: "experience" },
  { label: "Education", value: "education" },
];

export default function Timeline() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(
    timelineItems[0]?.id ?? null
  );

  const items = timelineItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <section
      id="experience"
      className="section-shell relative bg-void-100/40"
      aria-label="Experience and education timeline"
    >
      <div className="pointer-events-none absolute inset-0 bg-aurora-1 opacity-50" />
      <div className="container relative">
        <SectionHeading
          eyebrow="journey"
          title="Where the time went."
          description="Formal education stacked against the self-directed work that shaped it."
        />

        <div className="mb-12 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              data-cursor="hover"
              className={cn(
                "relative rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors duration-300",
                filter === f.value
                  ? "text-void"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {filter === f.value && (
                <motion.span
                  layoutId="timeline-tab-active"
                  className="absolute inset-0 rounded-full bg-violet-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <div
            className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-cyan-glow via-violet-glow to-transparent sm:left-6"
            aria-hidden="true"
          />

          <ul className="space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => {
                const isExpanded = expandedId === item.id;
                const Icon =
                  item.type === "experience" ? Briefcase : GraduationCap;

                return (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="relative pl-12 sm:pl-16"
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 sm:h-12 sm:w-12",
                        item.type === "experience"
                          ? "border-cyan-glow bg-void text-cyan-glow shadow-glow-cyan"
                          : "border-violet-glow bg-void text-violet-glow shadow-glow-violet"
                      )}
                      aria-hidden="true"
                    >
                      <Icon size={18} />
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : item.id)
                      }
                      className="w-full text-left"
                      aria-expanded={isExpanded}
                      data-cursor="hover"
                    >
                      <div className="glass-panel rounded-2xl p-6 transition-colors duration-300 hover:border-glass-border/60">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <span className="chip-mono text-ink-faint">
                              {item.startDate} — {item.endDate}
                            </span>
                            <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                              {item.title}
                            </h3>
                            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                              {item.organization}
                              <span aria-hidden="true">·</span>
                              <MapPin size={13} />
                              {item.location}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 leading-relaxed text-ink-muted">
                          {item.description}
                        </p>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <ul className="mt-4 space-y-2 border-t border-glass-border pt-4">
                                {item.highlights.map((highlight) => (
                                  <li
                                    key={highlight}
                                    className="flex gap-2 text-sm leading-relaxed text-ink-muted"
                                  >
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-glow" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="chip-mono rounded-full border border-glass-border px-3 py-1 text-ink-faint"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  );
}
