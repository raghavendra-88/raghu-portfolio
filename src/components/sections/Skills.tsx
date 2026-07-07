"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillBar from "@/components/ui/SkillBar";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { skills, skillCategoryLabels } from "@/data/skills";
import { SkillCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: SkillCategory[] = [
  "languages",
  "frontend",
  "backend",
  "security",
  "tools",
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>(
    "languages"
  );

  const filteredSkills = useMemo(
    () => skills.filter((skill) => skill.category === activeCategory),
    [activeCategory]
  );

  return (
    <section
      id="skills"
      className="section-shell relative bg-void-100/40"
      aria-label="Skills"
    >
      <div className="pointer-events-none absolute inset-0 bg-aurora-2 opacity-60" />
      <div className="container relative">
        <SectionHeading
          eyebrow="skills"
          title="Fluent in code, fluent in security."
          description="A working toolkit built through coursework, self-study, and shipping real projects — not just tutorials."
        />

        <div
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Skill categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              data-cursor="hover"
              className={cn(
                "relative rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors duration-300",
                activeCategory === category
                  ? "text-void"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {activeCategory === category && (
                <motion.span
                  layoutId="skill-tab-active"
                  className="absolute inset-0 rounded-full bg-cyan-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">
                {skillCategoryLabels[category]}
              </span>
            </button>
          ))}
        </div>

        <StaggerReveal
          key={activeCategory}
          className="grid grid-cols-1 gap-x-12 gap-y-7 rounded-2xl glass-panel p-8 sm:grid-cols-2 sm:p-10"
        >
          {filteredSkills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
