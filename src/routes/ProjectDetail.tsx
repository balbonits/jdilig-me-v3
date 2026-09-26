import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { Icon, GitHubIcon } from '@/components/icons';
import LighthouseScores from '@/components/projects/LighthouseScores';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectHeroPreview from '@/components/projects/ProjectHeroPreview';
import ProjectMeta from '@/components/projects/ProjectMeta';
import ProjectTitle from '@/components/projects/ProjectTitle';
import TagList from '@/components/projects/TagList';
import { LinkButton } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import RichText from '@/components/ui/RichText';
import { getAdjacent, getProject, liveLinkLabel } from '@/data/projects';
import { displayUrl } from '@/lib/url';

export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const p = getProject(slug);

  if (!p) {
    return (
      <Container className="py-14">
        <p className="text-fg-muted">Project not found.</p>
        <Link to="/projects" className="mt-4 inline-block text-accent">
          ← Back to projects
        </Link>
      </Container>
    );
  }

  const { prev, next } = getAdjacent(slug);

  return (
    <Container className="pb-24 pt-10 sm:pt-14">
      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-1.5 rounded-md px-1.5 py-2 text-sm font-medium text-fg-muted no-underline hover:bg-bg-muted hover:text-fg-strong"
      >
        <Icon.ArrowRight className="h-3.5 w-3.5 rotate-180" />
        All projects
      </Link>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[640px]">
          <ProjectMeta project={p} className="mb-3" />
          <h1 className="mb-3.5 text-[38px] font-bold leading-[1.05] tracking-[-0.03em] text-fg-strong sm:text-[56px] sm:leading-[1.02]">
            <ProjectTitle project={p} />
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.55] text-fg-muted sm:text-[18px]">
            {p.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
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

      {p.lighthouse && (
        <LighthouseScores data={p.lighthouse} className="mb-10" />
      )}

      {p.gallery?.length ? (
        <ProjectGallery images={p.gallery} className="mb-12" />
      ) : (
        p.links.live && (
          <div className="mb-10">
            <div className="flex items-center gap-2.5 rounded-t-[12px] border border-b-0 border-[#292524] bg-[#0c0a09] px-3.5 py-2.5">
              <div className="flex shrink-0 gap-1.5" aria-hidden>
                <div className="h-2.5 w-2.5 rounded-full bg-[#44403c]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#44403c]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#44403c]" />
              </div>
              <div className="truncate font-mono text-[11px] text-[#a8a29e]">
                {displayUrl(p.links.live)}
              </div>
            </div>
            <ProjectHeroPreview
              starCount={80}
              image={p.previewImage}
              alt={`${p.title} preview`}
              priority
              className="h-[220px] rounded-b-[12px] border border-t-0 border-[#292524] sm:h-[360px]"
            />
          </div>
        )
      )}

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_240px]">
        <div>
          <Sect title="Overview">
            {p.overview.map((para) => (
              <p key={para}>
                <RichText text={para} />
              </p>
            ))}
          </Sect>

          <Sect title="Highlights">
            <ul className="m-0 flex list-disc flex-col gap-[7px] pl-[18px] text-[14.5px] leading-[1.65] text-fg-muted">
              {p.highlights.map((h) => (
                <li key={h}>
                  <RichText text={h} />
                </li>
              ))}
            </ul>
          </Sect>

          {p.learned && (
            <Sect title="What I learned">
              <p>
                <RichText text={p.learned} />
              </p>
            </Sect>
          )}
        </div>

        <aside className="flex flex-col gap-[22px] md:sticky md:top-[88px] md:self-start">
          <Meta label="Stack">
            <TagList tags={p.tags} />
          </Meta>
          <Meta label="Role">{p.role}</Meta>
          <Meta label="Timeline">{p.timeline}</Meta>
          {p.bundle && <Meta label="Bundle">{p.bundle}</Meta>}
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

      <nav
        aria-label="More projects"
        className="mt-16 flex justify-between gap-4 border-t border-border-DEFAULT pt-6"
      >
        <Link
          to={`/projects/${prev.slug}`}
          className="block rounded-md py-2.5 text-left no-underline hover:opacity-80"
        >
          <div className="font-mono text-[10px] tracking-[0.12em] text-fg-subtle">
            ← PREVIOUS
          </div>
          <div className="text-sm font-semibold text-fg-strong">{prev.title}</div>
        </Link>
        <Link
          to={`/projects/${next.slug}`}
          className="block rounded-md py-2.5 text-right no-underline hover:opacity-80"
        >
          <div className="font-mono text-[10px] tracking-[0.12em] text-fg-subtle">
            NEXT →
          </div>
          <div className="text-sm font-semibold text-fg-strong">{next.title}</div>
        </Link>
      </nav>
    </Container>
  );
}

function Sect({ title, children }: { title: string; children: ReactNode }) {
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

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
        {label}
      </div>
      <div className="text-[13.5px] leading-[1.5] text-fg">{children}</div>
    </div>
  );
}
