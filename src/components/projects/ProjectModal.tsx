import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Icon, GitHubIcon } from '@/components/icons';
import { liveLinkLabel, type Project } from '@/data/projects';
import ProjectHeroPreview from '@/components/projects/ProjectHeroPreview';
import { LinkButton } from '@/components/ui/Button';

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;
  const p = project;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <div
        onClick={onClose}
        className="absolute inset-0"
        style={{
          background: 'rgba(28, 25, 23, 0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      />

      <div
        className="relative w-[560px] max-w-full overflow-hidden rounded-[16px] border border-border-DEFAULT bg-surface"
        style={{
          boxShadow:
            '0 24px 64px rgba(15, 10, 6, 0.28), 0 8px 24px rgba(15, 10, 6, 0.14)',
          animation: 'modalIn 220ms cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        <div className="relative">
          <ProjectHeroPreview
            height={160}
            starCount={50}
            image={p.previewImage}
            alt={`${p.title} preview`}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full"
            style={{
              background: 'rgba(28, 25, 23, 0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fafaf9',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <Icon.Close className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="px-6 pb-[22px] pt-5">
          <div className="mb-2.5 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-fg-subtle">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {p.year} · {p.kind} · {p.status}
          </div>
          <h2 className="mb-2.5 text-[28px] font-bold tracking-[-0.02em] text-fg-strong">
            {p.title}
            {p.accent && (
              <>
                {' — '}
                <span className="font-serif text-accent italic font-normal">
                  {p.accent}
                </span>
              </>
            )}
          </h2>
          <p className="mb-4 text-[14.5px] leading-[1.6] text-fg-muted">
            {p.summary}
          </p>

          <div className="mb-4 grid grid-cols-3 gap-3 border-y border-border-DEFAULT py-3">
            <Fact label="Role">{p.role}</Fact>
            <Fact label="Timeline">{p.timeline}</Fact>
            <Fact label="Bundle">{p.bundle}</Fact>
          </div>

          <div className="mb-[18px] flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-[5px] border border-border-DEFAULT bg-bg-muted px-[7px] py-0.5 font-mono text-[10.5px] text-fg-strong"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate(`/projects/${p.slug}`);
              }}
              className="flex cursor-pointer items-center gap-1.5 px-0.5 py-2 text-[13px] font-medium text-fg-muted hover:text-fg-strong"
            >
              Read full case study <Icon.ArrowRight className="h-4 w-4" />
            </button>
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
      </div>
    </div>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-[3px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-subtle">
        {label}
      </div>
      <div className="text-[13px] font-medium text-fg-strong">{children}</div>
    </div>
  );
}
