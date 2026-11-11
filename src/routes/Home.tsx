import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Link } from '@/components/ui/Link';
import { Icon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import CopyEmail from '@/components/home/CopyEmail';
import SectionTitle from '@/components/home/SectionTitle';
import ProjectMeta from '@/components/projects/ProjectMeta';
import ProjectTitle from '@/components/projects/ProjectTitle';
import TagList from '@/components/projects/TagList';
import { LinkButton } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PAGES } from '@/data/pages';
import { PROFILE } from '@/data/profile';
import { PROJECTS, liveLinkLabel, type Project } from '@/data/projects';
import { EXPERIENCE, HEADLINE, SKILLS, STATUS, SUMMARY } from '@/data/resume';
import { DownloadRow } from '@/routes/Resume';
import { usePageMeta } from '@/hooks/usePageMeta';

// UX-FEEL-SPEC v2 section 2: four featured projects, in this order.
const FEATURED_SLUGS = ['city-app-framework', 'squanto', 'coding-interview-reviewer', 'jdilig-me'];
const FEATURED = FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(
  (p): p is Project => Boolean(p),
);

// Old links used #work for the projects section.
const HASH_ALIASES: Record<string, string> = { work: 'projects' };

/** Scrolls to an in-page section and moves focus to its heading. */
function jumpTo(hash: string) {
  const id = hash.replace(/^#/, '');
  if (!id) return;
  const target = document.getElementById(HASH_ALIASES[id] ?? id);
  if (!target) return;
  const heading = target.matches('h2, h3') ? target : target.querySelector<HTMLElement>('h2');
  target.scrollIntoView();
  heading?.focus({ preventScroll: true });
}

const NEW_TAB = <span className="sr-only"> (opens in new tab)</span>;

const iconLink =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[2px] border border-border-strong bg-surface px-3 text-[15px] font-medium text-fg-strong no-underline transition-all duration-150 ease-out hover:bg-bg-subtle motion-safe:hover:-translate-y-px motion-safe:active:scale-[0.98]';

function years(when: string) {
  const ys = when.match(/\d{4}/g) ?? [];
  if (ys.length === 0) return when;
  return ys[0] === ys[ys.length - 1] ? ys[0] : `${ys[0]}–${ys[ys.length - 1]}`;
}

export default function Home() {
  usePageMeta(PAGES.home);

  useEffect(() => {
    jumpTo(window.location.hash);
    const onHash = () => jumpTo(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <>
      <div className="build-plate">
        <Container className="pb-14 pt-8 sm:pt-14 lg:pb-24">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>
                {PROFILE.role} · {PROFILE.location}
              </Eyebrow>
              <h1 className="mt-3 mb-4 text-[length:min(clamp(2.25rem,1.9rem+3.146vw,4.75rem),calc((100vw-24px)/6.5))] font-bold leading-[1.02] tracking-[-0.03em] text-fg-strong max-sm:text-[length:min(2.5rem,calc((100vw-24px)/6.5))]">
                <span className="sr-only">Home: </span>
                <span className="block">
                  Hello.{' '}
                  <span aria-hidden="true" className="wave inline-block">
                    👋
                  </span>
                </span>
                <span className="block">
                  <span className="swash relative inline-block font-serif font-normal italic text-accent">
                    I build
                    <svg aria-hidden="true" viewBox="0 0 200 16" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[0.18em] w-full overflow-visible">
                      <path d="M3 11 C 50 3, 120 3, 197 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" pathLength="1" />
                    </svg>
                  </span>{' '}
                  things
                </span>
                <span className="block">for the web.</span>
              </h1>
              <p className="text-[18px] font-semibold leading-[1.4] text-fg-strong sm:text-[21px]">{HEADLINE}</p>
            </div>

            <div className="flex flex-col gap-4 rounded-[12px] border border-border-DEFAULT bg-surface p-4 sm:p-6 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-start">
              <div className="flex flex-col gap-2">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border-DEFAULT bg-bg px-3 py-1 text-sm font-semibold text-fg-strong">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#1f8a4c] dark:bg-[#4ade80]" />
                  Available now
                </span>
                <p className="text-[15px] leading-[1.55] text-fg-muted">{STATUS}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5" aria-label="Core stack">
                {SKILLS.slice(0, 6).map((s) => (
                  <li key={s} className="rounded-[2px] border border-border-DEFAULT bg-bg-muted px-2 py-0.5 font-mono text-[12px] text-fg-strong">
                    {s}
                  </li>
                ))}
                <li>
                  <a href="#experience" className="prose-link inline-flex items-center px-1 py-0.5 font-mono text-[12px]">
                    + more
                  </a>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <LinkButton href={PROFILE.resumePdf} download variant="primary" size="lg" className="group/btn max-sm:w-full">
                  <Icon.Download className="h-4 w-4 transition-transform duration-150 motion-safe:group-hover/btn:translate-y-0.5" aria-hidden="true" />
                  Download resume (PDF, {PROFILE.resumePdfSize})
                </LinkButton>
                <LinkButton href={`mailto:${PROFILE.email}`} variant="secondary" size="lg">
                  <Icon.Mail className="h-4 w-4" aria-hidden="true" /> Email me
                </LinkButton>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={iconLink}>
                  <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="max-md:sr-only">LinkedIn</span>
                  {NEW_TAB}
                </a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className={iconLink}>
                  <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="max-md:sr-only">GitHub</span>
                  {NEW_TAB}
                </a>
              </div>
              <a href="#projects" data-track-cta="see-projects" className="prose-link inline-flex min-h-11 items-center gap-1 self-start text-[15px]">
                See projects <Icon.ArrowRight className="h-4 w-4 rotate-90" aria-hidden="true" />
              </a>
            </div>

            <p className="max-w-[65ch] text-[16px] leading-[1.6] text-fg-muted sm:text-[18px] lg:col-span-7 lg:row-start-2">
              I'm {PROFILE.name} — a front-end developer focused on React,
              TypeScript, and the kind of small details that make interfaces
              feel good. Lately I've been shipping AI-assisted browser games.
            </p>
          </div>
        </Container>
      </div>

      <section id="projects" aria-labelledby="projects-title" className="scroll-mt-4 py-16 lg:py-24">
        <span id="work" aria-hidden="true" />
        <Container>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3" data-reveal>
            <SectionTitle id="projects-title" num="01">Projects</SectionTitle>
            <Link to="/projects" className="group/btn inline-flex min-h-11 items-center gap-1.5 rounded-[2px] px-3 text-sm font-medium text-fg-muted no-underline transition hover:bg-bg-muted hover:text-fg-strong">
              All projects <Icon.ArrowRight className="h-4 w-4 transition-transform duration-150 motion-safe:group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {FEATURED.map((p, i) => (
              <HomeProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section id="resume" aria-labelledby="resume-title" className="scroll-mt-4 border-y border-border-DEFAULT bg-surface py-16 lg:py-24">
        <Container>
          <div className="max-w-[820px]" data-reveal>
            <SectionTitle id="resume-title" num="02">Resume</SectionTitle>
            <p className="mt-5 max-w-[65ch] text-[16px] leading-[1.6] text-fg-muted">{SUMMARY}</p>
            <p className="mt-3 max-w-[65ch] text-[16px] leading-[1.6] text-fg-muted">{STATUS}</p>
          </div>
          <h3 id="experience" tabIndex={-1} className="mt-10 mb-3 scroll-mt-4 text-[17px] font-semibold text-fg-strong focus:outline-none">
            Experience
          </h3>
          <ol className="flex flex-col">
            {EXPERIENCE.map((job, i) => (
              <li
                key={`${job.company}-${job.when}`}
                data-reveal
                style={{ '--i': i } as CSSProperties}
                className="border-l-2 border-transparent px-3 py-3 transition-colors duration-150 hover:border-accent hover:bg-bg-muted focus-within:border-accent focus-within:bg-bg-muted"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-[16px] text-fg-muted">
                    <span className="font-semibold text-fg-strong">{job.role}</span> · {job.company}
                  </p>
                  <span className="font-mono text-[13px] text-fg-subtle">{years(job.when)}</span>
                </div>
                <p className="mt-1 max-w-[80ch] text-[15px] leading-[1.55] text-fg-muted max-sm:line-clamp-2">{job.summary}</p>
              </li>
            ))}
          </ol>
          <h3 className="mt-10 mb-3 text-[17px] font-semibold text-fg-strong">Skills</h3>
          <ul className="flex flex-wrap gap-1.5">
            {SKILLS.map((s) => (
              <li key={s} className="rounded-[2px] border border-border-DEFAULT bg-bg-muted px-2 py-0.5 font-mono text-[12px] text-fg-strong">
                {s}
              </li>
            ))}
          </ul>
          <DownloadRow />
          <p className="mt-4 text-[16px]">
            <Link to="/resume" className="prose-link inline-flex min-h-11 items-center" data-track-cta="full-resume">
              Full resume
            </Link>
          </p>
        </Container>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-4 py-16 lg:py-24">
        <Container>
          <div className="max-w-[720px]" data-reveal>
            <SectionTitle id="contact-title" num="03">Contact</SectionTitle>
            <p className="mt-4 mb-6 text-[16px] leading-[1.6] text-fg-muted">
              Freelance, full-time, or just to chat about shaders and basketball. I
              reply within a day or two.
            </p>
            <CopyEmail />
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={iconLink}>
                <LinkedInIcon className="h-4 w-4" aria-hidden="true" /> LinkedIn{NEW_TAB}
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className={iconLink}>
                <GitHubIcon className="h-4 w-4" aria-hidden="true" /> GitHub{NEW_TAB}
              </a>
              <LinkButton to="/contact" variant="ghost" size="lg" data-track-cta="get-in-touch" className="group/btn">
                Get in touch <Icon.ArrowRight className="h-4 w-4 transition-transform duration-150 motion-safe:group-hover/btn:translate-x-0.5" />
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function HomeProjectCard({ project: p, index }: { project: Project; index: number }) {
  const textLink =
    'inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-accent underline underline-offset-[3px] hover:decoration-2';
  return (
    <article
      data-reveal
      style={{ '--i': index } as CSSProperties}
      className="project-card group flex flex-col gap-2.5 rounded-[12px] border border-border-DEFAULT bg-surface p-5 transition-all duration-200 ease-out hover:border-border-strong motion-safe:hover:-translate-y-0.5"
    >
      <ProjectMeta project={p} showStatus={false} />
      <h3 className="text-[19px] font-semibold tracking-[-0.01em]">
        <Link to={`/projects/${p.slug}`} data-track-project={p.slug} className="text-fg-strong no-underline hover:underline">
          <ProjectTitle project={p} />
        </Link>
      </h3>
      <p className="text-[16px] leading-[1.55] text-fg-muted max-sm:line-clamp-2">{p.desc}</p>
      <TagList tags={p.tags.slice(0, 5)} className="mt-0.5" />
      <div className="mt-auto flex flex-wrap gap-x-5 pt-1">
        {p.links.live && (
          <a href={p.links.live} target="_blank" rel="noreferrer" className={textLink}>
            {liveLinkLabel(p)}
            <span className="sr-only">: {p.title}, opens in new tab</span>
          </a>
        )}
        {p.links.source && (
          <a href={p.links.source} target="_blank" rel="noreferrer" className={textLink}>
            Code
            <span className="sr-only">: {p.title}, opens in new tab</span>
          </a>
        )}
      </div>
    </article>
  );
}
