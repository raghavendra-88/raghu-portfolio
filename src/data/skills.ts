import { Skill, TechStackItem } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", level: 30, category: "languages" },
  { name: "TypeScript", level: 30, category: "languages" },
  { name: "Python", level: 50, category: "languages" },
  { name: "C++", level: 20, category: "languages" },
  { name: "Java", level: 30, category: "languages" },
  { name: "SQL", level: 10, category: "languages" },

  // Frontend
  { name: "HTML", level: 96, category: "frontend" },
  { name: "CSS", level: 93, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 87, category: "frontend" },
  { name: "Tailwind CSS", level: 50, category: "frontend" },

  // Backend
  { name: "Node.js", level: 50, category: "backend" },

  // Security & Networking
  { name: "Cybersecurity", level: 84, category: "security" },
  { name: "Networking", level: 80, category: "security" },

  // Tools
  { name: "Git", level: 90, category: "tools" },
  { name: "GitHub", level: 91, category: "tools" },
  { name: "Linux", level: 86, category: "tools" },
  { name: "AI Tools", level: 89, category: "tools" },
];

export const skillCategoryLabels: Record<string, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  security: "Security & Networking",
  tools: "Tools & Platforms",
};

export const techStack: TechStackItem[] = [
  { name: "React", icon: "SiReact", color: "#61DAFB" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#5FA04E" },
  { name: "Python", icon: "SiPython", color: "#3776AB" },
  { name: "C++", icon: "SiCplusplus", color: "#00599C" },
  { name: "Linux", icon: "SiLinux", color: "#FCC624" },
  { name: "Git", icon: "SiGit", color: "#F05032" },
  { name: "GitHub", icon: "SiGithub", color: "#FFFFFF" },
  { name: "MySQL", icon: "SiMysql", color: "#4479A1" },
  { name: "Figma", icon: "SiFigma", color: "#F24E1E" },
  { name: "Adobe Premiere", icon: "SiAdobepremierepro", color: "#9999FF" },
  { name: "Adobe After Effects", icon: "SiAdobeaftereffects", color: "#9999FF" },
  { name: "Framer Motion", icon: "SiFramer", color: "#0055FF" },
  { name: "Wireshark", icon: "SiWireshark", color: "#1679A7" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED" },
];
