import { Resend } from 'resend';
import { CONTACT_LIMITS, isValidEmail } from '../src/lib/contact';

export const config = {
  runtime: 'edge',
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'rjdofficemail@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

type Fields = {
  name: string;
  email: string;
  message: string;
  // bots fill this hidden field; humans don't see it
  honeypot: string;
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Accept only a JSON object whose known fields are strings (or absent).
// Anything else — null, arrays, numbers — is rejected before it can throw.
function readFields(body: unknown): Fields | null {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return null;
  }
  const fields = { name: '', email: '', message: '', honeypot: '' };
  for (const key of Object.keys(fields) as (keyof Fields)[]) {
    const value = (body as Record<string, unknown>)[key];
    if (value === undefined) continue;
    if (typeof value !== 'string') return null;
    fields[key] = value;
  }
  return fields;
}

function sanitizeHeader(value: string): string {
  // strip CR/LF to prevent header injection in From / Reply-To
  return value.replace(/[\r\n]+/g, ' ');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const fields = readFields(body);
  if (!fields) {
    return json(400, { error: 'Invalid request body' });
  }
  const { name, email, message, honeypot } = fields;

  // Honeypot — pretend success so bots don't retry
  if (honeypot.trim().length > 0) {
    return json(200, { ok: true });
  }

  if (!email || !message.trim()) {
    return json(400, { error: 'Email and message are required' });
  }
  if (!isValidEmail(email)) {
    return json(400, { error: 'Invalid email address' });
  }
  if (name.length > CONTACT_LIMITS.name) {
    return json(400, { error: 'Name is too long' });
  }
  if (message.length > CONTACT_LIMITS.message) {
    return json(400, { error: 'Message is too long' });
  }

  if (!RESEND_API_KEY) {
    return json(500, { error: 'Email service is not configured' });
  }

  const safeName = sanitizeHeader(name.trim() || 'Anonymous');
  const safeEmail = sanitizeHeader(email);

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: `jdilig.me contact <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: safeEmail,
      subject: `Hello from ${safeName}`,
      text: `${message}\n\n— ${safeName} <${safeEmail}>`,
      html: `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
<p>— ${escapeHtml(safeName)} &lt;${escapeHtml(safeEmail)}&gt;</p>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return json(502, { error: 'Failed to send email' });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return json(500, { error: 'Unexpected error' });
  }
}
