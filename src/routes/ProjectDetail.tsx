import { Link, useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { Icon, GitHubIcon } from '@/components/icons';
import { LinkButton } from '@/components/ui/Button';
import ProjectHeroPreview from '@/components/projects/ProjectHeroPreview';
import ProjectGallery from '@/components/projects/ProjectGallery';
import LighthouseScores from '@/components/projects/LighthouseScores';
import { getAdjacent, getProject, liveLinkLabel } from '@/data/projects';

export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-[1120px] px-10 py-14">
        <p className="text-fg-muted">Project not found.</p>
        <Link to="/projects" className="mt-4 inline-block text-accent">
          ← Back to projects
        </Link>
      </div>
    );
  }

  const p = project;
  const { prev, next } = getAdjacent(slug);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-10 pb-24 pt-14">
      <button
        type="button"
        onClick={() => navigate('/projects')}
        className="mb-6 inline-flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-2 text-sm font-medium text-fg-muted hover:bg-bg-muted hover:text-fg-strong"
      >
        <Icon.ArrowRight className="h-3.5 w-3.5 rotate-180" />
        All projects
      </button>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[640px]">
          <div className="mb-3 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-fg-subtle">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {p.year} · {p.kind} · {p.status}
          </div>
          <h1 className="mb-3.5 text-[56px] font-bold leading-[1.02] tracking-[-0.03em] text-fg-strong">
            {p.title}
            {p.accent && (
              <>
                {' — '}
                <span className="font-serif text-accent italic font-normal">
                  {p.accent}
                </span>
              </>
            )}
          </h1>
          <p className="max-w-[560px] text-[18px] leading-[1.55] text-fg-muted">
            {p.summary}
          </p>
        </div>
        <div className="flex gap-2">
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
        </div>
      </div>

      {p.slug === 'jdilig-me' && <LighthouseScores className="mb-10" />}

      {p.gallery && p.gallery.length > 0 ? (
        <ProjectGallery images={p.gallery} className="mb-12" />
      ) : (
        (p.kind === 'GAME' || p.kind === 'SITE') && (
          <div className="mb-10">
            <div
              className="flex items-center justify-between rounded-t-[12px] border px-3.5 py-2.5"
              style={{
                background: '#0c0a09',
                borderColor: '#292524',
                borderBottom: 'none',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#44403c]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#44403c]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#44403c]" />
                </div>
                <div className="font-mono text-[11px] text-[#a8a29e]">
                  {p.slug}.jdilig.me
                </div>
              </div>
            </div>
            <ProjectHeroPreview
              height={360}
              starCount={80}
              image={p.previewImage}
              alt={`${p.title} preview`}
              className="rounded-b-[12px] border border-t-0"
            />
          </div>
        )
      )}

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_240px]">
        <div>
          <Sect title="Overview">
            {p.overview.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Sect>

          <Sect title="Highlights">
            <ul className="m-0 flex list-disc flex-col gap-[7px] pl-[18px] text-[14.5px] leading-[1.65] text-fg-muted">
              {p.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </Sect>

          {p.learned && (
            <Sect title="What I learned">
              <p>{p.learned}</p>
            </Sect>
          )}
        </div>

        <aside className="flex flex-col gap-[22px] md:sticky md:top-[88px] md:self-start">
          <Meta label="Stack">
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-[5px] border border-border-DEFAULT bg-bg-muted px-[7px] py-0.5 font-mono text-[10.5px] text-fg-strong"
                >
                  {t}
                </span>
              ))}
            </div>
          </Meta>
          <Meta label="Role">{p.role}</Meta>
          <Meta label="Timeline">{p.timeline}</Meta>
          {p.bundle !== '—' && <Meta label="Bundle">{p.bundle} gzipped</Meta>}
          {(p.links.live || p.links.source) && (
            <Meta label="Links">
              <div className="flex flex-col gap-1.5">
                {p.links.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[13px] text-accent no-underline hover:underline"
                  >
                    <Icon.ArrowUpRight className="h-3 w-3" />
                    Live
                  </a>
                )}
                {p.links.source && (
                  <a
                    href={p.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[13px] text-fg-muted no-underline hover:text-fg-strong hover:underline"
                  >
                    <GitHubIcon className="h-3 w-3" />
                    Source
                  </a>
                )}
              </div>
            </Meta>
          )}
        </aside>
      </div>

      <div className="mt-16 flex justify-between gap-4 border-t border-border-DEFAULT pt-6">
        <Link
          to={`/projects/${prev.slug}`}
          className="block rounded-md px-0 py-2.5 text-left no-underline hover:opacity-80"
        >
          <div className="font-mono text-[10px] tracking-[0.12em] text-fg-subtle">
            ← PREVIOUS
          </div>
          <div className="text-sm font-semibold text-fg-strong">
            {prev.title}
          </div>
        </Link>
        <Link
          to={`/projects/${next.slug}`}
          className="block rounded-md px-0 py-2.5 text-right no-underline hover:opacity-80"
        >
          <div className="font-mono text-[10px] tracking-[0.12em] text-fg-subtle">
            NEXT →
          </div>
          <div className="text-sm font-semibold text-fg-strong">
            {next.title}
          </div>
        </Link>
      </div>
    </div>
  );
}

function Sect({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {title}
      </h2>
      <div className="flex flex-col gap-3.5 text-[15px] leading-[1.7] text-fg-muted">
        {children}
      </div>
    </section>
  );
}

function Meta({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
        {label}
      </div>
      <div className="text-[13.5px] leading-[1.5] text-fg">{children}</div>
    </div>
  );
}
