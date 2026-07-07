# Raghu — Personal Portfolio

A production-ready, cinematic personal portfolio built with Next.js 14 (App
Router), TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js (via React
Three Fiber), and Lenis smooth scrolling.

**Theme:** Dark cyberpunk × glassmorphism, with an aurora cyan/violet/green
color system and a terminal-boot loading sequence that ties the
cybersecurity identity directly into the first interaction.

---

## ✨ Features

- **16 fully built sections**: Hero, About, Skills, Tech Stack, Experience &
  Education Timeline, Projects, Certifications, Services, Achievements,
  Gallery, Blog (launch-ready), Testimonials, Contact, Resume download,
  Social links, Footer.
- **Cinematic loading screen** — a simulated terminal boot sequence.
- **Custom cursor** with magnetic hover states (auto-disabled on touch
  devices and when `prefers-reduced-motion` is set).
- **3D floating object** in the hero, built with React Three Fiber.
- **Canvas particle field** with mouse-attraction physics.
- **GSAP + Framer Motion** scroll-triggered reveals throughout.
- **Lenis smooth scrolling**, respecting reduced-motion preferences.
- **Working contact form** — validated with Zod + React Hook Form, sent via
  [Resend](https://resend.com), with honeypot spam protection and basic
  in-memory rate limiting.
- **Full SEO**: metadata, Open Graph, Twitter cards, JSON-LD structured
  data, dynamic `sitemap.xml` and `robots.txt`, web manifest.
- **Accessible**: skip-to-content link, visible focus states, semantic
  landmarks, `aria-*` attributes on interactive widgets, reduced-motion
  support throughout.
- **Type-safe content layer** — all copy lives in `src/data/*.ts`, so you
  can swap in your real projects/skills/timeline without touching
  component code.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | The email address that should receive contact form submissions |
| `CONTACT_FROM_EMAIL` | The "from" address Resend sends as (must be on a verified domain, or use the Resend sandbox address for testing) |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL, used in SEO tags & sitemap |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Google Search Console verification code |

### 3. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts     # Contact form email endpoint (Resend)
│   ├── layout.tsx               # Root layout, fonts, SEO metadata, JSON-LD
│   ├── page.tsx                 # Homepage — assembles all sections
│   ├── globals.css              # Design tokens, glass/neu utilities, animations
│   ├── sitemap.ts               # Dynamic sitemap.xml
│   ├── robots.ts                # Dynamic robots.txt
│   ├── not-found.tsx            # Custom 404
│   └── loading.tsx              # Route-level loading fallback
├── components/
│   ├── layout/                  # Navbar, Footer, SmoothScrollProvider
│   ├── sections/                # One file per homepage section
│   ├── ui/                      # Reusable UI primitives (buttons, cards, etc.)
│   ├── three/                   # HeroScene (R3F) and ParticleField (canvas2d)
│   └── animations/              # RevealOnScroll, StaggerReveal, MouseGlow, AnimatedCounter
├── data/                        # ⭐ ALL EDITABLE CONTENT LIVES HERE
│   ├── site.ts                  # Name, roles, nav links, social links
│   ├── skills.ts                # Skill bars + tech stack marquee
│   ├── timeline.ts               # Experience & education entries
│   ├── projects.ts              # Project cards
│   ├── credentials.ts           # Certifications, services, achievements, stats
│   └── content.ts               # Gallery, blog posts, testimonials
├── hooks/                       # useLenis, useMousePosition, useMediaQuery, useScrollProgress
├── lib/                         # utils.ts (cn, lerp, etc.), fonts.ts, validation.ts (Zod schema)
└── types/                       # Shared TypeScript interfaces

public/
├── images/                      # Project screenshots, gallery images, certification badges
├── resume/                      # Your resume PDF
└── fonts/                       # (fonts are loaded via next/font/google by default)
```

---

## ✏️ Customizing Content

**You do not need to touch component code to update your content.** Edit
these files:

1. **`src/data/site.ts`** — your name, roles, tagline, mission statement,
   social links, nav links.
2. **`src/data/skills.ts`** — skill proficiency bars and the tech stack
   marquee icons (uses `react-icons/si` — browse available icons at
   [react-icons.github.io/react-icons/icons/si](https://react-icons.github.io/react-icons/icons/si)).
3. **`src/data/timeline.ts`** — experience and education entries.
4. **`src/data/projects.ts`** — your real projects, with live/GitHub links.
5. **`src/data/credentials.ts`** — certifications, services you offer,
   achievements, and headline stats.
6. **`src/data/content.ts`** — gallery items, blog post previews,
   testimonials.

Then replace the placeholder images in `public/images/` with your real
screenshots, artwork, and photos (same filenames, or update the paths in
the data files), and swap `public/resume/Raghu-Resume.pdf` for your actual
resume.

> **Note on placeholder assets:** This template ships with generated
> gradient-pattern placeholder images (not stock photos) for every project,
> gallery item, certification, and avatar, plus a placeholder resume PDF, so
> the site runs and looks intentional out of the box. Replace them with
> your real assets before deploying publicly.

---

## 📧 Setting Up the Contact Form (Resend)

1. Create a free account at [resend.com](https://resend.com).
2. Generate an API key and add it to `.env.local` as `RESEND_API_KEY`.
3. For production sending from your own domain (e.g. `you@yourdomain.com`),
   verify your domain under **Domains** in the Resend dashboard, then set
   `CONTACT_FROM_EMAIL` accordingly.
4. For quick local testing without a verified domain, keep
   `CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>` — Resend's
   shared sandbox sender works for testing (delivery limits apply).
5. Set `CONTACT_TO_EMAIL` to the inbox that should receive submissions.

The form includes:
- Zod schema validation (client + server side)
- A hidden honeypot field to silently drop bot submissions
- Basic in-memory rate limiting (4 requests/minute per IP)
- Animated success/error states

---

## 🎨 Design System Reference

| Token | Value | Usage |
|---|---|---|
| `void` | `#05070D` | Base background |
| `cyan-glow` | `#00E5FF` | Primary accent |
| `violet-glow` | `#B026FF` | Secondary accent |
| `signal-green` | `#39FF88` | Success / status / terminal accents |
| `ink` | `#E8EDF5` | Primary text |
| Display font | Manrope | Headlines |
| Body font | Inter | Paragraph text |
| Mono font | JetBrains Mono | Code, tags, HUD labels, stats |

All tokens are defined in `tailwind.config.ts` and `src/app/globals.css`.

---

## ⚡ Performance Notes

- Images use `loading="lazy"` and the Next.js `<Image>` optimization
  pipeline is configured in `next.config.mjs` (AVIF/WebP first).
- The Three.js scene uses a capped device-pixel-ratio (`[1, 1.75]`) and a
  minimal primitive count to sustain 60fps on integrated GPUs.
- Heavy client-only components (the R3F scene) are loaded via
  `next/dynamic` with `ssr: false` to keep initial server payload light.
- All scroll/mouse-driven effects respect `prefers-reduced-motion`.
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy) are set in `next.config.mjs`.

Run a Lighthouse audit after deployment (`npm run build && npm start`, then
audit the production build — dev mode scores lower due to unminified code).

---

## 📦 Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full Vercel deployment guide.

---

## 🛠 Tech Stack

**Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion,
GSAP, Three.js, React Three Fiber, React Hook Form, Zod

**Backend:** Next.js Route Handlers (Node.js runtime), Resend

**Deployment:** Vercel

---

## 📄 License

MIT — free to use as a template for your own portfolio.
