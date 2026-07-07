"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  as?: "button" | "a";
  strength?: number;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

/**
 * Wraps its children in a magnetic hover effect: the element subtly moves
 * toward the cursor within a bounded radius, then springs back on leave.
 * Works for both <button> and <a> semantics via the `as` prop, so buttons
 * remain buttons and links remain links for accessibility and SEO.
 */
export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  target,
  rel,
  as = "button",
  strength = 0.35,
  ariaLabel,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: relX * strength, y: relY * strength });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      data-cursor="hover"
      className="inline-block"
    >
      <motion.span
        animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
        className={cn("inline-flex items-center justify-center", className)}
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (as === "a" && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className="inline-block disabled:cursor-not-allowed disabled:opacity-60"
    >
      {content}
    </button>
  );
}
