import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router';
import ErrorBoundary from '@/components/site/ErrorBoundary';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SiteLayout() {
  const { pathname, key } = useLocation();
  const navigation = useNavigation();
  const lastPath = useRef(pathname);
  useScrollReveal(pathname);

  // New pages open at the top; Back/Forward return to where you were.
  // <ScrollRestoration> (below) does both: it restores after the page has
  // rendered, so the browser can't clamp the position to the old, shorter
  // page while a View Transition is still running.

  // After a client-side page change (including Back to the first page; not
  // in-page #hash jumps, which keep focus where the browser puts it), move
  // focus to the new page's h1 so keyboard and screen reader users start
  // there. The h1 is the page's announcement (MOTION-SPEC D3): it starts with
  // the page's name. This runs once React has committed the new page and the
  // navigation has settled (state idle), so focus lands on the live h1, not
  // on a node a View Transition is about to replace. preventScroll leaves
  // scrolling to <ScrollRestoration>. Mouse users see no ring: programmatic
  // focus after a click doesn't match :focus-visible.
  const settled = navigation.state === 'idle';
  useEffect(() => {
    if (!settled || pathname === lastPath.current) return;
    lastPath.current = pathname;
    const heading = document.querySelector<HTMLElement>('#main h1');
    if (!heading) return;
    if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }, [pathname, settled]);

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
    </div>
  );
}
