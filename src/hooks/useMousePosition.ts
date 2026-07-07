"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks raw viewport mouse coordinates. Used to drive the custom cursor
 * and any mouse-follow glow effects. Returns null until the first mouse
 * move so consumers can avoid a jarring jump from (0,0).
 */
export function useMousePosition(): MousePosition | null {
  const [position, setPosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}
