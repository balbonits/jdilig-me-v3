import { Icon } from '@/components/icons';
import ProjectHeroPreview from '@/components/projects/ProjectHeroPreview';
import ProjectMeta from '@/components/projects/ProjectMeta';
import ProjectTitle from '@/components/projects/ProjectTitle';
import TagList from '@/components/projects/TagList';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
  onClick: () => void;
};

export default function FeaturedProjectCard({ project, onClick }: Props) {
  return (
    <article className="group relative grid w-full grid-cols-1 overflow-hidden rounded-[16px] border border-border-DEFAULT bg-surface shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-xl has-[:focus-visible]:border-accent has-[:focus-visible]:shadow-[var(--ring)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="relative">
        {/* Full width until md, then the left ~51% column of a card at most 1040 px wide. */}
        <ProjectHeroPreview
          starCount={90}
          image={project.previewImage}
          alt={`${project.title} preview`}
          priority
          sizes="(min-width: 1120px) 540px, (min-width: 768px) 50vw, (min-width: 640px) calc(100vw - 80px), calc(100vw - 40px)"
          className="h-[220px] sm:h-[280px] md:h-full md:min-h-[320px]"
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Featured project
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <ProjectMeta project={project} />
          <Icon.ArrowUpRight className="h-4 w-4 shrink-0 text-fg-faint transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>

        <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-fg-strong md:text-[32px]">
          {/* The ::after overlay stretches the button over the whole card. */}
          <button
            type="button"
            onClick={onClick}
            className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-[16px] focus-visible:shadow-none"
          >
            <ProjectTitle project={project} />
          </button>
        </h2>

        <p className="text-[14.5px] leading-[1.6] text-fg-muted">
          {project.summary}
        </p>

        <TagList tags={project.tags} className="mt-auto pt-1" />
      </div>
    </article>
  );
}
