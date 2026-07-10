import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Be-Zone",
    slug: "website for Beauty parlour",
    description:
      "BE-ZONE is a modern beauty salon eCommerce website that allows customers to explore beauty services, shop premium skincare and cosmetic products, book appointments online, and enjoy a seamless digital beauty experience.",
    longDescription:
      "capy backend for pacludes a rule engine for detecting port scans, ARP spoofing patterns, and unusual data-exfiltration volumes.",
    category: ["security", "web"],
    image: "/images/projects/ciphernet.jpg",
    tech: ["Python", "React", "D3.js", "Scapy", "WebSockets"],
    liveUrl: "https://be-zone.lovable.app",
    githubUrl: "https://github.com/raghavendradmprassu2005-bot/be-zone.git",
    featured: true,
    year: "2025",
    status: "completed",
  },
  {
    id: "proj-2",
    title: "AuraFolio — 3D Interactive Portfolio Engine",
    slug: "aurafolio-3d-engine",
    description:
      "A reusable, themeable portfolio framework with Three.js 3D scenes, GSAP scroll choreography, and a headless CMS content layer.",
    longDescription:
      "AuraFolio is the engine behind this very site — abstracted into a reusable template so other developers can spin up cinematic portfolios quickly. It ships with a scene-graph abstraction over React Three Fiber, a scroll-timeline system built on GSAP's ScrollTrigger, and typed content schemas so all copy and project data can be swapped without touching component code.",
    category: ["web", "design"],
    image: "/images/projects/aurafolio.jpg",
    tech: ["Next.js", "TypeScript", "Three.js", "GSAP", "Tailwind CSS"],
    liveUrl: "https://aurafolio-demo.vercel.app",
    githubUrl: "https://github.com/raghu/aurafolio",
    featured: true,
    year: "2025",
    status: "completed",
  },
  {
    id: "proj-3",
    title: "SentinelAuth — Adaptive Login Guard",
    slug: "sentinelauth-adaptive-login",
    description:
      "An authentication middleware that layers device fingerprinting, rate-limiting, and anomaly scoring on top of standard JWT auth.",
    longDescription:
      "SentinelAuth wraps a standard Node.js/JWT auth flow with an adaptive risk layer: it fingerprints devices, tracks login velocity per account, and escalates to step-up verification (email OTP) when a login looks anomalous — new geography, new device, or unusual time-of-day. Designed as a drop-in middleware for Express apps that need stronger auth without a full identity-provider migration.",
    category: ["security", "systems"],
    image: "/images/projects/sentinelauth.jpg",
    tech: ["Node.js", "Express", "JWT", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com/raghu/sentinelauth",
    featured: true,
    year: "2024",
    status: "completed",
  },
  {
    id: "proj-4",
    title: "PixelForge — AI Motion Graphics Toolkit",
    slug: "pixelforge-ai-motion",
    description:
      "A batch tool that uses AI upscaling and auto-captioning to speed up short-form video editing workflows for creators.",
    longDescription:
      "PixelForge automates the repetitive parts of short-form video production: AI-generated captions synced to speech, auto-reframing for vertical formats, and batch upscaling for low-resolution source clips. Built after editing 40+ videos manually and wanting to reclaim the hours spent on caption timing and reformatting.",
    category: ["ai", "design"],
    image: "/images/projects/pixelforge.jpg",
    tech: ["Python", "FFmpeg", "OpenAI Whisper", "React"],
    githubUrl: "https://github.com/raghu/pixelforge",
    featured: false,
    year: "2024",
    status: "completed",
  },
  {
    id: "proj-5",
    title: "TerminalOS — Portfolio-as-a-Shell",
    slug: "terminalos-shell-portfolio",
    description:
      "An earlier portfolio experiment that simulates a Linux terminal in the browser, letting visitors 'cd' and 'cat' through my work.",
    longDescription:
      "TerminalOS reimagines a resume site as a bootable shell: visitors type real commands (ls, cat, whoami, ./run project.sh) to explore projects and skills. Includes a custom command parser, fake filesystem, and CRT-monitor visual effects — a fun way to make cybersecurity identity part of the UX itself, not just the color palette.",
    category: ["web", "design"],
    image: "/images/projects/terminalos.jpg",
    tech: ["JavaScript", "CSS", "Node.js"],
    liveUrl: "https://terminalos-demo.vercel.app",
    githubUrl: "https://github.com/raghu/terminalos",
    featured: false,
    year: "2023",
    status: "completed",
  },
  {
    id: "proj-6",
    title: "VaultKey — Local-First Password Manager",
    slug: "vaultkey-password-manager",
    description:
      "A local-first password manager with AES-256 encryption, zero server-side storage, and a minimal cyberpunk-styled UI.",
    longDescription:
      "VaultKey stores encrypted credential vaults entirely on-device, using AES-256-GCM with a key derived from a master password via PBKDF2. No vault data ever touches a server. Built primarily as a deep-dive into applied cryptography — key derivation, authenticated encryption, and secure memory handling in a browser context.",
    category: ["security"],
    image: "/images/projects/vaultkey.jpg",
    tech: ["TypeScript", "Web Crypto API", "React", "IndexedDB"],
    githubUrl: "https://github.com/raghu/vaultkey",
    featured: false,
    year: "2024",
    status: "in-progress",
  },
];

export const projectCategories: { label: string; value: Project["category"][number] | "all" }[] = [
  { label: "All Work", value: "all" },
  { label: "Web", value: "web" },
  { label: "Security", value: "security" },
  { label: "AI & Automation", value: "ai" },
  { label: "Design", value: "design" },
  { label: "Systems", value: "systems" },
];
