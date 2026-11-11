import { Link } from '@/components/ui/Link';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { HIT_44 } from '@/components/ui/hit';
import { PAGES } from '@/data/pages';
import { PROFILE } from '@/data/profile';
import { usePageMeta } from '@/hooks/usePageMeta';

const link = 'text-accent underline';
const h2 = 'mt-10 mb-3 text-[22px] font-semibold tracking-[-0.02em] text-fg-strong';
const body = 'text-[16px] leading-[1.65] text-fg-muted';

/** Last time this statement was reviewed against the site. Update it with every review. */
const LAST_REVIEWED = 'November 10, 2026';

export default function Accessibility() {
  usePageMeta(PAGES.accessibility);

  return (
    <Container size="narrow" className="pb-24 pt-10 sm:pt-14">
      <Eyebrow>Accessibility</Eyebrow>
      <h1 className="mt-3 mb-3.5 text-[40px] font-bold tracking-[-0.03em] text-fg-strong sm:text-[44px]">
        Accessibility statement
      </h1>
      <p className={body}>
        I want everyone to be able to use this site, including people who use a keyboard, a screen reader, zoom or
        reduced motion. This page says what I aim for, where the site falls short today and how to tell me about a
        problem.
      </p>

      <h2 className={h2}>Conformance target</h2>
      <p className={body}>
        The target is <strong>WCAG 2.2 level AA</strong>. That also covers <strong>Section 508</strong>, which uses
        WCAG 2.0 level AA.
      </p>

      <h2 className={h2}>Status</h2>
      <p className={body}>
        The site is <strong>partially conformant</strong>: some parts don't fully meet the target yet. It stays that way
        until the accessibility report (ACR) for each of the three UX projects passes review. The reports are
        self-assessed by me, not audited by a third party.
      </p>

      <h2 className={h2}>Accessibility reports</h2>
      <ul className={`${body} list-disc pl-5`}>
        <li>
          <a className={`${link} ${HIT_44}`} href="https://github.com/balbonits/job-app-tracker/blob/main/docs/ACR.md">
            Job tracker ACR
          </a>{' '}
          (VPAT 2.5, Section 508 edition)
        </li>
        <li>Ember UI design system ACR: in progress, it will be linked here when it's published.</li>
        <li>Developer tool dashboard ACR: the project isn't built yet.</li>
      </ul>

      <h2 className={h2}>Known limitations</h2>
      <ul className={`${body} list-disc space-y-2 pl-5`}>
        <li>
          Screen-reader testing so far is limited. The planned pass uses Orca on Linux, and VoiceOver and NVDA haven't
          been tested yet. (Noted November 10, 2026.)
        </li>
        <li>
          In the Ember UI Storybook, the documentation pages keep Storybook's light page background when you switch the
          preview to dark. A theme update will fix it. (Noted November 10, 2026.)
        </li>
        <li>
          The full checks below cover the UX pages and the prototypes. The rest of the site has automated tests but
          hasn't had the same manual review yet. (Noted November 10, 2026.)
        </li>
        <li>
          The games sub-site, games.jdilig.me, isn't covered by this statement. (Noted November 10, 2026.)
        </li>
      </ul>

      <h2 className={h2}>How it's tested</h2>
      <ul className={`${body} list-disc space-y-2 pl-5`}>
        <li>
          Automated checks with axe-core in Chrome on Linux, at screen widths from 320 to 1280 pixels, in light and
          dark mode.
        </li>
        <li>Checks for sideways scrolling and for touch targets smaller than 44 by 44 pixels at the same widths.</li>
        <li>Keyboard-only use of each prototype, including focus order, skip links and dialogs.</li>
        <li>Lighthouse accessibility scores on the case-study pages.</li>
      </ul>

      <h2 className={h2}>Feedback</h2>
      <p className={body}>
        If something on the site is hard to use, please tell me. Email{' '}
        <a className={link} href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>{' '}
        or use the{' '}
        <Link className={link} to="/contact">
          contact page
        </Link>
        . Please say which page you were on and what happened.
      </p>

      <h2 className={h2}>Last review</h2>
      <p className={body}>This statement was last reviewed on {LAST_REVIEWED}.</p>
    </Container>
  );
}
