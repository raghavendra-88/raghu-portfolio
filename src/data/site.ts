import { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Raghu",
  fullTitle: "Raghu — CSE Student & Cybersecurity-Minded Frontend Developer",
  role: "Computer Science & Engineering Student",
  roles: [
    "Cybersecurity Enthusiast",
    "Frontend Developer",
    "AI & Automation Learner",
    "Video Editor",
    "Motion Graphics Designer",
    "Digital Artist",
    "Creative Designer",
    "Tech Explorer",
  ],
  tagline:
    "Building secure systems and beautiful interfaces at the same desk.",
  mission:
    "To build innovative technology, secure digital systems, and beautiful user experiences — while continuously learning and creating.",
  description:
    "Portfolio of Raghu — a Computer Science & Engineering student specializing in cybersecurity, frontend development, and creative motion design. Building secure, elegant, and performant digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://raghu.dev",
  email: "hello@raghu.dev",
  location: "India",
  ogImage: "/images/og-image.jpg",
  keywords: [
    "Raghu",
    "Raghu Portfolio",
    "Cybersecurity Enthusiast",
    "Frontend Developer",
    "CSE Student",
    "React Developer",
    "Next.js Developer",
    "Motion Graphics Designer",
    "Ethical Hacking Student",
    "Creative Developer Portfolio",
  ],
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/raghu", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/raghu",
    icon: "linkedin",
  },
  { label: "Twitter / X", href: "https://x.com/raghu", icon: "twitter" },
  {
    label: "Instagram",
    href: "https://instagram.com/raghu",
    icon: "instagram",
  },
  { label: "Email", href: "mailto:hello@raghu.dev", icon: "mail" },
];
