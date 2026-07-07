# Deployment Guide — Vercel

This project is built with Next.js 14 and is deployment-ready for Vercel
with zero configuration beyond environment variables.

## Option A — Deploy via Vercel Dashboard (recommended for first deploy)

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will auto-detect Next.js — leave the default build settings:
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `RESEND_API_KEY` | your Resend API key |
   | `CONTACT_TO_EMAIL` | the email that should receive messages |
   | `CONTACT_FROM_EMAIL` | your verified sender, e.g. `Portfolio <hello@yourdomain.com>` |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` (or your custom domain) |
5. Click **Deploy**.

## Option B — Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel            # first deploy, follow the prompts
vercel --prod     # subsequent production deploys
```

You'll be prompted to set the same environment variables listed above (or
set them ahead of time with `vercel env add`).

## Custom Domain

1. In the Vercel project dashboard, go to **Settings → Domains**.
2. Add your domain and follow the DNS instructions (usually an `A` record
   to Vercel's IP or a `CNAME` to `cname.vercel-dns.com`).
3. Once verified, update `NEXT_PUBLIC_SITE_URL` in your environment
   variables to match the final domain, then redeploy so SEO metadata,
   the sitemap, and JSON-LD all reference the correct URL.

## Setting Up Resend for Production Email

1. In the [Resend dashboard](https://resend.com/domains), add and verify
   your sending domain (adds a few DNS records: SPF, DKIM).
2. Once verified, set `CONTACT_FROM_EMAIL` to an address on that domain,
   e.g. `Portfolio <contact@yourdomain.com>`.
3. Without a verified domain, Resend's shared `onboarding@resend.dev`
   sender works for testing but has stricter sending limits and is not
   recommended for a live production form.

## Post-Deploy Checklist

- [ ] Visit `/sitemap.xml` and `/robots.txt` to confirm they render.
- [ ] Submit the contact form end-to-end and confirm the email arrives.
- [ ] Replace all placeholder images in `public/images/` with real assets.
- [ ] Replace `public/resume/Raghu-Resume.pdf` with your actual resume.
- [ ] Update social links, GitHub/live URLs in `src/data/*.ts`.
- [ ] Run a Lighthouse audit on the production URL (Chrome DevTools →
      Lighthouse) and confirm Performance/Accessibility/SEO scores.
- [ ] Submit the sitemap to
      [Google Search Console](https://search.google.com/search-console).
- [ ] Update `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if using Search Console
      HTML-tag verification.

## Environment Variables Reference

All variables are documented in `.env.example`. Never commit `.env.local`
to version control — it's already excluded via `.gitignore`.
