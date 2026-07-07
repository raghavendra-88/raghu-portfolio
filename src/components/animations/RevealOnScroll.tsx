"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
}

const getVariants = (direction: RevealOnScrollProps["direction"], distance: number): Variants => {
  const offsets: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...offsets[direction || "up"],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

/**
 * Generic scroll-triggered reveal wrapper built on Framer Motion's
 * viewport-based whileInView, used across every section for consistent,
 * performant entrance animations (GPU-friendly transform + opacity only).
 */
export default function RevealOnScroll({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 32,
  once = true,
  amount = 0.2,
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants(direction, distance)}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
