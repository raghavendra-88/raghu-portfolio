"use client";

import { useEffect, useRef } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

/**
 * Renders a soft radial glow that follows the cursor within its parent
 * container (parent must be position: relative). Uses direct style
 * mutation via ref instead of React state to avoid re-renders on every
 * pixel of mouse movement — critical for keeping 60fps.
 */
export default function MouseGlow({
  color = "rgba(0, 229, 255, 0.12)",
  size = 500,
}: {
  color?: string;
  size?: number;
}) {
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    const glow = glowRef.current;
    const container = containerRef.current?.parentElement;
    if (!glow || !container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    function handleMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    }

    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (glow) {
        glow.style.transform = `translate(${currentX - size / 2}px, ${
          currentY - size / 2
        }px)`;
      }
      rafId = requestAnimationFrame(animate);
    }

    container.addEventListener("mousemove", handleMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [size]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
