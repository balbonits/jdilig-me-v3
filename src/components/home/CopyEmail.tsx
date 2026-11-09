import { useState } from 'react';
import { Icon } from '@/components/icons';
import { PROFILE } from '@/data/profile';

/** The email as a link plus a Copy button that confirms in a live region. */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a href={`mailto:${PROFILE.email}`} className="prose-link inline-flex min-h-11 items-center gap-2 text-[16px] break-all">
        <Icon.Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
        {PROFILE.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-[2px] border border-border-strong bg-surface px-3 text-sm font-medium text-fg-strong transition-all duration-150 ease-out hover:bg-bg-subtle motion-safe:active:scale-[0.98]"
      >
        {copied ? <Icon.Check className="h-4 w-4" aria-hidden="true" /> : <Icon.Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy'}
        <span className="sr-only"> email address</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email copied' : ''}
      </span>
    </div>
  );
}
