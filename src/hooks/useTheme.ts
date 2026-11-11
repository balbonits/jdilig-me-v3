import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

// The inline script in index.html sets data-theme before first paint (saved
// choice, else the OS preference), so start from whatever it picked.
function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function hasSavedChoice(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

const noSubscribe = () => () => {};

/**
 * False while React hydrates prerendered markup, true after (and on a plain
 * client render). Prerendered HTML is always rendered with the light theme,
 * and React doesn't patch attribute mismatches when it hydrates, so anything
 * rendered from the theme reports light until hydration is done and then
 * re-renders with the real one.
 */
function useHydrated(): boolean {
  return useSyncExternalStore(noSubscribe, () => true, () => false);
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
    // The app boots after first paint, so the OS setting may have changed
    // since the inline script ran; catch up before listening.
    if (!chose.current && !hasSavedChoice()) setTheme(query.matches ? 'dark' : 'light');
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

  const hydrated = useHydrated();
  return [hydrated ? theme : 'light', toggle];
}
