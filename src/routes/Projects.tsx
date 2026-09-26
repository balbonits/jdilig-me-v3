import { useState } from 'react';
import FeaturedProjectCard from '@/components/projects/FeaturedProjectCard';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectModal from '@/components/projects/ProjectModal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import {
  PROJECTS,
  type Project,
  type ProjectCategory,
  type SortOption,
  filterProjects,
  sortProjects,
  getFeaturedProject,
  getNonFeaturedProjects,
} from '@/data/projects';

const FEATURED = getFeaturedProject(PROJECTS);
const GRID_PROJECTS = getNonFeaturedProjects(PROJECTS);

const CATEGORY_COUNTS = new Map<ProjectCategory, number>();
for (const p of GRID_PROJECTS) {
  for (const c of p.categories) {
    CATEGORY_COUNTS.set(c, (CATEGORY_COUNTS.get(c) ?? 0) + 1);
  }
}

const SORT_LABELS: Record<SortOption, string> = {
  'year-desc': 'Newest',
  'year-asc': 'Oldest',
  'title-asc': 'A-Z',
};

function pillClass(active: boolean) {
  return `cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-[120ms] ease-out ${
    active
      ? 'border-fg-strong bg-fg-strong text-bg'
      : 'border-border-DEFAULT bg-surface text-fg-muted hover:border-border-strong'
  }`;
}

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

  const visible = sortProjects(filterProjects(GRID_PROJECTS, active), sort);

  return (
    <>
      <Container className="pb-24 pt-10 sm:pt-14">
        <div className="mb-8">
          <Eyebrow>Projects</Eyebrow>
          <h1 className="mt-3 mb-3.5 text-[40px] font-bold tracking-[-0.03em] text-fg-strong sm:text-[48px]">
            Things I've{' '}
            <span className="font-serif font-normal text-accent italic">
              shipped
            </span>
            .
          </h1>
          <p className="max-w-[560px] text-[16px] text-fg-muted">
            Side projects, browser games, and work I'm proud of. Tap a card for
            a quick look.
          </p>
        </div>

        {FEATURED && (
          <div className="mb-10">
            <FeaturedProjectCard
              project={FEATURED}
              onClick={() => setModalProject(FEATURED)}
            />
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
            <button
              type="button"
              onClick={() => setActive(new Set())}
              aria-pressed={active.size === 0}
              className={`${pillClass(active.size === 0)} font-sans`}
            >
              All
            </button>
            {[...CATEGORY_COUNTS].map(([cat, count]) => {
              const isActive = active.has(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  aria-pressed={isActive}
                  className={`${pillClass(isActive)} font-mono tracking-[0.04em]`}
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
            className="cursor-pointer rounded-full border border-border-DEFAULT bg-surface px-3.5 py-1.5 font-mono text-xs font-medium tracking-[0.04em] text-fg-muted transition-colors duration-[120ms] hover:border-border-strong"
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
      </Container>

      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </>
  );
}
