"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerReveal, {
  staggerItemVariants,
} from "@/components/animations/StaggerReveal";
import { blogPosts } from "@/data/content";

export default function Blog() {
  return (
    <section id="blog" className="section-shell relative bg-void-100/40" aria-label="Blog">
      <div className="container">
        <SectionHeading
          eyebrow="writing"
          title="Notes from the lab."
          description="Long-form write-ups on security, frontend engineering, and the crossover between them — launching soon."
        />

        <StaggerReveal className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={staggerItemVariants}
              className="group relative flex flex-col overflow-hidden rounded-2xl glass-panel p-6 transition-all duration-300 hover:-translate-y-1"
            >
              {post.comingSoon && (
                <span className="absolute right-5 top-5 chip-mono rounded-full border border-glass-border bg-void/60 px-2.5 py-1 text-signal-amber">
                  Coming Soon
                </span>
              )}
              <span className="chip-mono text-cyan-glow">{post.category}</span>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {post.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-glass-border pt-4">
                <span className="flex items-center gap-1.5 chip-mono text-ink-faint">
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1 chip-mono text-ink-faint transition-colors group-hover:text-cyan-soft">
                  Read
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </StaggerReveal>

        <p className="mt-10 text-center font-mono text-sm text-ink-faint">
          Subscribe via the contact form below to get notified when the blog
          launches.
        </p>
      </div>
    </section>
  );
}
