/**
 * Contact-form rules shared by the form (src/routes/Contact.tsx) and the
 * /api/contact Edge function, so the two can't drift apart.
 */
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return email.length <= CONTACT_LIMITS.email && EMAIL_RE.test(email);
}
