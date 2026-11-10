import type { ReactNode } from 'react';

/**
 * Renders plain copy, turning `backtick` spans into inline <code> and [label](href) into links.
 * Links are plain <a> (full page loads), because some targets are static apps outside the router, like /ux/job-tracker/.
 */
export default function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  const code = (s: string, key: string) =>
    s.split('`').map((part, i) => (i % 2 === 1 ? <code key={`${key}-${i}`}>{part}</code> : part));
  while ((m = re.exec(text))) {
    out.push(...code(text.slice(last, m.index), `t${last}`));
    const external = /^https?:\/\//.test(m[2]);
    out.push(
      <a
        key={`a${m.index}`}
        href={m[2]}
        className="text-accent underline underline-offset-2"
        {...(external ? { rel: 'noreferrer' } : {})}
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  out.push(...code(text.slice(last), `t${last}`));
  return <>{out}</>;
}
