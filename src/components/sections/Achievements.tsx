"use client";

import { motion } from "framer-motion";
import {
  Flag,
  Users,
  Rocket,
  Video,
  Trophy,
  Award,
  LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import StaggerReveal, {
  staggerItemVariants,
} from "@/components/animations/StaggerReveal";
import { achievements, stats } from "@/data/credentials";

const iconMap: Record<string, LucideIcon> = {
  Flag,
  Users,
  Rocket,
  Video,
  Trophy,
  Award,
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="section-shell relative bg-void-100/40"
      aria-label="Achievements and milestones"
    >
      <div className="pointer-events-none absolute inset-0 bg-aurora-3" />
      <div className="container relative">
        <SectionHeading
          eyebrow="achievements"
          title="Milestones so far."
          description="Numbers that represent hours spent learning, building, and shipping."
        />

        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] ?? Rocket;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass-panel rounded-2xl p-6 text-center"
              >
                <Icon className="mx-auto mb-3 h-6 w-6 text-cyan-glow" />
                <div className="font-display text-3xl font-bold text-ink sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 chip-mono text-ink-faint">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <StaggerReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] ?? Trophy;
            return (
              <motion.div
                key={achievement.id}
                variants={staggerItemVariants}
                data-cursor="hover"
                className="group flex items-start gap-4 rounded-2xl border border-glass-border bg-glass-fill p-5 transition-all duration-300 hover:border-signal-amber/30 hover:bg-white/[0.05]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-void-200 text-signal-amber transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-semibold text-ink">
                      {achievement.title}
                    </h3>
                    {achievement.metric && (
                      <span className="chip-mono text-signal-green">
                        {achievement.metric}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {achievement.description}
                  </p>
                  <span className="mt-2 inline-block chip-mono text-ink-faint">
                    {achievement.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
