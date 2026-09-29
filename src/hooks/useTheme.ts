import { useCallback, useEffect, useRef, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

// The inline script in index.html sets data-theme before first paint (saved
// choice, else the OS preference), so start from whatever it picked.
function readInitialTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function hasSavedChoice(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const chose = useRef(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Only an explicit toggle is remembered; until then the OS setting wins,
  // including when it changes while the page is open (say, dark at sunset).
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (chose.current || hasSavedChoice()) return;
      setTheme(e.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    chose.current = true;
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (privacy modes); the theme still applies.
    }
  }, [theme]);

  return [theme, toggle];
}
