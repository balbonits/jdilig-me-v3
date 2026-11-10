import { Link } from 'react-router';
import { Icon } from '@/components/icons';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PAGES } from '@/data/pages';
import { UX_CASE_STUDIES, uxPath } from '@/data/ux';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Ux() {
  usePageMeta(PAGES.ux);

  return (
    <Container className="pb-24 pt-10 sm:pt-14">
      <div className="mb-8">
        <Eyebrow>UX</Eyebrow>
        <h1 className="mt-3 mb-3.5 text-[40px] font-bold tracking-[-0.03em] text-fg-strong sm:text-[48px]">
          UX{' '}
          <span className="font-serif font-normal text-accent italic">case studies</span>
        </h1>
        <p className="max-w-[560px] text-[16px] text-fg-muted">
          How I design and build accessible interfaces, from the problem and the people to shipped, tested code.
        </p>
        <p className="mt-3 max-w-[560px] text-[15px] text-fg-muted">
          <Link to="/accessibility" className="text-accent underline">
            Read the accessibility statement
          </Link>{' '}
          for the standards these projects target and their current status.
        </p>
      </div>

      <ul className="m-0 grid list-none grid-cols-1 gap-3.5 p-0 md:grid-cols-2">
        {UX_CASE_STUDIES.map((c) => (
          <li key={c.slug}>
            <Link
              to={uxPath(c)}
              data-track-cta={`ux-${c.slug}`}
              className="group flex h-full flex-col gap-2 rounded-[12px] border border-border-DEFAULT bg-surface p-5 no-underline transition-colors duration-[120ms] hover:border-border-strong"
            >
              <span className="text-[20px] font-semibold tracking-[-0.02em] text-fg-strong">{c.name}</span>
              <span className="text-[15px] leading-[1.6] text-fg-muted">{c.blurb}</span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[13px] font-medium text-accent">
                Read the case study
                <Icon.ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
