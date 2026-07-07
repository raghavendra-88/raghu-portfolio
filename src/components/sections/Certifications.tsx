"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerReveal, {
  staggerItemVariants,
} from "@/components/animations/StaggerReveal";
import { certifications } from "@/data/credentials";

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

export default function Certifications() {
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
      </div>
    </section>
  );
}
