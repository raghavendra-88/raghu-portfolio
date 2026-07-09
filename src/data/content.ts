import { BlogPost, GalleryItem, Testimonial } from "@/types";

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Neon Grid — Cyberpunk Poster Series",
    category: "Poster Design",
    image: "/images/gallery/neon-grid.jpg",
    type: "digital-art",
  },
  {
    id: "gal-2",
    title: "Fest Reel — Motion Title Sequence",
    category: "Motion Graphics",
    image: "/images/gallery/fest-reel.jpg",
    type: "motion-graphics",
  },
  {
    id: "gal-3",
    title: "Terminal Dreams — Digital Illustration",
    category: "Digital Art",
    image: "/images/gallery/terminal-dreams.jpg",
    type: "digital-art",
  },
  {
    id: "gal-4",
    title: "Product Launch Recap Edit",
    category: "Video Editing",
    image: "/images/gallery/product-launch.jpg",
    type: "video-edit",
    video: "/videos/gallery/product-launch.mp4",
  },
  {
    id: "gal-5",
    title: "Aurora UI Concepts",
    category: "UI Design",
    image: "/images/gallery/aurora-ui.jpg",
    type: "design",
  },
  {
    id: "gal-6",
    title: "Glitch Portrait Series",
    category: "Digital Art",
    image: "/images/gallery/glitch-portrait.jpg",
    type: "digital-art",
  },
  {
    id: "gal-7",
    title: "Club Recruitment Reel",
    category: "Motion Graphics",
    image: "/images/gallery/club-recruitment.jpg",
    type: "motion-graphics",
  },
  {
    id: "gal-8",
    title: "Event Highlight Reel",
    category: "Video Editing",
    image: "/images/gallery/event-highlight.jpg",
    type: "video-edit",
    video: "/videos/gallery/event-highlight.mp4",
  },
];

export const galleryFilters = [
  { label: "All", value: "all" },
  { label: "Digital Art", value: "digital-art" },
  { label: "Motion Graphics", value: "motion-graphics" },
  { label: "Video Editing", value: "video-edit" },
  { label: "UI Design", value: "design" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "What Solving 50 CTF Challenges Taught Me About Real Security",
    slug: "ctf-lessons-real-security",
    excerpt:
      "Capture-the-flag challenges are puzzles, but the mindset they build — question every assumption, verify every input — turns out to be the whole job.",
    date: "Coming Soon",
    readTime: "6 min read",
    category: "Cybersecurity",
    image: "/images/gallery/blog-ctf.jpg",
    comingSoon: true,
  },
  {
    id: "blog-2",
    title: "Building a Scroll-Driven 3D Portfolio with React Three Fiber",
    slug: "scroll-driven-3d-portfolio",
    excerpt:
      "A breakdown of how this very site choreographs GSAP ScrollTrigger with a Three.js scene without dropping frames.",
    date: "Coming Soon",
    readTime: "9 min read",
    category: "Frontend",
    image: "/images/gallery/blog-r3f.jpg",
    comingSoon: true,
  },
  {
    id: "blog-3",
    title: "From Editor to Engineer: Why Motion Design Made Me a Better Developer",
    slug: "motion-design-better-developer",
    excerpt:
      "Timing, easing, and pacing aren't just video-editing concepts — they're the same instincts that make an interface feel alive.",
    date: "Coming Soon",
    readTime: "5 min read",
    category: "Career",
    image: "/images/gallery/blog-motion.jpg",
    comingSoon: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Ananya Sharma",
    role: "Club President",
    company: "Campus Coding Club",
    avatar: "/images/gallery/avatar-ananya.jpg",
    quote:
      "Raghu redesigned our club's entire web presence and mentored three juniors through their first React projects, all while balancing coursework. Rare combination of technical depth and patience.",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Vikram Rao",
    role: "Content Creator",
    company: "Independent YouTube Channel",
    avatar: "/images/gallery/avatar-vikram.jpg",
    quote:
      "The motion graphics work completely changed how our videos feel. Every title card and transition felt intentional, not templated. Turnaround was always faster than I expected.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Dr. Priya Menon",
    role: "Assistant Professor, CSE",
    company: "University Department",
    avatar: "/images/gallery/avatar-priya.jpg",
    quote:
      "One of the more security-curious students I've mentored — genuinely digs into how systems fail instead of memorizing checklists. That instinct shows in the quality of his project work.",
    rating: 5,
  },
  {
    id: "test-4",
    name: "Karthik Iyer",
    role: "Founder",
    company: "Early-stage Student Startup",
    avatar: "/images/gallery/avatar-karthik.jpg",
    quote:
      "We needed a landing page that didn't look like every other startup template. Raghu delivered something with actual personality, on time, and it still runs a 95+ Lighthouse score.",
    rating: 5,
  },
];
