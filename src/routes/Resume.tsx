import { Icon } from '@/components/icons';
import { LinkButton } from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { PROFILE } from '@/data/profile';
import { EDUCATION, EXPERIENCE, SKILLS, SUMMARY } from '@/data/resume';

export default function Resume() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-10 pb-24 pt-14">
      <div className="mb-8 flex items-baseline justify-between gap-6">
        <div>
          <Eyebrow>Resume</Eyebrow>
          <h1 className="mt-3 text-[40px] font-bold tracking-[-0.03em] text-fg-strong">
            {PROFILE.fullName}
          </h1>
          <p className="mt-2 font-mono text-[13px] leading-[1.7] text-fg-muted">
            {PROFILE.role} · {PROFILE.location}
            <br />
            <a href={`mailto:${PROFILE.email}`} className="text-accent">
              {PROFILE.email}
            </a>{' '}
            · {PROFILE.phone}
            <br />
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-fg-muted hover:text-fg-strong"
            >
              linkedin.com/in/rjdilig
            </a>{' '}
            ·{' '}
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="text-fg-muted hover:text-fg-strong"
            >
              github.com/balbonits
            </a>
          </p>
        </div>
        <LinkButton
          href={PROFILE.resumePdf}
          download
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          <Icon.Document className="h-3.5 w-3.5" /> Download PDF
        </LinkButton>
      </div>

      <Section title="Summary">
        <p className="text-[15px] leading-[1.7] text-fg-muted">{SUMMARY}</p>
      </Section>

      <Section title="Technical Skills">
        <div className="flex flex-col gap-3">
          {SKILLS.map((cat) => (
            <div key={cat.label}>
              <div className="mb-1.5 text-[13px] font-semibold text-fg-strong">
                {cat.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border-DEFAULT bg-bg-muted px-[9px] py-[3px] font-mono text-[11.5px] text-fg-strong"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Experience">
        {EXPERIENCE.map((job, i) => (
          <JobEntry key={i} job={job} />
        ))}
      </Section>

      <Section title="Education">
        <div>
          <div className="mb-[3px] flex items-baseline justify-between gap-3">
            <div className="text-[15px] font-semibold text-fg-strong">
              {EDUCATION.school}
            </div>
            <div className="whitespace-nowrap font-mono text-xs text-fg-subtle">
              {EDUCATION.when}
            </div>
          </div>
          <div className="text-[13.5px] text-fg-muted">
            {EDUCATION.degree} · {EDUCATION.location}
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <h2 className="mb-4 border-b border-border-DEFAULT pb-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {title}
      </h2>
      {children}
    </section>
  );
}

function JobEntry({ job }: { job: import('@/data/resume').Job }) {
  return (
    <div className="mb-6">
      <div className="mb-[3px] flex items-baseline justify-between gap-3">
        <div className="text-[15px] font-semibold text-fg-strong">
          {job.company}
        </div>
        <div className="whitespace-nowrap font-mono text-xs text-fg-subtle">
          {job.when}
        </div>
      </div>
      <div className="mb-2 text-[13.5px] text-fg-muted">
        {job.role} · {job.location}
      </div>
      <ul className="m-0 mb-2 flex list-disc flex-col gap-[5px] pl-[18px] text-sm leading-[1.6] text-fg-muted">
        {job.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {job.link && (
        <a
          href={job.link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-accent no-underline hover:underline"
        >
          <Icon.ArrowUpRight className="h-3 w-3" />
          {job.link.label}
        </a>
      )}
    </div>
  );
}
