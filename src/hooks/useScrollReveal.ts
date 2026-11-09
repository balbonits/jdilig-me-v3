import { useEffect } from 'react';

/**
 * Fades `[data-reveal]` elements up once as they scroll into view. Runs only
 * with motion allowed, and only hides elements that start below the fold, so
 * nothing on screen blinks and nothing is hidden without JS.
 */
export function useScrollReveal(key: string) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of els) {
      el.classList.add('reveal-pending');
      io.observe(el);
    }
    return () => {
      io.disconnect();
      for (const el of els) el.classList.remove('reveal-pending', 'is-visible');
    };
  }, [key]);
}
