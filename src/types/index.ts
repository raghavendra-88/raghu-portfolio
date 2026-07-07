export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "security"
  | "tools";

export interface TechStackItem {
  name: string;
  icon: string;
  color: string;
}

export interface TimelineItem {
  id: string;
  type: "experience" | "education";
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export type ProjectCategory =
  | "all"
  | "web"
  | "security"
  | "ai"
  | "design"
  | "systems";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: ProjectCategory[];
  image: string;
  gallery?: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  status: "completed" | "in-progress" | "concept";
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image: string;
  skills: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  metric?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  type: "design" | "video-edit" | "motion-graphics" | "digital-art";
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  comingSoon?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
}
