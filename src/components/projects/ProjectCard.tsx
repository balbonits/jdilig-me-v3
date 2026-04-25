import { useState } from 'react';
import { Icon } from '@/components/icons';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
  onClick: () => void;
};

export default function ProjectCard({ project, onClick }: Props) {
  const [hover, setHover] = useState(false);
  const { kind, year, title, accent, desc, tags } = project;

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className="flex cursor-pointer flex-col gap-2.5 rounded-[12px] border bg-surface p-[18px] text-left transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
      style={{
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-xs)',
        borderColor: hover ? 'var(--border-strong)' : 'var(--border)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-fg-subtle">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {year} · {kind}
        </div>
        <span
          className="inline-flex h-4 w-4 transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{
            color: hover ? 'var(--accent)' : 'var(--fg-faint)',
            transform: hover ? 'translate(2px, -2px)' : 'none',
          }}
        >
          <Icon.ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-fg-strong">
        {title}
        {accent && (
          <>
            {' — '}
            <span className="font-serif text-accent italic font-normal">
              {accent}
            </span>
          </>
        )}
      </h3>
      <p className="text-[13.5px] leading-[1.55] text-fg-muted">{desc}</p>
      <div className="mt-0.5 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-[5px] border border-border-DEFAULT bg-bg-muted px-[7px] py-0.5 font-mono text-[10.5px] text-fg-strong"
          >
            {t}
          </span>
        ))}
      </div>
    </button>
  );
}
