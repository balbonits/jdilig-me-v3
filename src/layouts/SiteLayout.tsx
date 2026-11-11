import { useEffect, useRef, useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import ErrorBoundary from '@/components/site/ErrorBoundary';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SiteLayout() {
  const { pathname, key } = useLocation();
  const [announcement, setAnnouncement] = useState('');
  const lastPath = useRef(pathname);
  useScrollReveal(pathname);

  // New pages open at the top; Back/Forward return to where you were.
  // <ScrollRestoration> (below) does both: it restores after the page has
  // rendered, so the browser can't clamp the position to the old, shorter
  // page while a View Transition is still running.

  // After a client-side page change (including Back to the first page; not
  // in-page #hash jumps, which keep focus where the browser puts it),
  // say the new page's title, since browsers announce only full page loads,
  // and move focus to its heading so keyboard and screen reader users start
  // there. The page has set its title by now: child effects run first.
  // preventScroll leaves scrolling to <ScrollRestoration>. Mouse users see no
  // ring: programmatic focus after a click doesn't match :focus-visible.
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    setAnnouncement(document.title);
    const heading = document.querySelector<HTMLElement>('#main h1');
    if (!heading) return;
    if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-surface px-3 py-2 text-sm font-medium text-fg-strong shadow-md focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="grow">
        <ErrorBoundary key={key}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollRestoration />
      <div role="status" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
