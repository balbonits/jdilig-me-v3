// Self-hosted fonts (Fontsource). Each file only downloads when the page
// uses a character in its range, so English pages load just the Latin files.
import '@fontsource-variable/geist';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@/index.css';

// Paint the prerendered page first, then load the app. React and the router
// are most of the JavaScript, and running them before the first paint held
// back First and Largest Contentful Paint on every page (PERF-100). The
// callback after the frame runs once that frame has painted; the markup is
// already real HTML, so nothing on screen waits for this.
// Hidden tabs don't run animation frames, so load straight away there.
const boot = () => void import('@/boot');
if (document.hidden) boot();
else requestAnimationFrame(() => setTimeout(boot));
