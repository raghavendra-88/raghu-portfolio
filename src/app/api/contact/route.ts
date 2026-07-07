import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validation";

export const runtime = "nodejs";

// ── Very small in-memory rate limiter ──────────────────────────────
// Prevents naive spam bursts from a single IP. This resets on cold
// start / redeploy, which is an acceptable tradeoff for a personal
// portfolio's contact form (not a substitute for a real WAF).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 4;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Invalid submission." },
        { status: 400 }
      );
    }

    // Honeypot check — if the hidden "company" field has a value, a bot
    // filled it in. Silently pretend success so bots don't learn to
    // adjust their behavior.
    if (parsed.data.company && parsed.data.company.length > 0) {
      return NextResponse.json({ success: true });
    }

    const { name, email, subject, message, budget } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (!apiKey || !toEmail) {
      console.error(
        "Contact API misconfigured: missing RESEND_API_KEY or CONTACT_TO_EMAIL"
      );
      return NextResponse.json(
        {
          error:
            "The contact form isn't fully configured yet. Please email directly instead.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const safeBudget = budget ? escapeHtml(budget) : "Not specified";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background:#05070D; color:#E8EDF5; padding:32px; border-radius:12px;">
          <h2 style="color:#00E5FF; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color:#8B96AB; font-size:13px; margin-top:0;">via raghu.dev portfolio</p>
          <table style="width:100%; border-collapse: collapse; margin-top:20px;">
            <tr><td style="padding:8px 0; color:#8B96AB; width:120px;">Name</td><td style="padding:8px 0;">${safeName}</td></tr>
            <tr><td style="padding:8px 0; color:#8B96AB;">Email</td><td style="padding:8px 0;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px 0; color:#8B96AB;">Subject</td><td style="padding:8px 0;">${safeSubject}</td></tr>
            <tr><td style="padding:8px 0; color:#8B96AB;">Budget</td><td style="padding:8px 0;">${safeBudget}</td></tr>
          </table>
          <div style="margin-top:20px; padding:16px; background:rgba(255,255,255,0.04); border-radius:8px; border:1px solid rgba(232,237,245,0.08);">
            <p style="margin:0; line-height:1.6;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
