import type { ReactNode } from 'react';
import { Icon } from '@/components/icons';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PAGES } from '@/data/pages';
import { PROFILE } from '@/data/profile';
import {
  EDUCATION,
  EXPERIENCE,
  HEADLINE,
  SKILLS,
  STATUS,
  SUMMARY,
  type Job,
} from '@/data/resume';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Resume() {
  usePageMeta(PAGES.resume);

  return (
    <Container size="narrow" className="pb-24 pt-10 sm:pt-14">
      <div className="mb-8">
        <Eyebrow>Resume</Eyebrow>
        <h1 className="mt-3 text-[34px] font-bold tracking-[-0.03em] text-fg-strong sm:text-[40px]">
          {PROFILE.fullName}
        </h1>
        <p className="mt-2 text-[15px] text-fg-muted">{HEADLINE}</p>
        <p className="mt-1 text-[15px] text-fg-muted">{STATUS}</p>
        <DownloadRow />
      </div>

      <Section title="About">
        <p className="text-[15px] leading-[1.7] text-fg-muted">{SUMMARY}</p>
      </Section>

      <Section title="Experience">
        {EXPERIENCE.map((job) => (
          <JobEntry key={`${job.company}-${job.when}`} job={job} />
        ))}
      </Section>

      <Section title="Skills">
        <ul className="flex flex-wrap gap-1.5">
          {SKILLS.map((item) => (
            <li
              key={item}
              className="rounded-[2px] border border-border-DEFAULT bg-bg-muted px-[9px] py-[3px] font-mono text-[11.5px] text-fg-strong"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <p className="text-[15px] text-fg-muted">{EDUCATION}</p>
      </Section>
    </Container>
  );
}

/** "Download resume (PDF, size)" row: full width on phones, 48px high. */
export function DownloadRow() {
  return (
    <a
      href={PROFILE.resumePdf}
      download
      className="mt-5 flex min-h-12 w-full items-center gap-2 rounded-[2px] border border-border-DEFAULT bg-surface px-4 text-[15px] font-medium text-accent underline underline-offset-[3px] sm:w-auto sm:inline-flex"
    >
      <Icon.Document className="h-4 w-4" aria-hidden="true" />
      Download resume (PDF, {PROFILE.resumePdfSize})
    </a>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-9">
      <h2 className="mb-4 border-b border-border-DEFAULT pb-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {title}
      </h2>
      {children}
    </section>
  );
}

function JobEntry({ job }: { job: Job }) {
  return (
    <article className="mb-6">
      <div className="mb-[3px] flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="text-[15px] font-semibold text-fg-strong">
          {job.role} · {job.company}
        </h3>
        <div className="whitespace-nowrap font-mono text-xs text-fg-subtle">
          {job.when}
        </div>
      </div>
      <p className="text-sm leading-[1.6] text-fg-muted">{job.summary}</p>
    </article>
  );
}
