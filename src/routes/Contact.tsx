import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PROFILE } from '@/data/profile';
import { CONTACT_LIMITS, isValidEmail } from '@/lib/contact';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const id = useId();

  const sending = status === 'sending';
  const emailValid = isValidEmail(email);
  const emailError = emailTouched && email.length > 0 && !emailValid;
  const canSubmit = emailValid && message.trim().length > 0 && !sending;

  const onSubmit = async (e: FormEvent) => {
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
      <Container
        size="narrow"
        className="flex min-h-[500px] items-center justify-center py-14"
      >
        <div className="text-center" role="status">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[16px] border border-accent-border bg-accent-soft text-accent">
            <Icon.Check className="h-6 w-6" />
          </div>
          <h1 className="mb-2.5 text-[32px] font-bold tracking-[-0.02em] text-fg-strong">
            Message{' '}
            <span className="font-serif font-normal text-accent italic">
              sent
            </span>
            .
          </h1>
          <p className="text-[15px] text-fg-muted">
            Thanks, {name.trim() || 'friend'}. I'll reply within a day or two.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container size="narrow" className="pb-24 pt-10 sm:pt-14">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-3 mb-3.5 text-[40px] font-bold tracking-[-0.03em] text-fg-strong sm:text-[44px]">
        Say{' '}
        <span className="font-serif font-normal text-accent italic">hello</span>
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

        <Field id={`${id}-name`} label="Name">
          <input
            id={`${id}-name`}
            className="field-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            disabled={sending}
          />
        </Field>

        <Field
          id={`${id}-email`}
          label="Email"
          error={emailError ? 'Enter a valid email (like you@domain.com).' : undefined}
        >
          <input
            id={`${id}-email`}
            className="field-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            placeholder="you@domain.com"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
            disabled={sending}
            aria-invalid={emailError}
            aria-describedby={emailError ? `${id}-email-error` : undefined}
          />
        </Field>

        <Field
          id={`${id}-message`}
          label="Message"
          hint={`${message.length} / ${CONTACT_LIMITS.message}`}
        >
          <textarea
            id={`${id}-message`}
            className="field-input min-h-[120px] resize-y"
            rows={6}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            maxLength={CONTACT_LIMITS.message}
            disabled={sending}
            aria-describedby={`${id}-message-hint`}
          />
        </Field>

        {status === 'error' && (
          <div
            role="alert"
            className="rounded-md border border-danger bg-danger-soft px-3 py-2 text-sm text-danger"
          >
            {errorMsg}. You can also email{' '}
            <a href={`mailto:${PROFILE.email}`} className="text-danger underline">
              {PROFILE.email}
            </a>{' '}
            directly.
          </div>
        )}

        <div className="mt-1 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            className="w-full sm:w-auto"
          >
            {sending ? 'Sending…' : 'Send message'}
            {!sending && <Icon.ArrowRight className="h-4 w-4" />}
          </Button>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-fg-faint">
          Submissions are delivered to my inbox via Resend. I don't store
          them on this site, share them, or use them for any kind of
          analytics or marketing.
        </p>
      </form>
    </Container>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[13px] font-medium text-fg">
        {label}
      </label>
      {children}
      {error && (
        <div id={`${id}-error`} className="font-mono text-[11px] text-danger">
          {error}
        </div>
      )}
      {hint && (
        <div
          id={`${id}-hint`}
          className="mt-1 text-right font-mono text-[11px] text-fg-faint"
        >
          {hint}
        </div>
      )}
    </div>
  );
}
