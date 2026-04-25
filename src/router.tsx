import type { RouteObject } from 'react-router';
import Home from '@/routes/Home';
import Projects from '@/routes/Projects';
import ProjectDetail from '@/routes/ProjectDetail';
import Resume from '@/routes/Resume';
import Contact from '@/routes/Contact';
import NotFound from '@/routes/NotFound';
import SiteLayout from '@/layouts/SiteLayout';

export type NavMeta = { label: string; showInNav?: boolean };

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    handle: { label: 'Home' } satisfies NavMeta,
  },
  {
    path: '/projects',
    element: <Projects />,
    handle: { label: 'Projects', showInNav: true } satisfies NavMeta,
  },
  {
    path: '/projects/:slug',
    element: <ProjectDetail />,
  },
  {
    path: '/resume',
    element: <Resume />,
    handle: { label: 'Resume', showInNav: true } satisfies NavMeta,
  },
  {
    path: '/contact',
    element: <Contact />,
    handle: { label: 'Contact', showInNav: true } satisfies NavMeta,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const routeTree: RouteObject[] = [
  { element: <SiteLayout />, children: routes },
];

export type NavItem = { path: string; label: string };

export function getNavItems(): NavItem[] {
  return routes.flatMap((r) => {
    const meta = r.handle as NavMeta | undefined;
    if (!r.path || !meta?.showInNav) return [];
    return [{ path: r.path, label: meta.label }];
  });
}
