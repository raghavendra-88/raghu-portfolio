import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const sections = [
    "",
    "#about",
    "#skills",
    "#tech-stack",
    "#experience",
    "#projects",
    "#certifications",
    "#services",
    "#achievements",
    "#gallery",
    "#blog",
    "#testimonials",
    "#contact",
  ];

  return sections.map((section) => ({
    url: `${baseUrl}/${section}`,
    lastModified: new Date(),
    changeFrequency: section === "" ? "weekly" : "monthly",
    priority: section === "" ? 1 : 0.7,
  }));
}
