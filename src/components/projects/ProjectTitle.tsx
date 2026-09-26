import type { Project } from '@/data/projects';

/** "Title — *accent*" — callers wrap it in the heading level they need. */
export default function ProjectTitle({
  project,
}: {
  project: Pick<Project, 'title' | 'accent'>;
}) {
  return (
    <>
      {project.title}
      {project.accent && (
        <>
          {' — '}
          <span className="font-serif font-normal text-accent italic">
            {project.accent}
          </span>
        </>
      )}
    </>
  );
}
