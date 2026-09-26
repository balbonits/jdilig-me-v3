import type { Project } from '@/data/projects';

type Props = {
  project: Pick<Project, 'year' | 'categories' | 'status'>;
  showStatus?: boolean;
  className?: string;
};

/** "● 2026 · TOOL · EXPT · LIVE" line shown above project titles. */
export default function ProjectMeta({
  project,
  showStatus = true,
  className = '',
}: Props) {
  const parts = [project.year, ...project.categories];
  if (showStatus) parts.push(project.status);

  return (
    <div
      className={`flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-fg-subtle ${className}`}
    >
      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      {parts.join(' · ')}
    </div>
  );
}
