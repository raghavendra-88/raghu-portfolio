"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  const current = testimonials[index];

  function goTo(direction: 1 | -1) {
    setIndex((prev) => (prev + direction + testimonials.length) % testimonials.length);
  }

  return (
    <section
      id="testimonials"
      className="section-shell relative"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <SectionHeading
          eyebrow="testimonials"
          title="What people say."
          align="center"
        />

        <div className="relative mx-auto max-w-2xl">
          <Quote className="mx-auto mb-6 h-10 w-10 text-cyan-glow/30" />

          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel rounded-2xl p-8 text-center sm:p-10"
              >
                <div className="mb-4 flex justify-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-signal-amber text-signal-amber"
                    />
                  ))}
                </div>
                <p className="text-balance text-lg leading-relaxed text-ink">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-glass-border bg-void-200">
                    {!imgError[index] ? (
                      <img
                        src={current.avatar}
                        alt=""
                        loading="lazy"
                        onError={() =>
                          setImgError((prev) => ({ ...prev, [index]: true }))
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={18} className="text-ink-faint" />
                    )}
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-ink">{current.name}</p>
                    <p className="chip-mono text-ink-faint">
                      {current.role} · {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous testimonial"
              data-cursor="hover"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-fill text-ink transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  data-cursor="hover"
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-cyan-glow" : "w-1.5 bg-glass-border"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next testimonial"
              data-cursor="hover"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-fill text-ink transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
