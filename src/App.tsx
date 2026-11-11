import { useEffect } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { routeTree } from '@/router';
import { installClickTracking } from '@/analytics/track';

// A data router (rather than <BrowserRouter>) so links can run page changes
// as View Transitions, including Back/Forward (docs/MOTION-SPEC.md). Same
// route tree as the prerender in entry-server.tsx.
const router = createBrowserRouter(routeTree);

export default function App() {
  useEffect(() => installClickTracking(), []);

  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
