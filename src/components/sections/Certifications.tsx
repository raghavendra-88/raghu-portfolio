"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerReveal, {
  staggerItemVariants,
} from "@/components/animations/StaggerReveal";
import { certifications, eduSkillsCertificates } from "@/data/credentials";

function CertCard({ cert }: { cert: (typeof certifications)[number] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={staggerItemVariants}
      className="group glass-panel relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal-green/30"
      data-cursor="hover"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-glass-border bg-void-200">
          {!imgError ? (
            <img
              src={cert.image}
              alt=""
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <ShieldCheck className="h-6 w-6 text-signal-green" />
          )}
        </span>
        <span className="chip-mono text-ink-faint">{cert.date}</span>
      </div>

      <h3 className="font-display text-base font-semibold leading-snug text-ink">
        {cert.title}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">{cert.issuer}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="chip-mono rounded-md border border-glass-border px-2 py-1 text-ink-faint"
          >
            {skill}
          </span>
        ))}
      </div>

      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-glow transition-colors hover:text-cyan-soft"
        >
          Verify Credential
          <ExternalLink size={12} />
        </a>
      )}
    </motion.div>
  );
}
type EduSkillsCert = (typeof eduSkillsCertificates)[number];
export default function Certifications() {
  const [lightboxCert, setLightboxCert] = useState<EduSkillsCert | null>(null);
  return (
    <section
      id="certifications"
      className="section-shell relative bg-void-100/40"
      aria-label="Certifications"
    >
      <div className="container relative">
        <SectionHeading
          eyebrow="certifications"
          title="Verified knowledge."
          description="Formal credentials backing up the self-taught and coursework skills."
          align="left"
        />

        <StaggerReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </StaggerReveal>

        <div className="mt-10 flex items-center justify-center gap-2 font-mono text-xs text-ink-faint">
          <Award size={14} className="text-signal-amber" />
          {certifications.length} certifications and counting
        </div>

        {eduSkillsCertificates.length > 0 && (
          <div className="mt-20">
            <h3 className="mb-2 font-display text-2xl font-bold text-ink">
              EduSkills Certifications
            </h3>
            <p className="mb-8 text-ink-muted">
              Click any certificate to view it full size.
            </p>

            <StaggerReveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {eduSkillsCertificates.map((cert) => (
                <motion.button
                  key={cert.id}
                  variants={staggerItemVariants}
                  type="button"
                  onClick={() => setLightboxCert(cert)}
                  data-cursor="hover"
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-glass-border bg-void-300"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-void-100/90 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-left text-xs font-medium text-ink">
                      {cert.title}
                    </span>
                  </div>
                </motion.button>
              ))}
            </StaggerReveal>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-void/95 p-6 backdrop-blur-xl"
            onClick={() => setLightboxCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxCert.title}
          >
            <button
              type="button"
              onClick={() => setLightboxCert(null)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-glass-fill text-ink"
              aria-label="Close"
              data-cursor="hover"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              src={lightboxCert.image}
              alt={lightboxCert.title}
              className="max-h-[85vh] max-w-4xl rounded-2xl border border-glass-border object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
