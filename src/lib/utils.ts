import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts (e.g. "p-2 p-4" -> "p-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Clamp a number between a min and max value.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values.
 */
export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

/**
 * Map a value from one numeric range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Simple debounce utility for expensive handlers (e.g. resize listeners).
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Format a number with locale-aware thousands separators.
 */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Returns true when running in a browser environment.
 */
export function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * Detects whether the user has requested reduced motion at the OS level.
 */
export function prefersReducedMotion() {
  if (!isBrowser()) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Detects coarse pointer / touch-primary devices, used to disable
 * cursor-follow and other pointer-only effects.
 */
export function isTouchDevice() {
  if (!isBrowser()) return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Basic slugify helper for generating anchor-safe ids from labels.
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
