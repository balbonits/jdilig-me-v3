import { useEffect } from 'react';
import type { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { installClickTracking } from '@/analytics/track';

// A data router (rather than <BrowserRouter>) so links can run page changes
// as View Transitions, including Back/Forward (docs/MOTION-SPEC.md). main.tsx
// creates it from the same route tree as the prerender in entry-server.tsx,
// once the first page's chunk has loaded.
type Router = ReturnType<typeof createBrowserRouter>;

export default function App({ router }: { router: Router }) {
  useEffect(() => installClickTracking(), []);

  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
