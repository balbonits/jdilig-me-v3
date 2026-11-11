import type { ReactNode } from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from '@/components/ui/Link';
import { Icon, GitHubIcon } from '@/components/icons';
import { LinkButton } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import RichText from '@/components/ui/RichText';
import { getAcrHtml } from '@/data/acr';
import { uxMeta } from '@/data/pages';
import { getUxCaseStudy, uxPath, type UxCaseStudy as Study } from '@/data/ux';
import { usePageMeta } from '@/hooks/usePageMeta';
import NotFound from '@/routes/NotFound';

export default function UxCaseStudy() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const study = getUxCaseStudy(slug);
  // One URL per study: /ux/<slug>, or its own path (e.g. /ux/job-tracker/case-study).
  if (!study || pathname.replace(/\/$/, '') !== uxPath(study)) return <NotFound />;
  return <StudyPage key={study.slug} study={study} />;
}

function StudyPage({ study: s }: { study: Study }) {
  usePageMeta(uxMeta(s));
  const acr = getAcrHtml(s.slug);

  return (
    <Container size="narrow" className="pb-24 pt-10 sm:pt-14">
      <Link
        to="/ux"
        className="mb-6 inline-flex min-h-11 items-center gap-1.5 rounded-md px-1.5 py-2 text-sm font-medium text-fg-muted no-underline hover:bg-bg-muted hover:text-fg-strong"
      >
        <Icon.ArrowRight className="h-3.5 w-3.5 rotate-180" />
        All UX case studies
      </Link>

      <div className="mb-10">
        <Eyebrow>UX case study</Eyebrow>
        <h1 style={{ viewTransitionName: 'ux-title' }} className="mt-3 mb-3.5 text-[34px] font-bold leading-[1.08] tracking-[-0.03em] text-fg-strong sm:text-[44px]">
          {s.title}
        </h1>
        <p className="mb-6 text-[17px] leading-[1.55] text-fg-muted sm:text-[18px]">{s.lede}</p>
        <div className="flex flex-wrap gap-2">
          <LinkButton
            href={s.links.demo.href}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            className="min-h-11"
            data-track-cta={`ux-${s.slug}-demo`}
          >
            <Icon.ArrowUpRight className="h-3.5 w-3.5" />
            {s.links.demo.label}
          </LinkButton>
          <LinkButton
            href={s.links.source}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="min-h-11"
            data-track-cta={`ux-${s.slug}-source`}
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            View the code
          </LinkButton>
        </div>
      </div>

      {s.images.length > 0 && (
        <div className="mb-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {/* The gallery sits in the first viewport on every width, so it loads
              eagerly and the first shot (the LCP element on mobile) is fetched
              at high priority (PERF-100). */}
          {s.images.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="eager"
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className="h-auto w-full rounded-[12px] border border-border-DEFAULT"
            />
          ))}
        </div>
      )}

      {s.sections.map((sec) => (
        <Sect key={sec.title} title={sec.title}>
          {sec.paragraphs?.map((p) => (
            <p key={p}>
              <RichText text={p} />
            </p>
          ))}
          {sec.bullets && (
            <ul className="m-0 flex list-disc flex-col gap-[7px] pl-[18px]">
              {sec.bullets.map((b) => (
                <li key={b}>
                  <RichText text={b} />
                </li>
              ))}
            </ul>
          )}
        </Sect>
      ))}

      {acr && (
        <Sect title="Accessibility Conformance Report" id="acr">
          {/* Generated from the project's docs/ACR.md (scripts/acr-to-html.mjs); trusted, repo-committed markup. */}
          <div dangerouslySetInnerHTML={{ __html: acr }} />
        </Sect>
      )}
    </Container>
  );
}

function Sect({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section className="mb-8" id={id}>
      <h2 className="mb-3.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {title}
      </h2>
      <div className="flex flex-col gap-3.5 text-[15px] leading-[1.7] text-fg-muted">{children}</div>
    </section>
  );
}
