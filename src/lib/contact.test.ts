import { afterEach, describe, expect, it, vi } from 'vitest';
import { CONTACT_LIMITS, isValidEmail } from './contact';

const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock('resend', () => ({
  Resend: class {
    emails = { send };
  },
}));

// The handler reads RESEND_API_KEY at import time, so load a fresh copy per test.
async function loadHandler(apiKey = 're_test') {
  vi.resetModules();
  vi.stubEnv('RESEND_API_KEY', apiKey);
  return (await import('../../api/contact')).default;
}

function post(body: unknown) {
  return new Request('https://www.jdilig.me/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

const valid = { name: 'Ada', email: 'ada@example.com', message: 'Hi there' };

afterEach(() => {
  vi.unstubAllEnvs();
  send.mockReset();
});

describe('isValidEmail', () => {
  it('accepts a normal address', () => {
    expect(isValidEmail('you@domain.com')).toBe(true);
  });

  it.each(['', 'plain', 'no@tld', 'two@@at.com', 'sp ace@x.io'])(
    'rejects %j',
    (email) => {
      expect(isValidEmail(email)).toBe(false);
    },
  );

  it('rejects addresses over the length cap', () => {
    const local = 'a'.repeat(CONTACT_LIMITS.email);
    expect(isValidEmail(`${local}@x.io`)).toBe(false);
  });
});

describe('POST /api/contact', () => {
  it('rejects other methods with 405', async () => {
    const handler = await loadHandler();
    const res = await handler(new Request('https://www.jdilig.me/api/contact'));
    expect(res.status).toBe(405);
  });

  it.each([
    ['malformed JSON', '{nope'],
    ['a JSON null', 'null'],
    ['a JSON array', '[]'],
    ['a non-string field', { ...valid, name: 42 }],
  ])('rejects %s with 400', async (_label, body) => {
    const handler = await loadHandler();
    const res = await handler(post(body));
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('fakes success for honeypot submissions without sending', async () => {
    const handler = await loadHandler();
    const res = await handler(post({ ...valid, honeypot: 'Acme Inc' }));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ['a blank message', { ...valid, message: '   ' }],
    ['an invalid email', { ...valid, email: 'nope' }],
    ['an overlong name', { ...valid, name: 'x'.repeat(CONTACT_LIMITS.name + 1) }],
    [
      'an overlong message',
      { ...valid, message: 'x'.repeat(CONTACT_LIMITS.message + 1) },
    ],
  ])('rejects %s with 400', async (_label, body) => {
    const handler = await loadHandler();
    const res = await handler(post(body));
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('reports a missing API key as 500', async () => {
    const handler = await loadHandler('');
    const res = await handler(post(valid));
    expect(res.status).toBe(500);
  });

  it('sends with header-safe names and an escaped HTML body', async () => {
    send.mockResolvedValue({ data: { id: 'email_1' }, error: null });
    const handler = await loadHandler();
    const res = await handler(
      post({
        name: 'Eve\r\nBcc: spam@example.com',
        email: 'eve@example.com',
        message: '<b>hi</b>',
      }),
    );

    expect(res.status).toBe(200);
    const args = send.mock.calls[0][0];
    expect(args.subject).toBe('Hello from Eve Bcc: spam@example.com');
    expect(args.replyTo).toBe('eve@example.com');
    expect(args.html).toContain('&lt;b&gt;hi&lt;/b&gt;');
    expect(args.html).not.toContain('<b>');
  });

  it('maps a Resend error to 502', async () => {
    send.mockResolvedValue({ data: null, error: { message: 'boom' } });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const handler = await loadHandler();
    const res = await handler(post(valid));
    expect(res.status).toBe(502);
  });
});
