"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "initializing secure_session...",
  "loading kernel modules [ui, motion, render]...",
  "mounting /dev/portfolio...",
  "verifying integrity... OK",
  "decrypting profile: raghu.dev",
];

/**
 * Signature loading sequence: simulates booting into a secured terminal
 * before revealing the portfolio. This is the site's one big aesthetic
 * risk — ties the cybersecurity identity directly into the first
 * interaction, not just the color palette.
 */
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true);
      const t = setTimeout(onComplete, 300);
      return () => clearTimeout(t);
    }

    const lineInterval = setInterval(() => {
      setLineIndex((prev) => {
        if (prev >= BOOT_LINES.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 320);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18 + 6;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 180);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  useEffect(() => {
    if (progress >= 100 && !done) {
      const t = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(t);
    }
  }, [progress, done]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 700);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void px-6"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 bg-grid-overlay bg-grid opacity-40" />
          <div className="scanline absolute inset-0 opacity-30" />

          <div className="relative w-full max-w-md font-mono text-sm">
            <div className="mb-6 flex items-center gap-2 text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-signal-red" />
              <span className="h-2 w-2 rounded-full bg-signal-amber" />
              <span className="h-2 w-2 rounded-full bg-signal-green" />
              <span className="ml-2 chip-mono">secure_boot.sh</span>
            </div>

            <div className="space-y-1.5 text-ink-muted">
              {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-signal-green">$</span> {line}
                  {i === lineIndex && (
                    <span className="loader-cursor text-cyan-glow" />
                  )}
                </motion.p>
              ))}
            </div>

            <div className="mt-8">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="chip-mono text-ink-faint">
                  loading assets
                </span>
                <span className="font-mono text-xs text-cyan-soft">
                  {Math.min(100, Math.round(progress))}%
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-void-300">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-glow via-violet-glow to-signal-green"
                  style={{ width: `${Math.min(100, progress)}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            <motion.h1
              className="mt-10 text-center font-display text-3xl font-bold tracking-tight text-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 60 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              RAGHU<span className="text-cyan-glow">_</span>
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
