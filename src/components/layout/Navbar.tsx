"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
              scrolled
                ? "glass-panel-strong shadow-glass"
                : "border border-transparent bg-transparent"
            )}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink"
              data-cursor="hover"
              aria-label={`${siteConfig.name} — back to top`}
            >
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-glow/30 bg-cyan-glow/10 font-mono text-sm text-cyan-glow shadow-[0_0_0_2px_rgba(0,229,255,0.08)] transition-transform duration-300 group-hover:scale-110">
                {!avatarError ? (
                  <img
                    src="/images/profile.jpg"
                    alt=""
                    onError={() => setAvatarError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "R_"
                )}
              </span>
              <span className="hidden sm:inline">
                {siteConfig.name}
                <span className="text-cyan-glow">.</span>
              </span>
            </a>

            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  data-cursor="hover"
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-300",
                    activeSection === link.href
                      ? "text-cyan-glow"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-cyan-glow/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <MagneticButton
                as="a"
                href="/resume/Raghu-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="Download resume PDF"
                className="hidden items-center gap-2 rounded-full border border-glass-border bg-glass-fill px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors duration-300 hover:border-cyan-glow/40 hover:text-cyan-glow sm:inline-flex"
              >
                <Download size={14} />
                Resume
              </MagneticButton>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-fill text-ink lg:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                data-cursor="hover"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-2"
              aria-label="Mobile"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-6 py-4 font-display text-3xl font-semibold text-ink transition-colors hover:text-cyan-glow"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + navLinks.length * 0.06 }}
                href="/resume/Raghu-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 rounded-full border border-cyan-glow/40 px-6 py-3 font-mono text-sm uppercase tracking-wider text-cyan-glow"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
