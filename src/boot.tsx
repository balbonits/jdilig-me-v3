// The app itself: main.tsx loads this chunk once the prerendered page has painted.
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import App from '@/App';
import { preloadAllRoutes, resolveLazyRoutes, routeTree } from '@/router';
import { installViewTransitionInput } from '@/lib/viewTransitionInput';

installViewTransitionInput();

const root = document.getElementById('root')!;

// Prerendered pages (scripts/prerender.mjs) already hold the real markup, so
// hydrate it in place. Replacing it with createRoot repainted every node after
// the bundle ran, which moved Largest Contentful Paint behind the JS (PERF-100).
// Hydrate only when the markup was rendered for this URL: 404.html is served
// for every unknown path, so the 404 page matches any path no known page does.
const route = root.dataset.route;
const path = location.pathname.replace(/\/+$/, '') || '/';
const hydrate = Boolean(route && (route === path || route === '/404'));

// Pages are separate chunks (router.tsx). Load this page's chunk first so the
// first render matches the prerendered markup, then fetch the other pages in
// idle time so later page changes don't wait on the network.
void resolveLazyRoutes(location.pathname).then(() => {
  const app = (
    <StrictMode>
      <App router={createBrowserRouter(routeTree)} />
    </StrictMode>
  );
  if (hydrate) {
    hydrateRoot(root, app);
  } else {
    root.replaceChildren();
    createRoot(root).render(app);
  }
  const preload = () => void preloadAllRoutes();
  const idle = () =>
    'requestIdleCallback' in window ? requestIdleCallback(preload, { timeout: 4000 }) : setTimeout(preload, 2000);
  if (document.readyState === 'complete') idle();
  else addEventListener('load', idle, { once: true });
});
