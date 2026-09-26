import { useId, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { Icon, GitHubIcon } from '@/components/icons';
import ProjectHeroPreview from '@/components/projects/ProjectHeroPreview';
import ProjectMeta from '@/components/projects/ProjectMeta';
import ProjectTitle from '@/components/projects/ProjectTitle';
import TagList from '@/components/projects/TagList';
import { LinkButton } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { liveLinkLabel, type Project } from '@/data/projects';

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const titleId = useId();
  // Keep the last project rendered while the dialog closes (see Modal).
  const [shown, setShown] = useState(project);
  if (project && project !== shown) setShown(project);
  const p = project ?? shown;

  return (
    <Modal
      open={project !== null}
      onClose={onClose}
      labelledBy={titleId}
      className="max-h-[calc(100dvh-2.5rem)] w-[560px] max-w-[calc(100%-2.5rem)] overflow-y-auto overflow-x-hidden rounded-[16px] border border-border-DEFAULT bg-surface shadow-[0_24px_64px_rgba(15,10,6,0.28),0_8px_24px_rgba(15,10,6,0.14)] backdrop:bg-[rgb(28_25_23/0.55)] backdrop:backdrop-blur-[6px] open:animate-[modal-in_220ms_cubic-bezier(0.2,0.8,0.2,1)]"
    >
      {p && (
        <>
          <div className="relative">
            <ProjectHeroPreview
              image={p.previewImage}
              alt={`${p.title} preview`}
              className="h-[160px]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="overlay-button absolute right-3 top-3 h-[30px] w-[30px]"
            >
              <Icon.Close className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="px-6 pb-[22px] pt-5">
            <ProjectMeta project={p} className="mb-2.5" />
            <h2
              id={titleId}
              className="mb-2.5 text-[24px] font-bold tracking-[-0.02em] text-fg-strong sm:text-[28px]"
            >
              <ProjectTitle project={p} />
            </h2>
            <p className="mb-4 text-[14.5px] leading-[1.6] text-fg-muted">
              {p.summary}
            </p>

            <dl className="mb-4 grid grid-cols-2 gap-3 border-y border-border-DEFAULT py-3 sm:grid-cols-3">
              <Fact label="Role">{p.role}</Fact>
              <Fact label="Timeline">{p.timeline}</Fact>
              {p.bundle && <Fact label="Bundle">{p.bundle}</Fact>}
            </dl>

            <TagList tags={p.tags} className="mb-[18px]" />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                to={`/projects/${p.slug}`}
                onClick={onClose}
                className="flex items-center gap-1.5 px-0.5 py-2 text-[13px] font-medium text-fg-muted no-underline hover:text-fg-strong"
              >
                Read full case study <Icon.ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex gap-2">
                {p.links.source && (
                  <LinkButton
                    href={p.links.source}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  >
                    <GitHubIcon className="h-3.5 w-3.5" />
                    Source
                  </LinkButton>
                )}
                {p.links.live && (
                  <LinkButton
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                  >
                    <Icon.ArrowUpRight className="h-3.5 w-3.5" />
                    {liveLinkLabel(p)}
                  </LinkButton>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="mb-[3px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-subtle">
        {label}
      </dt>
      <dd className="text-[13px] font-medium text-fg-strong">{children}</dd>
    </div>
  );
}
