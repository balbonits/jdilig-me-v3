import { useState } from 'react';
import { Icon } from '@/components/icons';
import ProjectHeroPreview from '@/components/projects/ProjectHeroPreview';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
  onClick: () => void;
};

export default function FeaturedProjectCard({ project, onClick }: Props) {
  const [hover, setHover] = useState(false);
  const { categories, year, title, accent, summary, tags, status } = project;

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      aria-label={`Featured project: ${title}`}
      className="group relative grid w-full cursor-pointer grid-cols-1 overflow-hidden rounded-[16px] border bg-surface text-left transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
      style={{
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? 'var(--shadow-xl)' : 'var(--shadow-md)',
        borderColor: hover ? 'var(--border-strong)' : 'var(--border)',
      }}
    >
      <div className="relative">
        <ProjectHeroPreview
          height={320}
          starCount={90}
          image={project.previewImage}
          alt={`${title} preview`}
          className="h-full md:h-[320px]"
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Featured project
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-fg-subtle">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {year} · {categories.join(' · ')} · {status}
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

        <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-fg-strong md:text-[32px]">
          {title}
          {accent && (
            <>
              {' — '}
              <span className="font-serif text-accent italic font-normal">
                {accent}
              </span>
            </>
          )}
        </h2>

        <p className="text-[14.5px] leading-[1.6] text-fg-muted">{summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-[5px] border border-border-DEFAULT bg-bg-muted px-[7px] py-0.5 font-mono text-[10.5px] text-fg-strong"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
