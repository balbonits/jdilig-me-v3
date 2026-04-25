import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'rjdofficemail@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  name?: string;
  email?: string;
  message?: string;
  // bots fill this hidden field; humans don't see it
  honeypot?: string;
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
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

  if (!RESEND_API_KEY) {
    return json(500, { error: 'Email service is not configured' });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const { name = '', email = '', message = '', honeypot = '' } = body;

  // Honeypot — pretend success so bots don't retry
  if (honeypot.trim().length > 0) {
    return json(200, { ok: true });
  }

  if (!email || !message) {
    return json(400, { error: 'Email and message are required' });
  }
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return json(400, { error: 'Invalid email address' });
  }
  if (name.length > MAX_NAME) {
    return json(400, { error: 'Name is too long' });
  }
  if (message.length > MAX_MESSAGE) {
    return json(400, { error: 'Message is too long' });
  }

  const safeName = sanitizeHeader(name || 'Anonymous').slice(0, MAX_NAME);
  const safeEmail = sanitizeHeader(email).slice(0, MAX_EMAIL);
  const safeMessage = message.slice(0, MAX_MESSAGE);

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: `jdilig.me contact <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: safeEmail,
      subject: `Hello from ${safeName}`,
      text: `${safeMessage}\n\n— ${safeName} <${safeEmail}>`,
      html: `<p>${escapeHtml(safeMessage).replace(/\n/g, '<br>')}</p>
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
