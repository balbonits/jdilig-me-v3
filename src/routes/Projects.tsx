import { useState } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectModal from '@/components/projects/ProjectModal';
import {
  PROJECTS,
  type Project,
  type ProjectCategory,
  type SortOption,
  filterProjects,
  sortProjects,
} from '@/data/projects';

const ALL_CATEGORIES: ProjectCategory[] = [
  ...new Set(PROJECTS.flatMap((p) => p.categories)),
] as ProjectCategory[];

const SORT_LABELS: Record<SortOption, string> = {
  'year-desc': 'Newest',
  'year-asc': 'Oldest',
  'title-asc': 'A-Z',
};

export default function Projects() {
  const [active, setActive] = useState<Set<ProjectCategory>>(new Set());
  const [sort, setSort] = useState<SortOption>('year-desc');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  function toggleCategory(cat: ProjectCategory) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }

  const visible = sortProjects(filterProjects(PROJECTS, active), sort);

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

        <div className="mb-6 flex flex-wrap items-center justify-between gap-y-3 gap-x-4">
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActive(new Set())}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium tracking-normal transition-all duration-[120ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                active.size === 0
                  ? 'border-fg-strong bg-fg-strong text-bg'
                  : 'border-border-DEFAULT bg-surface text-fg-muted hover:border-border-strong'
              }`}
            >
              All
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const isActive = active.has(cat);
              const count = PROJECTS.filter((p) =>
                p.categories.includes(cat),
              ).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium tracking-[0.04em] transition-all duration-[120ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                    isActive
                      ? 'border-fg-strong bg-fg-strong text-bg'
                      : 'border-border-DEFAULT bg-surface text-fg-muted hover:border-border-strong'
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 ${isActive ? 'text-bg/60' : 'text-fg-faint'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <select
            aria-label="Sort projects"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="cursor-pointer rounded-full border border-border-DEFAULT bg-surface px-3.5 py-1.5 font-mono text-xs font-medium tracking-[0.04em] text-fg-muted transition-colors duration-[120ms] hover:border-border-strong focus:outline-none"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <option key={opt} value={opt}>
                {SORT_LABELS[opt]}
              </option>
            ))}
          </select>
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
