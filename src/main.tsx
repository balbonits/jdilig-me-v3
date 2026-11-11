import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Self-hosted fonts (Fontsource). Each file only downloads when the page
// uses a character in its range, so English pages load just the Latin files.
import '@fontsource-variable/geist';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@/index.css';
import App from '@/App';
import { installViewTransitionInput } from '@/lib/viewTransitionInput';

installViewTransitionInput();

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered pages (scripts/prerender.mjs) already hold the real markup, so
// hydrate it in place. Replacing it with createRoot repainted every node after
// the bundle ran, which moved Largest Contentful Paint behind the JS (PERF-100).
// Hydrate only when the markup was rendered for this URL: 404.html is served
// for every unknown path, so the 404 page matches any path no known page does.
const route = root.dataset.route;
const path = location.pathname.replace(/\/+$/, '') || '/';
if (route && (route === path || route === '/404')) {
  hydrateRoot(root, app);
} else {
  root.replaceChildren();
  createRoot(root).render(app);
}
