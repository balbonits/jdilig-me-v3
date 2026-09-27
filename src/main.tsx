import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted fonts (Fontsource). Each file only downloads when the page
// uses a character in its range, so English pages load just the Latin files.
import '@fontsource-variable/geist';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@/index.css';
import App from '@/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
