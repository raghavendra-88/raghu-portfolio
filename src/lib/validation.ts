import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be under 80 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(120, "Subject must be under 120 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be under 2000 characters."),
  budget: z.string().optional(),
  // Honeypot field — real users never fill this in. If it has a value,
  // the submission is treated as spam and silently dropped.
  company: z.string().max(0, "Spam detected.").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
