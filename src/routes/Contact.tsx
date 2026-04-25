import { useState } from 'react';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { PROFILE } from '@/data/profile';

const MAX_NAME = 100;
const MAX_MESSAGE = 2000;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!email || !message) return;

    const subject = encodeURIComponent(
      `Hello from ${name || 'jdilig.me visitor'}`,
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name || 'Anonymous'} (${email})`,
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
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

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-[18px]"
        noValidate
      >
        {/* Honeypot — hidden from humans, bots fill it */}
        <input
          type="text"
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
          />
        </Field>

        <Field label="Email">
          <input
            className="field-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            autoComplete="email"
            maxLength={254}
          />
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
            style={{ minHeight: 120, fontFamily: 'var(--font-sans)' }}
          />
          <div className="mt-1 text-right font-mono text-[11px] text-fg-faint">
            {message.length} / {MAX_MESSAGE}
          </div>
        </Field>

        <div className="mt-1 flex items-center justify-between">
          <div className="font-mono text-xs text-fg-subtle">
            Or email directly:{' '}
            <a href={`mailto:${PROFILE.email}`} className="text-accent">
              {PROFILE.email}
            </a>
          </div>
          <Button type="submit" variant="primary" size="lg">
            Send message <Icon.ArrowRight className="h-4 w-4" />
          </Button>
        </div>
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
