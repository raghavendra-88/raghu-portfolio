"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { contactFormSchema, ContactFormValues } from "@/lib/validation";
import { siteConfig, socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const socialIconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      budget: "",
      company: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSubmitState("success");
      reset();
      setTimeout(() => setSubmitState("idle"), 5000);
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setTimeout(() => setSubmitState("idle"), 5000);
    }
  }

  return (
    <section id="contact" className="section-shell relative bg-void-100/40" aria-label="Contact">
      <div className="pointer-events-none absolute inset-0 bg-aurora-1 opacity-50" />
      <div className="container relative">
        <SectionHeading
          eyebrow="contact"
          title="Let's build something."
          description="Whether it's a project, a role, or just a question about cybersecurity or code — I read every message."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <RevealOnScroll direction="right" className="lg:col-span-4">
            <div className="glass-panel h-full rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold text-ink">
                Get in touch
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Prefer email? Reach me directly — I typically respond within
                24–48 hours.
              </p>

              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor="hover"
                className="mt-6 flex items-center gap-3 rounded-xl border border-glass-border bg-void-200/50 p-4 transition-colors hover:border-cyan-glow/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-glow/10 text-cyan-glow">
                  <Mail size={18} />
                </span>
                <span className="font-mono text-sm text-ink">
                  {siteConfig.email}
                </span>
              </a>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-glass-border bg-void-200/50 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-glow/10 text-violet-glow">
                  <MapPin size={18} />
                </span>
                <span className="font-mono text-sm text-ink">
                  {siteConfig.location} · Remote-friendly
                </span>
              </div>

              <div className="mt-8 border-t border-glass-border pt-6">
                <p className="chip-mono mb-4 text-ink-faint">
                  Find me elsewhere
                </p>
                <div className="flex gap-3">
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
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-void-200/50 text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/40 hover:text-cyan-glow"
                      >
                        <Icon size={17} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" className="lg:col-span-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass-panel relative overflow-hidden rounded-2xl p-8"
            >
              {/* Honeypot field — hidden from real users via CSS, bots fill it in. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block chip-mono text-ink-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(
                      "w-full rounded-xl border bg-void-200/60 px-4 py-3.5 text-ink placeholder:text-ink-faint transition-colors focus:outline-none",
                      errors.name
                        ? "border-signal-red/60 focus:border-signal-red"
                        : "border-glass-border focus:border-cyan-glow/50"
                    )}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1.5 text-xs text-signal-red"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block chip-mono text-ink-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      "w-full rounded-xl border bg-void-200/60 px-4 py-3.5 text-ink placeholder:text-ink-faint transition-colors focus:outline-none",
                      errors.email
                        ? "border-signal-red/60 focus:border-signal-red"
                        : "border-glass-border focus:border-cyan-glow/50"
                    )}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-xs text-signal-red"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="mb-2 block chip-mono text-ink-muted"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={cn(
                    "w-full rounded-xl border bg-void-200/60 px-4 py-3.5 text-ink placeholder:text-ink-faint transition-colors focus:outline-none",
                    errors.subject
                      ? "border-signal-red/60 focus:border-signal-red"
                      : "border-glass-border focus:border-cyan-glow/50"
                  )}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p
                    id="subject-error"
                    className="mt-1.5 text-xs text-signal-red"
                  >
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="budget"
                  className="mb-2 block chip-mono text-ink-muted"
                >
                  Budget <span className="text-ink-faint">(optional)</span>
                </label>
                <select
                  id="budget"
                  defaultValue=""
                  className="w-full rounded-xl border border-glass-border bg-void-200/60 px-4 py-3.5 text-ink transition-colors focus:border-cyan-glow/50 focus:outline-none"
                  {...register("budget")}
                >
                  <option value="" className="bg-void-200">
                    Prefer not to say / Not applicable
                  </option>
                  <option value="< $500" className="bg-void-200">
                    Under $500
                  </option>
                  <option value="$500 - $2,000" className="bg-void-200">
                    $500 – $2,000
                  </option>
                  <option value="$2,000+" className="bg-void-200">
                    $2,000+
                  </option>
                  <option value="Not a paid project" className="bg-void-200">
                    Not a paid project
                  </option>
                </select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block chip-mono text-ink-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me a bit about what you have in mind..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(
                    "w-full resize-none rounded-xl border bg-void-200/60 px-4 py-3.5 text-ink placeholder:text-ink-faint transition-colors focus:outline-none",
                    errors.message
                      ? "border-signal-red/60 focus:border-signal-red"
                      : "border-glass-border focus:border-cyan-glow/50"
                  )}
                  {...register("message")}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1.5 text-xs text-signal-red"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={submitState === "loading"}
                  ariaLabel="Send message"
                  className="flex items-center gap-2 rounded-full bg-cyan-glow px-7 py-3.5 font-semibold text-void shadow-glow-cyan transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(0,229,255,0.4)]"
                >
                  {submitState === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </MagneticButton>

                <AnimatePresence mode="wait">
                  {submitState === "success" && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 font-mono text-sm text-signal-green"
                    >
                      <CheckCircle2 size={16} />
                      Message sent — I&apos;ll be in touch soon!
                    </motion.p>
                  )}
                  {submitState === "error" && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 font-mono text-sm text-signal-red"
                    >
                      <AlertCircle size={16} />
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
