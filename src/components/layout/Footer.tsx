"use client";

import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUp } from "lucide-react";
import { navLinks, siteConfig, socialLinks } from "@/data/site";
import MagneticButton from "@/components/ui/MagneticButton";

const socialIconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

export default function Footer() {
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-glass-border bg-void-100/60">
      <div className="pointer-events-none absolute inset-0 bg-aurora-2 opacity-30" />
      <div className="container relative py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#hero"
              className="flex items-center gap-2 font-display text-xl font-bold text-ink"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-glow/30 bg-cyan-glow/10 font-mono text-sm text-cyan-glow">
                R_
              </span>
              {siteConfig.name}
              <span className="text-cyan-glow">.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon] ?? Mail;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.icon !== "mail" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    data-cursor="hover"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/40 hover:text-cyan-glow"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-7">
            <h3 className="chip-mono mb-4 text-ink-faint">Navigation</h3>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-cyan-glow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="chip-mono mb-4 text-ink-faint">Back to top</h3>
            <MagneticButton
              onClick={scrollToTop}
              ariaLabel="Scroll back to top"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-glass-border bg-glass-fill text-ink transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
            >
              <ArrowUp size={18} />
            </MagneticButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 font-mono text-xs text-ink-faint sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
            Built with Next.js, TypeScript & a lot of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
