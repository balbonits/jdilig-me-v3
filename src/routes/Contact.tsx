import type { ReactNode } from 'react';
import { Icon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import { LinkButton } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PROFILE } from '@/data/profile';
import { displayUrl, telHref } from '@/lib/url';

const linkClass = 'text-accent no-underline hover:underline';

export default function Contact() {
  return (
    <Container size="narrow" className="pb-24 pt-10 sm:pt-14">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-3 mb-3.5 text-[40px] font-bold tracking-[-0.03em] text-fg-strong sm:text-[44px]">
        Say{' '}
        <span className="font-serif font-normal text-accent italic">hello</span>
        .
      </h1>
      <p className="mb-9 max-w-[520px] text-[16px] text-fg-muted">
        Freelance, full-time, or just to chat about shaders and basketball. I
        reply within a day or two.
      </p>

      <section
        aria-labelledby="contact-card-name"
        className="rounded-[16px] border border-border-DEFAULT bg-surface p-6 shadow-sm sm:p-8"
      >
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full ring-1 ring-border-DEFAULT"
          />
          <div>
            <h2
              id="contact-card-name"
              className="text-[20px] font-semibold text-fg-strong"
            >
              {PROFILE.fullName}
            </h2>
            <p className="text-[14px] text-fg-muted">
              {PROFILE.role} · {PROFILE.location}
            </p>
          </div>
        </div>

        <dl className="mt-6 flex flex-col gap-3.5 border-t border-border-DEFAULT pt-6">
          <Row icon={<Icon.Mail className="h-4 w-4" />} label="Email">
            <a href={`mailto:${PROFILE.email}`} className={linkClass}>
              {PROFILE.email}
            </a>
          </Row>
          <Row icon={<Icon.Phone className="h-4 w-4" />} label="Phone">
            <a href={telHref(PROFILE.phone)} className={linkClass}>
              {PROFILE.phone}
            </a>
          </Row>
          <Row icon={<LinkedInIcon className="h-3.5 w-3.5" />} label="LinkedIn">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              {displayUrl(PROFILE.linkedin)}
            </a>
          </Row>
          <Row icon={<GitHubIcon className="h-3.5 w-3.5" />} label="GitHub">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              {displayUrl(PROFILE.github)}
            </a>
          </Row>
        </dl>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <LinkButton href={`mailto:${PROFILE.email}`} variant="primary" size="lg">
            <Icon.Mail className="h-4 w-4" /> Email me
          </LinkButton>
          <LinkButton href={PROFILE.resumePdf} download variant="secondary" size="lg">
            <Icon.Document className="h-4 w-4" /> Download resume
          </LinkButton>
        </div>
      </section>
    </Container>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <dt className="flex w-28 shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
        {icon}
        {label}
      </dt>
      <dd className="min-w-0 break-words text-[15px]">{children}</dd>
    </div>
  );
}
