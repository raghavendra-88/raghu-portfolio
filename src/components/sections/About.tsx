"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Code2,
  Sparkles,
  Clapperboard,
  Palette,
  Radar,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import StaggerReveal, {
  staggerItemVariants,
} from "@/components/animations/StaggerReveal";
import { siteConfig } from "@/data/site";

const pillars = [
  {
    icon: ShieldCheck,
    label: "Cybersecurity",
    detail: "Thinking like an attacker to build like a defender.",
    color: "text-signal-green",
    border: "hover:border-signal-green/40",
  },
  {
    icon: Code2,
    label: "Frontend Engineering",
    detail: "Interfaces that feel as good as they look.",
    color: "text-cyan-glow",
    border: "hover:border-cyan-glow/40",
  },
  {
    icon: Sparkles,
    label: "AI & Automation",
    detail: "Using AI as a force-multiplier, not a crutch.",
    color: "text-violet-glow",
    border: "hover:border-violet-glow/40",
  },
  {
    icon: Clapperboard,
    label: "Motion & Video",
    detail: "Timing and pacing borrowed from the edit bay.",
    color: "text-cyan-soft",
    border: "hover:border-cyan-soft/40",
  },
  {
    icon: Palette,
    label: "Digital Art",
    detail: "Visual instincts sharpened outside the IDE.",
    color: "text-violet-soft",
    border: "hover:border-violet-soft/40",
  },
  {
    icon: Radar,
    label: "Tech Exploration",
    detail: "Perpetually curious about what's next.",
    color: "text-signal-amber",
    border: "hover:border-signal-amber/40",
  },
];

export default function About() {
  return (
    <section id="about" className="section-shell relative" aria-label="About me">
      <div className="container">
        <SectionHeading
          eyebrow="about_me"
          title="Passionate Computer Science Engineer"
          description="I move between securing systems and designing them — and I've found the overlap between the two is where the most interesting work lives."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <RevealOnScroll className="lg:col-span-5" direction="right">
            <div className="glass-panel relative overflow-hidden rounded-2xl p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-glow/10 blur-3xl" />
              <p className="relative text-lg leading-relaxed text-ink">
                I&apos;m a Computer Science & Engineering student who got
                hooked on cybersecurity through curiosity about how things
                break — and stayed for the discipline it takes to build
                things that don&apos;t.
              </p>
              <p className="relative mt-5 leading-relaxed text-ink-muted">
                Outside of coursework and CTF challenges, I design and edit
                — motion graphics, digital art, interfaces — because
                understanding how things{" "}
                <em className="not-italic text-cyan-soft">feel</em> makes me
                better at building how they{" "}
                <em className="not-italic text-violet-soft">work</em>.
              </p>
              <div className="relative mt-7 rounded-xl border border-glass-border bg-void-200/60 p-4 font-mono text-sm">
                <span className="text-signal-green">const</span>{" "}
                <span className="text-cyan-soft">mission</span> ={" "}
                <span className="text-ink-muted">{"{"}</span>
                <br />
                <span className="pl-4 text-ink-muted">
                  &quot;{siteConfig.mission}&quot;
                </span>
                <br />
                <span className="text-ink-muted">{"}"}</span>
              </div>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-7">
            <StaggerReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  variants={staggerItemVariants}
                  data-cursor="hover"
                  className={`group glass-panel rounded-xl border border-transparent p-5 transition-all duration-300 hover:-translate-y-1 ${pillar.border}`}
                >
                  <pillar.icon
                    className={`mb-3 h-6 w-6 ${pillar.color} transition-transform duration-300 group-hover:scale-110`}
                  />
                  <h3 className="font-display text-base font-semibold text-ink">
                    {pillar.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {pillar.detail}
                  </p>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
