import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Icon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectModal from '@/components/projects/ProjectModal';
import { LinkButton } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PAGES } from '@/data/pages';
import { PROFILE } from '@/data/profile';
import { PROJECTS, type Project } from '@/data/projects';
import { EXPERIENCE, STATUS, SUMMARY } from '@/data/resume';
import { DownloadRow } from '@/routes/Resume';
import { usePageMeta } from '@/hooks/usePageMeta';

// Design spec v1.0 section 6: lead with City App Framework; no employer work.
const SELECTED_SLUGS = ['city-app-framework', 'jdilig-me', 'coding-interview-reviewer'];
const SELECTED_WORK = SELECTED_SLUGS.map((slug) =>
  PROJECTS.find((p) => p.slug === slug),
).filter((p): p is Project => Boolean(p));

// Years only for the one-line experience list (UX-IA R2).
function years(when: string) {
  const ys = when.match(/\d{4}/g) ?? [];
  if (ys.length === 0) return when;
  return ys[0] === ys[ys.length - 1] ? ys[0] : `${ys[0]}–${ys[ys.length - 1]}`;
}

const socialLink =
  'flex items-center gap-1.5 text-fg-muted no-underline hover:text-fg-strong';

export default function Home() {
  usePageMeta(PAGES.home);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const { hash } = useLocation();

  // Header "Resume" links to /#resume; jump there after navigation.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <div className="build-plate">
        <Container className="pb-12 pt-10 sm:pt-14">
          <div className="flex max-w-[780px] flex-col gap-8">
            <div>
              <Eyebrow>
                Front-end developer · {PROFILE.location.toUpperCase()}
              </Eyebrow>
              <h1 className="mt-3 mb-5 text-[length:min(clamp(2.5rem,2.233rem+3.146vw,4.75rem),calc((100vw-24px)/6))] font-bold leading-[1.02] tracking-[-0.03em] text-fg-strong">
                <span className="block">Hello.</span>
                <span className="block">
                  <span className="font-serif font-normal italic text-accent">I build</span>{' '}
                  things
                </span>
                <span className="block">for the web.</span>
              </h1>
              <p className="max-w-[620px] text-[17px] leading-[1.6] text-fg-muted sm:text-[19px]">
                I'm {PROFILE.name} — a front-end developer focused on React,
                TypeScript, and the kind of small details that make interfaces
                feel good. Lately I've been shipping AI-assisted browser games.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <LinkButton href="#work" variant="primary" size="lg">
                See the work <Icon.ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton to="/contact" variant="secondary" size="lg">
                Get in touch
              </LinkButton>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 font-mono text-[13px] text-fg-subtle">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={socialLink}>
                <LinkedInIcon className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className={socialLink}>
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a href={`mailto:${PROFILE.email}`} className={socialLink}>
                <Icon.Mail className="h-4 w-4" />
                {PROFILE.email}
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pb-24">
        <div className="flex max-w-[780px] flex-col gap-8">
          <section id="work" aria-labelledby="work-title" className="scroll-mt-4 border-t border-border-DEFAULT pt-8">
            <div className="mb-5 flex items-baseline justify-between">
              <h2 id="work-title" className="text-[22px] font-semibold text-fg-strong">
                Selected work
              </h2>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-[7px] text-sm font-medium text-fg-muted no-underline transition hover:bg-bg-muted hover:text-fg-strong"
              >
                See all <Icon.ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
              {SELECTED_WORK.map((p) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  onClick={() => setModalProject(p)}
                />
              ))}
            </div>
          </section>

          <section id="resume" aria-labelledby="resume-title" className="scroll-mt-4 border-t border-border-DEFAULT pt-8">
            <h2 id="resume-title" className="mb-4 text-[22px] font-semibold text-fg-strong">
              Resume
            </h2>
            <p className="text-[15px] leading-[1.7] text-fg-muted">{SUMMARY}</p>
            <p className="mt-3 text-[15px] leading-[1.7] text-fg-muted">{STATUS}</p>
            <DownloadRow />
            <h3 className="mt-8 mb-3 text-[15px] font-semibold text-fg-strong">Experience</h3>
            <ol className="flex flex-col gap-2">
              {EXPERIENCE.map((job) => (
                <li key={`${job.company}-${job.when}`} className="flex flex-wrap justify-between gap-x-3 text-sm text-fg-muted">
                  <span>
                    <span className="font-medium text-fg-strong">{job.role}</span>, {job.company}
                  </span>
                  <span className="font-mono text-xs text-fg-subtle">{years(job.when)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm">
              <Link to="/resume" className="prose-link">Full resume</Link>
            </p>
          </section>
        </div>
      </Container>

      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </>
  );
}
