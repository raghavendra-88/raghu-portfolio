import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        void: {
          DEFAULT: "#05070D",
          100: "#080B14",
          200: "#0B1120",
          300: "#0F1629",
          400: "#141C33",
        },
        cyan: {
          glow: "#00E5FF",
          soft: "#5CF4FF",
          dim: "#0891A3",
        },
        violet: {
          glow: "#B026FF",
          soft: "#C968FF",
          dim: "#6B1799",
        },
        signal: {
          green: "#39FF88",
          amber: "#FFB627",
          red: "#FF3860",
        },
        ink: {
          DEFAULT: "#E8EDF5",
          muted: "#8B96AB",
          faint: "#5A6478",
        },
        glass: {
          border: "rgba(232, 237, 245, 0.08)",
          fill: "rgba(255, 255, 255, 0.03)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "aurora-1":
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(0,229,255,0.15), transparent 60%)",
        "aurora-2":
          "radial-gradient(ellipse 80% 50% at 80% 20%, rgba(176,38,255,0.15), transparent 60%)",
        "aurora-3":
          "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(57,255,136,0.08), transparent 60%)",
        "grid-pattern":
          "linear-gradient(rgba(232,237,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,237,245,0.04) 1px, transparent 1px)",
        "noise": "url('/images/noise.png')",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        "glow-cyan": "0 0 40px rgba(0, 229, 255, 0.25)",
        "glow-violet": "0 0 40px rgba(176, 38, 255, 0.25)",
        "glow-green": "0 0 30px rgba(57, 255, 136, 0.2)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "neu-in": "inset 4px 4px 8px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(255,255,255,0.02)",
        "neu-out": "8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.02)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out infinite 1s",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.3)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
