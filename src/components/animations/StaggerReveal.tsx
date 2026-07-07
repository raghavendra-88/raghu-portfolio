"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  amount?: number;
  once?: boolean;
}

export const staggerContainerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Wraps a list/grid of children so each one staggers in sequentially when
 * scrolled into view. Children should spread `staggerItemVariants` onto
 * their own motion.* wrapper (see ProjectCard, SkillBar, etc.).
 */
export default function StaggerReveal({
  children,
  className,
  staggerDelay = 0.08,
  amount = 0.15,
  once = true,
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainerVariants}
      custom={staggerDelay}
    >
      {children}
    </motion.div>
  );
}
