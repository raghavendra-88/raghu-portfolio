"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Initializes Lenis smooth scrolling and syncs it with requestAnimationFrame.
 * Also exposes the Lenis instance on window so GSAP ScrollTrigger (or any
 * other consumer) can hook into its "scroll" event for perfectly synced
 * scroll-driven animations.
 *
 * Respects prefers-reduced-motion by skipping smoothing entirely.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    // Expose for other systems (GSAP ScrollTrigger integration).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  return lenisRef;
}
