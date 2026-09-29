import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router';
import ErrorBoundary from '@/components/site/ErrorBoundary';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export default function SiteLayout() {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();
  const [announcement, setAnnouncement] = useState('');
  const firstKey = useRef(key);

  // New pages open at the top. Back/Forward (POP) keep the position the
  // browser restores.
  useEffect(() => {
    if (navigationType !== 'POP') window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  // Browsers announce a full page load but not a client-side page change, so
  // say the new page's title. The page has set it by now: child effects run
  // before this one.
  useEffect(() => {
    if (key !== firstKey.current) setAnnouncement(document.title);
  }, [key]);

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
      <div role="status" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
