"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainerVariants, staggerItemVariants } from "@/components/animations/StaggerReveal";
import { galleryItems, galleryFilters } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<
    (typeof galleryItems)[number] | null
  >(null);
  const [errorMap, setErrorMap] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return galleryItems;
    return galleryItems.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <section id="gallery" className="section-shell relative" aria-label="Creative gallery">
      <div className="container">
        <SectionHeading
          eyebrow="gallery"
          title="Beyond the code editor."
          description="Digital art, motion graphics, and video work from the creative side of the desk."
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {galleryFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              data-cursor="hover"
              className={cn(
                "relative rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors duration-300",
                activeFilter === f.value
                  ? "text-void"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {activeFilter === f.value && (
                <motion.span
                  layoutId="gallery-tab-active"
                  className="absolute inset-0 rounded-full bg-violet-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          custom={0.06}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.button
                key={item.id}
                variants={staggerItemVariants}
                layout
                type="button"
                onClick={() => setLightboxItem(item)}
                data-cursor="hover"
                className={cn(
                  "group relative overflow-hidden rounded-xl bg-void-300",
                  i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                )}
              >
                {!errorMap[item.id] ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={() =>
                      setErrorMap((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-void-300 to-void-200">
                    <span className="font-display text-lg font-bold text-ink-faint/40">
                      {item.title.slice(0, 2)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-void-100/95 via-void-100/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="chip-mono text-cyan-soft">
                    {item.category}
                  </span>
                  <span className="text-left text-xs font-medium text-ink">
                    {item.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-void/95 p-6 backdrop-blur-xl"
            onClick={() => setLightboxItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-glass-fill text-ink"
              aria-label="Close lightbox"
              data-cursor="hover"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-3xl overflow-hidden rounded-2xl border border-glass-border"
            >
              {!errorMap[lightboxItem.id] ? (
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="max-h-[80vh] w-full object-contain"
                />
              ) : (
                <div className="flex h-96 w-96 items-center justify-center bg-void-200">
                  <span className="font-display text-3xl font-bold text-ink-faint/40">
                    {lightboxItem.title.slice(0, 2)}
                  </span>
                </div>
              )}
              <div className="glass-panel-strong p-4">
                <p className="font-display font-semibold text-ink">
                  {lightboxItem.title}
                </p>
                <p className="chip-mono mt-1 text-cyan-soft">
                  {lightboxItem.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
