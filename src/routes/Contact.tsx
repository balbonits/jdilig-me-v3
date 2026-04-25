import { useState } from 'react';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { PROFILE } from '@/data/profile';

const MAX_NAME = 100;
const MAX_MESSAGE = 2000;
const MAX_EMAIL = 254;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const emailValid = EMAIL_RE.test(email);
  const emailError = emailTouched && email.length > 0 && !emailValid;
  const canSubmit =
    emailValid && message.trim().length > 0 && status !== 'sending';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!canSubmit) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send');
    }
  };

  if (status === 'sent') {
    return (
      <div className="mx-auto flex min-h-[500px] w-full max-w-[720px] items-center justify-center px-10 py-14">
        <div className="text-center">
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[16px] border text-accent"
            style={{
              background: 'var(--accent-soft)',
              borderColor: 'var(--accent-border)',
            }}
          >
            <Icon.Check className="h-6 w-6" />
          </div>
          <h1 className="mb-2.5 text-[32px] font-bold tracking-[-0.02em] text-fg-strong">
            Message{' '}
            <span className="font-serif text-accent italic font-normal">
              sent
            </span>
            .
          </h1>
          <p className="text-[15px] text-fg-muted">
            Thanks, {name || 'friend'}. I'll reply within a day or two.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[720px] px-10 pb-24 pt-14">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-3 mb-3.5 text-[44px] font-bold tracking-[-0.03em] text-fg-strong">
        Say{' '}
        <span className="font-serif text-accent italic font-normal">hello</span>
        .
      </h1>
      <p className="mb-9 max-w-[520px] text-[16px] text-fg-muted">
        Freelance, full-time, or just to chat about shaders and basketball. I
        reply within a day or two.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-[18px]" noValidate>
        {/* Honeypot — hidden from humans, bots fill it */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden
        />

        <Field label="Name">
          <input
            className="field-input"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, MAX_NAME))}
            placeholder="John"
            autoComplete="name"
            maxLength={MAX_NAME}
            disabled={status === 'sending'}
          />
        </Field>

        <Field label="Email">
          <input
            className={`field-input${emailError ? ' field-input--error' : ''}`}
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.slice(0, MAX_EMAIL));
              // Once the user has been told it's wrong, re-validate live
              if (emailTouched && status === 'error') setStatus('idle');
            }}
            onBlur={() => setEmailTouched(true)}
            placeholder="you@domain.com"
            autoComplete="email"
            maxLength={MAX_EMAIL}
            disabled={status === 'sending'}
            aria-invalid={emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <div
              id="email-error"
              className="font-mono text-[11px]"
              style={{ color: 'var(--danger)' }}
            >
              Enter a valid email (like you@domain.com).
            </div>
          )}
        </Field>

        <Field label="Message">
          <textarea
            className="field-input resize-y"
            rows={6}
            required
            value={message}
            onChange={(e) =>
              setMessage(e.target.value.slice(0, MAX_MESSAGE))
            }
            placeholder="What's on your mind?"
            maxLength={MAX_MESSAGE}
            disabled={status === 'sending'}
            style={{ minHeight: 120, fontFamily: 'var(--font-sans)' }}
          />
          <div className="mt-1 text-right font-mono text-[11px] text-fg-faint">
            {message.length} / {MAX_MESSAGE}
          </div>
        </Field>

        {status === 'error' && (
          <div
            className="rounded-md border px-3 py-2 text-sm"
            style={{
              background: 'var(--danger-soft)',
              borderColor: 'var(--danger)',
              color: 'var(--danger)',
            }}
          >
            {errorMsg}. You can also email{' '}
            <a
              href={`mailto:${PROFILE.email}`}
              className="underline"
              style={{ color: 'var(--danger)' }}
            >
              {PROFILE.email}
            </a>{' '}
            directly.
          </div>
        )}

        <div className="mt-1 flex items-center justify-between">
          <div className="font-mono text-xs text-fg-subtle">
            Or email directly:{' '}
            <a href={`mailto:${PROFILE.email}`} className="text-accent">
              {PROFILE.email}
            </a>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!canSubmit}
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
            {status !== 'sending' && <Icon.ArrowRight className="h-4 w-4" />}
          </Button>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-fg-faint">
          Submissions are delivered to my inbox via Resend. I don't store
          them on this site, share them, or use them for any kind of
          analytics or marketing.
        </p>
      </form>

      <style>{`
        .field-input {
          font-family: var(--font-sans);
          font-size: 15px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--fg);
          transition: all 120ms var(--ease-out);
          width: 100%;
          box-shadow: var(--shadow-xs);
        }
        .field-input::placeholder { color: var(--fg-faint); }
        .field-input:disabled { opacity: 0.6; cursor: not-allowed; }
        .field-input--error {
          border-color: var(--danger);
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
        }
        .field-input--error:focus-visible {
          border-color: var(--danger) !important;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.25) !important;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-[7px]">
      <span className="text-[13px] font-medium text-fg">{label}</span>
      {children}
    </label>
  );
}
