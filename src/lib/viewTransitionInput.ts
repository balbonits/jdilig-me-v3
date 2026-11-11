// MOTION-SPEC v0.2 section 10: an interrupted transition never blocks input
// for more than 280ms. While a View Transition runs, Chrome hit-tests every
// pointer event to the root (pointer-events:none on the pseudos doesn't
// change that), so a real click during the 400ms page change would be lost.
// Fix: real input during a transition skips it at once, and a click whose
// target was swallowed by the root is replayed on the element under the
// pointer, which is now the live page.

type VT = { skipTransition(): void; finished: Promise<unknown> };

let active: VT | null = null;
let replay: { x: number; y: number } | null = null;

const swallowed = (t: EventTarget | null) => t === document.documentElement || t === document.body || t === document;

export function installViewTransitionInput(): void {
  const doc = document as Document & { __vtInput?: boolean };
  if (typeof doc.startViewTransition !== 'function' || doc.__vtInput) return;
  doc.__vtInput = true;

  const original = doc.startViewTransition.bind(doc);
  doc.startViewTransition = ((arg?: Parameters<typeof original>[0]) => {
    const t = original(arg);
    active = t;
    const clear = () => { if (active === t) active = null; };
    t.finished.then(clear, clear);
    return t;
  }) as typeof doc.startViewTransition;

  document.addEventListener('pointerdown', (e) => {
    if (!active || !e.isPrimary) return;
    active.skipTransition();
    active = null;
    // Only replay if the browser gave this press to the root, not a real target.
    replay = swallowed(e.target) ? { x: e.clientX, y: e.clientY } : null;
  }, true);

  document.addEventListener('keydown', (e) => {
    if (!active || e.isComposing) return;
    active.skipTransition();
    active = null;
  }, true);

  document.addEventListener('click', (e) => {
    const r = replay;
    replay = null;
    if (!r || !swallowed(e.target) || e.button !== 0) return;
    const el = document.elementFromPoint(r.x, r.y)?.closest<HTMLElement>('a[href], button, [role="button"], input, select, textarea, summary, label');
    if (!el || swallowed(el)) return;
    e.preventDefault();
    e.stopPropagation();
    if (el.matches('input, select, textarea')) el.focus();
    else el.click();
  }, true);
}
