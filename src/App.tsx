import { BrowserRouter, useRoutes } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routeTree } from '@/router';

function AppRoutes() {
  return useRoutes(routeTree);
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
