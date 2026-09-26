import { useState } from 'react';
import { Link } from 'react-router';
import { Icon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectModal from '@/components/projects/ProjectModal';
import { LinkButton } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PROFILE } from '@/data/profile';
import { PROJECTS, sortProjects, type Project } from '@/data/projects';

// The two newest projects; ties keep their order in PROJECTS.
const SELECTED_WORK = sortProjects(PROJECTS, 'year-desc').slice(0, 2);

const socialLink =
  'flex items-center gap-1.5 text-fg-muted no-underline hover:text-fg-strong';

export default function Home() {
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <>
      <Container className="pb-24 pt-10 sm:pt-14">
        <div className="flex max-w-[780px] flex-col gap-8">
          <div>
            <Eyebrow>
              Front-end developer · {PROFILE.location.toUpperCase()}
            </Eyebrow>
            <h1 className="mt-3 mb-5 text-[44px] font-bold leading-[1.02] tracking-[-0.03em] text-fg-strong sm:text-[60px] md:text-[72px]">
              Hello<span className="text-accent">.</span>{' '}
              <span className="font-serif font-normal italic">I build</span>{' '}
              things
              <br className="hidden sm:block" /> for the web.
            </h1>
            <p className="max-w-[620px] text-[17px] leading-[1.6] text-fg-muted sm:text-[19px]">
              I'm {PROFILE.name} — a front-end developer focused on React,
              TypeScript, and the kind of small details that make interfaces
              feel good. Lately I've been shipping AI-assisted browser games.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <LinkButton to="/contact" variant="primary" size="lg">
              Get in touch <Icon.ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton to="/projects" variant="secondary" size="lg">
              View projects
            </LinkButton>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 font-mono text-[13px] text-fg-subtle">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className={socialLink}
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className={socialLink}
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a href={`mailto:${PROFILE.email}`} className={socialLink}>
              <Icon.Mail className="h-4 w-4" />
              {PROFILE.email}
            </a>
          </div>

          <section className="mt-10 border-t border-border-DEFAULT pt-8">
            <div className="mb-5 flex items-baseline justify-between">
              <h2 className="text-[22px] font-semibold text-fg-strong">
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
        </div>
      </Container>

      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </>
  );
}
