"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-void px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-aurora-1" />
      <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-grid opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="mb-6 flex items-center justify-center gap-2 font-mono text-signal-red">
          <Terminal size={18} />
          <span className="chip-mono">error_404</span>
        </div>
        <h1 className="font-display text-8xl font-extrabold text-gradient-aurora sm:text-9xl">
          404
        </h1>
        <p className="mt-4 font-mono text-lg text-ink-muted">
          $ cd /requested-page
          <br />
          <span className="text-signal-red">
            bash: no such file or directory
          </span>
        </p>
        <p className="mx-auto mt-6 max-w-md text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist, or it moved
          somewhere I haven&apos;t indexed yet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-glow px-7 py-3.5 font-semibold text-void shadow-glow-cyan transition-transform hover:scale-105"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
