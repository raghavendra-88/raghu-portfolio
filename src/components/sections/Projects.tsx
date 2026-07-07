"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { staggerContainerVariants } from "@/components/animations/StaggerReveal";
import { projects, projectCategories } from "@/data/projects";
import { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<
    ProjectCategory | "all"
  >("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) =>
      project.category.includes(activeFilter as ProjectCategory)
    );
  }, [activeFilter]);

  return (
    <section id="projects" className="section-shell relative" aria-label="Projects">
      <div className="container">
        <SectionHeading
          eyebrow="projects"
          title="Selected work."
          description="A mix of security tooling, frontend engineering, and creative experiments — each one built to actually ship, not just demo."
        />

        <div className="mb-12 flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              data-cursor="hover"
              className={cn(
                "relative rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors duration-300",
                activeFilter === cat.value
                  ? "text-void"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {activeFilter === cat.value && (
                <motion.span
                  layoutId="project-tab-active"
                  className="absolute inset-0 rounded-full bg-cyan-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          custom={0.08}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="py-16 text-center font-mono text-ink-faint">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
