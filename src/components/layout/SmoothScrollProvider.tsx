"use client";

import { useLenis } from "@/hooks/useLenis";

/**
 * Thin client-component wrapper that boots Lenis smooth scrolling for the
 * whole app. Kept separate from layout.tsx (a server component) since
 * hooks require the "use client" boundary.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  return <>{children}</>;
}
