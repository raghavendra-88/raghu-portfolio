"use client";

import { motion } from "framer-motion";
import {
  Code2,
  ShieldCheck,
  Clapperboard,
  Palette,
  Sparkles,
  GraduationCap,
  Check,
  LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerReveal, {
  staggerItemVariants,
} from "@/components/animations/StaggerReveal";
import { services } from "@/data/credentials";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  ShieldCheck,
  Clapperboard,
  Palette,
  Sparkles,
  GraduationCap,
};

export default function Services() {
  return (
    <section id="services" className="section-shell relative" aria-label="Services">
      <div className="container">
        <SectionHeading
          eyebrow="services"
          title="How I can help."
          description="Available for freelance, collaborative, and mentorship work alongside my studies."
        />

        <StaggerReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Code2;
            return (
              <motion.div
                key={service.id}
                variants={staggerItemVariants}
                data-cursor="hover"
                className="group relative flex flex-col overflow-hidden rounded-2xl glass-panel p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow-violet"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-glow/0 blur-2xl transition-colors duration-500 group-hover:bg-violet-glow/10" />

                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-glass-border bg-void-200 text-cyan-glow transition-colors duration-300 group-hover:border-cyan-glow/40 group-hover:text-cyan-soft">
                  <Icon size={22} />
                </span>

                <h3 className="relative mt-5 font-display text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>

                <ul className="relative mt-5 space-y-2 border-t border-glass-border pt-5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-ink-muted"
                    >
                      <Check size={14} className="shrink-0 text-signal-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
