import { Achievement, Certification, Service, StatItem } from "@/types";

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart Global Tech",
    date: "2026",
    credentialUrl: "https://www.theforage.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_6a4f22e31940c5c3e7d42688_1783573518536_completion_certificate.pdf",
    image: "/images/certifications/google-cyber.jpg",
    skills: ["Data Structures", "Python Programming", "Software architecture", "SQL"],
  },
  {
    id: "cert-2",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/verify/example2",
    image: "/images/certifications/meta-frontend.jpg",
    skills: ["React", "JavaScript", "UI/UX Principles", "Version Control"],
  },
  {
    id: "cert-3",
    title: "Certified in Cybersecurity (CC)",
    issuer: "ISC2",
    date: "2025",
    credentialUrl: "https://isc2.org/verify/example3",
    image: "/images/certifications/isc2-cc.jpg",
    skills: ["Security Principles", "Access Control", "Network Security"],
  },
  {
    id: "cert-4",
    title: "Practical Ethical Hacking",
    issuer: "TCM Security Academy",
    date: "2024",
    credentialUrl: "https://academy.tcm-sec.com/verify/example4",
    image: "/images/certifications/tcm-hacking.jpg",
    skills: ["Penetration Testing", "Active Directory", "Linux", "Nmap"],
  },
  {
    id: "cert-5",
    title: "Python for Everybody Specialization",
    issuer: "University of Michigan / Coursera",
    date: "2023",
    credentialUrl: "https://coursera.org/verify/example5",
    image: "/images/certifications/python-everybody.jpg",
    skills: ["Python", "Data Structures", "APIs", "Databases"],
  },
  {
    id: "cert-6",
    title: "Zscaler-Fundementals of cybersecurity",
    issuer: "Zscaler",
    date: "2024",
    credentialUrl: " https://verify.skilljar.com/c/bgjhkfsrzt79",
    image: "/images/certifications/adobe-motion.jpg",
    skills: ["basics of cybersecurity"],
  },
];

export const services: Service[] = [
  {
    id: "service-1",
    title: "Frontend Engineering",
    description:
      "Responsive, accessible, high-performance web interfaces built with React, Next.js and modern CSS.",
    icon: "Code2",
    features: [
      "Component-driven architecture",
      "Pixel-perfect responsive design",
      "Core Web Vitals optimization",
      "Animation & micro-interactions",
    ],
  },
  {
    id: "service-2",
    title: "Security Consulting (Student Level)",
    description:
      "Basic security audits, vulnerability awareness reviews, and secure-coding guidance for small projects and student teams.",
    icon: "ShieldCheck",
    features: [
      "OWASP Top 10 review",
      "Secure authentication design",
      "Network configuration review",
      "Security awareness workshops",
    ],
  },
  {
    id: "service-3",
    title: "Motion Graphics & Video Editing",
    description:
      "Short-form and long-form video editing with custom motion graphics, transitions, and sound design.",
    icon: "Clapperboard",
    features: [
      "Reels & short-form editing",
      "Custom animated titles",
      "Colour grading",
      "Sound design & mixing",
    ],
  },
  {
    id: "service-4",
    title: "Brand & Digital Design",
    description:
      "Visual identity, posters, and digital art for events, communities and early-stage products.",
    icon: "Palette",
    features: [
      "Poster & social media design",
      "Digital illustration",
      "Basic brand identity kits",
      "UI mockups & prototypes",
    ],
  },
  {
    id: "service-5",
    title: "AI-Assisted Automation",
    description:
      "Scripting and small tools that use AI APIs to automate repetitive creative and development workflows.",
    icon: "Sparkles",
    features: [
      "Workflow automation scripts",
      "AI API integration",
      "Content generation pipelines",
      "Prompt engineering",
    ],
  },
  {
    id: "service-6",
    title: "Technical Mentorship",
    description:
      "Peer mentorship for fellow students getting started with web development or cybersecurity fundamentals.",
    icon: "GraduationCap",
    features: [
      "1:1 code walkthroughs",
      "CTF challenge guidance",
      "Portfolio & resume review",
      "Interview preparation",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "50+ CTF Challenges Solved",
    description:
      "Solved challenges spanning web exploitation, cryptography, forensics and reverse engineering.",
    date: "2024–2025",
    icon: "Flag",
    metric: "50+",
  },
  {
    id: "ach-2",
    title: "Campus Coding Club Core Member",
    description:
      "Active core member organizing workshops on secure coding and modern web development.",
    date: "2024",
    icon: "Users",
  },
  {
    id: "ach-3",
    title: "6+ Production Web Projects Shipped",
    description:
      "Designed and deployed real-world web applications for freelance and personal use.",
    date: "2023–2025",
    icon: "Rocket",
    metric: "6+",
  },
  {
    id: "ach-4",
    title: "40+ Videos Edited & Delivered",
    description:
      "Produced motion graphics and edited video content for creators and student organizations.",
    date: "2022–2025",
    icon: "Video",
    metric: "40+",
  },
  {
    id: "ach-5",
    title: "Hackathon Finalist",
    description:
      "Reached the finals of a regional collegiate hackathon with a network-security monitoring tool.",
    date: "2025",
    icon: "Trophy",
  },
  {
    id: "ach-6",
    title: "5+ Certifications Earned",
    description:
      "Completed professional certifications spanning cybersecurity, frontend development and design.",
    date: "2023–2025",
    icon: "Award",
    metric: "5+",
  },
];

export const stats: StatItem[] = [
  { label: "Projects Shipped", value: 15, suffix: "+", icon: "Rocket" },
  { label: "CTF Challenges Solved", value: 50, suffix: "+", icon: "Flag" },
  { label: "Videos Edited", value: 40, suffix: "+", icon: "Video" },
  { label: "Certifications", value: 5, suffix: "+", icon: "Award" },
];
