"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Terminal } from "lucide-react";
import { siteConfig } from "@/data/site";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const ROLE_TYPE_SPEED = 55;
const ROLE_PAUSE = 1400;
const ROLE_DELETE_SPEED = 28;

/**
 * Typewriter cycling through siteConfig.roles — reinforces the
 * "many disciplines, one person" thesis stated in the brief.
 */
function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === currentWord) {
      timeout = setTimeout(() => setDeleting(true), ROLE_PAUSE);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? currentWord.slice(0, prev.length - 1)
              : currentWord.slice(0, prev.length + 1)
          );
        },
        deleting ? ROLE_DELETE_SPEED : ROLE_TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export default function Hero() {
  const typedRole = useTypewriter(siteConfig.roles);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
      aria-label="Introduction"
    >
      {/* Aurora background layers */}
      <div className="pointer-events-none absolute inset-0 bg-aurora-1" />
      <div className="pointer-events-none absolute inset-0 bg-aurora-2" />
      <div className="pointer-events-none absolute inset-0 bg-aurora-3" />
      <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-grid opacity-30" />

      {/* 3D floating object — hidden from AT, purely decorative */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block lg:w-[55%]" aria-hidden="true">
        <HeroScene />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-fill px-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-green" />
              </span>
              <span className="chip-mono text-ink-muted">
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl"
            >
              Hey, I&apos;m{" "}
              <span className="text-gradient-aurora">Raghu</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-5 flex h-8 items-center font-mono text-lg text-cyan-soft sm:text-xl"
            >
              <Terminal size={18} className="mr-2 shrink-0 text-signal-green" />
              <span aria-hidden="true">&gt;</span>
              <span className="ml-2">{typedRole}</span>
              <span className="ml-0.5 h-5 w-[2px] animate-blink bg-cyan-glow" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted"
            >
              {siteConfig.mission}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.46 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                as="a"
                href="#projects"
                ariaLabel="View my projects"
                className="group relative overflow-hidden rounded-full bg-cyan-glow px-7 py-3.5 font-semibold text-void shadow-glow-cyan transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(0,229,255,0.4)]"
              >
                <span className="relative z-10">View My Work</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                ariaLabel="Get in touch"
                className="rounded-full border border-glass-border bg-glass-fill px-7 py-3.5 font-semibold text-ink transition-colors duration-300 hover:border-violet-glow/50 hover:text-violet-soft"
              >
                Let&apos;s Talk
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 flex items-center gap-2 font-mono text-xs text-ink-faint"
            >
              <MapPin size={14} />
              Based in {siteConfig.location} · Open to remote work
            </motion.div>
          </div>

          {/* HUD status panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="glass-panel glow-border relative mx-auto max-w-sm rounded-2xl p-6 shadow-glass">
              <div className="mb-4 flex items-center justify-between border-b border-glass-border pb-4">
                <span className="chip-mono text-signal-green">
                  system_status
                </span>
                <span className="flex h-2 w-2 rounded-full bg-signal-green shadow-glow-green" />
              </div>
              <dl className="space-y-3 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-faint">role</dt>
                  <dd className="text-ink">CSE Student</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-faint">focus</dt>
                  <dd className="text-cyan-soft">Security + Frontend</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-faint">stack</dt>
                  <dd className="text-ink">React / Next.js / Python</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-faint">status</dt>
                  <dd className="text-signal-green">Online</dd>
                </div>
              </dl>
              <div className="mt-5 h-px w-full bg-glass-border" />
              <p className="mt-4 font-mono text-xs leading-relaxed text-ink-faint">
                <span className="text-violet-soft">$</span> whoami --verbose
                <br />
                CSE student building secure systems and cinematic interfaces.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-cyan-glow"
      >
        <span className="chip-mono">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
