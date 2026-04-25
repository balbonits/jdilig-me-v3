import { useState } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectModal from '@/components/projects/ProjectModal';
import { PROJECTS, type Project, type ProjectKind } from '@/data/projects';

type Filter = 'All' | ProjectKind;
const FILTERS: Filter[] = ['All', 'GAME', 'SITE', 'TOOL', 'WORK', 'EXPT'];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const visible =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.kind === filter);

  return (
    <>
      <div className="mx-auto w-full max-w-[1120px] px-10 pb-24 pt-14">
        <div className="mb-8">
          <Eyebrow>Projects</Eyebrow>
          <h1 className="mt-3 mb-3.5 text-[48px] font-bold tracking-[-0.03em] text-fg-strong">
            Things I've{' '}
            <span className="font-serif text-accent italic font-normal">
              shipped
            </span>
            .
          </h1>
          <p className="max-w-[560px] text-[16px] text-fg-muted">
            Side projects, browser games, and work I'm proud of. Tap a card for
            a quick look.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const active = filter === f;
            const count =
              f === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.kind === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-[120ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  f === 'All' ? 'font-sans tracking-normal' : 'font-mono tracking-[0.04em]'
                } ${
                  active
                    ? 'border-fg-strong bg-fg-strong text-bg'
                    : 'border-border-DEFAULT bg-surface text-fg-muted hover:border-border-strong'
                }`}
              >
                {f}
                {f !== 'All' && (
                  <span className="ml-1.5 text-fg-faint">{count}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {visible.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              onClick={() => setModalProject(p)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </>
  );
}
