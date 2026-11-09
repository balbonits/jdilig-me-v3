import { useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { routeTree } from '@/router';
import { installClickTracking } from '@/analytics/track';

function AppRoutes() {
  return useRoutes(routeTree);
}

export default function App() {
  useEffect(() => installClickTracking(), []);

  return (
    <BrowserRouter>
      <AppRoutes />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
