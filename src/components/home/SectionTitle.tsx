import type { ReactNode } from 'react';

/** A real H2 with a decorative "01" number (hidden from screen readers). */
export default function SectionTitle({ id, num, children }: { id: string; num: string; children: ReactNode }) {
  return (
    <h2 id={id} tabIndex={-1} className="flex items-baseline gap-3 text-[26px] font-semibold tracking-[-0.02em] text-fg-strong focus:outline-none sm:text-[30px]">
      <span aria-hidden="true" className="font-mono text-[13px] font-medium text-teal">
        {num}
      </span>
      {children}
    </h2>
  );
}
