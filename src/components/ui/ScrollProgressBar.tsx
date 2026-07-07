"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fixed progress bar reflecting overall page scroll position. Uses
 * Framer Motion's useScroll + useSpring for a buttery, physically-damped
 * fill rather than a linear one-to-one mapping.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-cyan-glow via-violet-glow to-signal-green"
      style={{ scaleX }}
    />
  );
}
