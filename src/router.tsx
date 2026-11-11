import type { ComponentType } from 'react';
import { matchRoutes, type RouteObject } from 'react-router';
import NotFound from '@/routes/NotFound';
import SiteLayout from '@/layouts/SiteLayout';

export type NavMeta = { label?: string; showInNav?: boolean };

/**
 * Each page is its own chunk, so a visit downloads only the page it opens,
 * not every page's code and data (PERF-100). The data router loads the chunk
 * before it commits a page change, and boot.tsx loads the first page's chunk
 * before hydrating, so the prerendered markup is reused as-is.
 *
 * There's deliberately no <link rel="modulepreload"> for these chunks: on a
 * phone they'd compete for bandwidth with the LCP image and fonts, and the
 * app boots after first paint anyway (main.tsx), so they aren't on the
 * critical path.
 */
function page(load: () => Promise<{ default: ComponentType }>, meta: NavMeta = {}) {
  return {
    lazy: async () => ({ Component: (await load()).default }),
    handle: meta,
  };
}

export const routes: RouteObject[] = [
  {
    path: '/',
    ...page(() => import('@/routes/Home'), { label: 'Home' }),
  },
  {
    path: '/projects',
    ...page(() => import('@/routes/Projects'), { label: 'Projects', showInNav: true }),
  },
  {
    path: '/projects/:slug',
    ...page(() => import('@/routes/ProjectDetail')),
  },
  {
    path: '/ux',
    ...page(() => import('@/routes/Ux'), { label: 'UX', showInNav: true }),
  },
  {
    path: '/ux/:slug',
    ...page(() => import('@/routes/UxCaseStudy')),
  },
  {
    path: '/ux/:slug/case-study',
    ...page(() => import('@/routes/UxCaseStudy')),
  },
  {
    path: '/resume',
    ...page(() => import('@/routes/Resume'), { label: 'Resume', showInNav: true }),
  },
  {
    path: '/contact',
    ...page(() => import('@/routes/Contact'), { label: 'Contact', showInNav: true }),
  },
  {
    path: '/accessibility',
    ...page(() => import('@/routes/Accessibility'), { label: 'Accessibility' }),
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
    if (!r.path || !meta?.showInNav || !meta.label) return [];
    return [{ path: r.path, label: meta.label }];
  });
}

/** Loads every lazy page that renders `pathname` into the route tree. */
export async function resolveLazyRoutes(pathname: string): Promise<void> {
  await Promise.all(
    (matchRoutes(routeTree, pathname) ?? []).map(async ({ route }) => {
      if (typeof route.lazy !== 'function') return;
      Object.assign(route, await route.lazy(), { lazy: undefined });
    }),
  );
}

/** Every lazy page's loader, to fetch the rest of the site once the first page is up. */
export function preloadAllRoutes(): Promise<unknown> {
  return Promise.all(routes.map((r) => (typeof r.lazy === 'function' ? r.lazy() : undefined)));
}
