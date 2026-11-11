/** True when the visitor asked the OS for reduced motion. Read at call time, so a setting change applies to the next click. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}
