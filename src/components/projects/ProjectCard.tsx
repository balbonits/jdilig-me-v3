import { Link } from 'react-router';
import { Icon } from '@/components/icons';
import ProjectMeta from '@/components/projects/ProjectMeta';
import ProjectTitle from '@/components/projects/ProjectTitle';
import TagList from '@/components/projects/TagList';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group relative flex flex-col gap-2.5 rounded-[12px] border border-border-DEFAULT bg-surface p-[18px] shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg has-[:focus-visible]:border-accent has-[:focus-visible]:shadow-[var(--ring)]">
      <div className="flex items-center justify-between gap-3">
        <ProjectMeta project={project} showStatus={false} />
        <Icon.ArrowUpRight className="h-4 w-4 shrink-0 text-fg-faint transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-fg-strong">
        {/* The ::after overlay stretches the link over the whole card. */}
        <Link
          to={`/projects/${project.slug}`}
          data-track-project={project.slug}
          className="text-fg-strong no-underline after:absolute after:inset-0 after:rounded-[12px] focus-visible:shadow-none"
        >
          <ProjectTitle project={project} />
        </Link>
      </h3>
      <p className="text-[13.5px] leading-[1.55] text-fg-muted">{project.desc}</p>
      <TagList tags={project.tags} className="mt-0.5" />
    </article>
  );
}
