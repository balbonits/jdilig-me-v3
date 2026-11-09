import { track } from '@vercel/analytics';

type Props = Record<string, string>;

/**
 * Sends a Vercel Web Analytics custom event. Custom events need a paid plan;
 * on Hobby (and in dev, tests, or with an ad blocker) they are dropped, so this
 * must never throw or affect the click.
 */
export function trackEvent(name: string, props?: Props): void {
  try {
    track(name, props);
  } catch {
    // Analytics is best-effort.
  }
}

function outboundTarget(href: string): 'github' | 'linkedin' | 'email' | null {
  if (href.startsWith('mailto:')) return 'email';
  if (/^https?:\/\/(www\.)?github\.com\//i.test(href)) return 'github';
  if (/^https?:\/\/(www\.)?linkedin\.com\//i.test(href)) return 'linkedin';
  return null;
}

/** What was clicked, read off the closest tracked elements. */
export type ClickInfo = { href?: string | null; project?: string | null; cta?: string | null };

/**
 * Works out which events one click should send. Kept pure so it can be tested
 * without a DOM.
 */
export function eventsForClick(
  { href, project, cta }: ClickInfo,
  pathname: string,
): Array<[string, Props | undefined]> {
  const events: Array<[string, Props | undefined]> = [];
  if (project != null) events.push(['project_click', { slug: project }]);
  if (cta != null) events.push(['cta_click', { id: cta }]);
  if (href) {
    if (/\.pdf($|[?#])/i.test(href)) events.push(['resume_download', undefined]);
    const target = outboundTarget(href);
    if (target) events.push(['outbound_click', { target }]);
    if (pathname === '/contact' && (target || href.startsWith('tel:'))) {
      events.push(['contact_action', { method: target ?? 'phone' }]);
    }
  }
  return events;
}

function readClick(el: Element): ClickInfo {
  return {
    href: el.closest('a[href]')?.getAttribute('href'),
    project: el.closest('[data-track-project]')?.getAttribute('data-track-project'),
    cta: el.closest('[data-track-cta]')?.getAttribute('data-track-cta'),
  };
}

/** One document-level listener covers every tracked link and button. */
export function installClickTracking(): () => void {
  const onClick = (e: MouseEvent) => {
    try {
      if (!(e.target instanceof Element)) return;
      for (const [name, props] of eventsForClick(readClick(e.target), window.location.pathname)) {
        trackEvent(name, props);
      }
    } catch {
      // Never let tracking break a click.
    }
  };
  document.addEventListener('click', onClick, { capture: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
}
