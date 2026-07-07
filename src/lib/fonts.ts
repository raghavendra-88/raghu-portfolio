import { Inter, JetBrains_Mono, Manrope } from "next/font/google";

/**
 * Display face: Manrope. A geometric, high-contrast grotesque that reads as
 * confident and modern without being a generic system font — used with
 * restraint for headlines only, per the design plan (distinctive display +
 * complementary body + a mono utility face for data/labels).
 */
export const fontDisplay = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Body face: Inter. Neutral, highly legible at small sizes, pairs cleanly
 * against Manrope's geometric display forms.
 */
export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Utility / mono face: JetBrains Mono. Used for code snippets, terminal
 * sequences, tags, stats and HUD-style labels — reinforcing the
 * cybersecurity/developer identity structurally rather than decoratively.
 */
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
