"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

/**
 * Custom dual-ring cursor: a tight dot that tracks the pointer exactly, and
 * a looser outer ring that trails behind with spring physics. Both scale up
 * and change color when hovering interactive elements (anything with
 * [data-cursor="hover"] or a native button/link).
 *
 * Automatically disables itself on touch/coarse-pointer devices and when
 * the user has requested reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 250, damping: 25, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 250, damping: 25, mass: 0.5 });

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    function handleMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    }

    function handleLeave() {
      setIsVisible(false);
    }

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [data-cursor="hover"], input, textarea, select'
      );
      setIsHovering(Boolean(interactive));
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95] hidden md:block"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* Inner dot — exact tracking */}
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-cyan-glow"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer ring — spring-trailed */}
      <motion.div
        className="fixed left-0 top-0 rounded-full border transition-[width,height,border-color,background-color] duration-200"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          borderColor: isHovering
            ? "rgba(176, 38, 255, 0.7)"
            : "rgba(0, 229, 255, 0.5)",
          backgroundColor: isHovering
            ? "rgba(176, 38, 255, 0.08)"
            : "transparent",
        }}
      />
    </div>
  );
}
