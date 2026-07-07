"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { staggerItemVariants } from "@/components/animations/StaggerReveal";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig = {
  completed: { label: "Completed", color: "text-signal-green" },
  "in-progress": { label: "In Progress", color: "text-signal-amber" },
  concept: { label: "Concept", color: "text-ink-faint" },
};

export default function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      variants={staggerItemVariants}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass-panel transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-cyan"
    >
      {project.featured && (
        <span className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-void/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-signal-amber backdrop-blur-sm">
          <Star size={11} className="fill-signal-amber" />
          Featured
        </span>
      )}

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-void-300">
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-void-300 to-void-200">
            <span className="font-display text-2xl font-bold text-ink-faint/40">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void-100 via-void-100/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              aria-label={`View live demo of ${project.title}`}
              className="flex items-center gap-2 rounded-full bg-cyan-glow px-5 py-2.5 font-medium text-void transition-transform hover:scale-105"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              aria-label={`View source code of ${project.title} on GitHub`}
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 font-medium text-ink backdrop-blur-sm transition-transform hover:scale-105"
            >
              <Github size={15} />
              Code
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="chip-mono text-ink-faint">{project.year}</span>
          <span
            className={cn("chip-mono", statusConfig[project.status].color)}
          >
            {statusConfig[project.status].label}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-cyan-soft">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="chip-mono rounded-md border border-glass-border bg-void-200/60 px-2.5 py-1 text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
