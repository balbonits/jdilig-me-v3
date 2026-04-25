export type ProjectKind = 'GAME' | 'SITE' | 'TOOL' | 'WORK' | 'EXPT';
export type ProjectStatus = 'LIVE' | 'SHIPPED' | 'ARCHIVED' | 'WIP';

export type Project = {
  slug: string;
  kind: ProjectKind;
  year: string;
  title: string;
  accent?: string;
  status: ProjectStatus;
  desc: string;
  summary: string;
  tags: string[];
  role: string;
  timeline: string;
  bundle: string;
  overview: string[];
  highlights: string[];
  learned?: string;
  links: { live?: string | null; source?: string | null };
  /** Optional path to a preview screenshot (relative to /public). */
  previewImage?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'orbit-drift',
    kind: 'GAME',
    year: '2026',
    title: 'Orbit Drift',
    accent: 'weekend',
    status: 'LIVE',
    desc: 'AI-assisted browser roguelite. Deterministic physics loop built in a weekend.',
    summary:
      'AI-assisted browser roguelite. Deterministic physics loop at 120 Hz, sub-1KB seeded RNG, 8.2 KB gzipped. Keyboard and gamepad, no mouse.',
    tags: ['React', 'Canvas', 'TypeScript', 'Vite', 'xorshift'],
    role: 'Solo',
    timeline: 'One weekend · Jan 2026',
    bundle: '8.2 KB',
    overview: [
      'Orbit Drift started as a Saturday-morning prompt: can I build a playable roguelite without touching a game engine? Eighteen hours of pair-programming with Claude later, I had a deterministic physics loop, a wave system, and three enemy archetypes. No WebGL — just Canvas 2D and a lot of trig.',
      'The deterministic loop is the whole point. Given a seed, two runs play identically — which makes leaderboards possible without a server, and makes bugs reproducible.',
    ],
    highlights: [
      'Fixed-step physics at 120 Hz, interpolated to the display refresh rate.',
      'Sub-1KB seeded RNG (xorshift128) for deterministic runs.',
      'Fully keyboard- and gamepad-driven. No mouse required.',
      'All rendering is a single canvas — 8KB of JS shipped after gzip.',
    ],
    learned:
      'The hardest part wasn\'t physics — it was pacing. My first playtesters finished their first run in 40 seconds and bounced. I rewrote the wave curve three times before a stranger said "one more run" out loud.',
    links: {
      live: 'https://orbit-drift.jdilig.me',
      source: 'https://github.com/balbonits',
    },
  },
  {
    slug: 'jdilig-me',
    kind: 'SITE',
    year: '2026',
    title: 'jdilig.me',
    accent: 'refresh',
    status: 'LIVE',
    desc: 'This site. A 2026 refresh written from scratch with a design system baked in.',
    summary:
      'A complete rewrite of my personal site. New design system, dark mode, MDX-driven case studies, and a per-project modal that opens before committing to a full page.',
    tags: ['Vite', 'React 19', 'Tailwind v4', 'TypeScript'],
    role: 'Solo',
    timeline: 'Two weeks · Apr 2026',
    bundle: '62 KB',
    overview: [
      'I rebuilt jdilig.me from the ground up to act as a living showcase of the patterns I actually use at work — design tokens, component composition, light/dark mode that doesn\'t lie about colors, and case studies you can read in three minutes.',
      'Every component you see was lifted directly from the design system in this repo. The site is the kit.',
    ],
    highlights: [
      'Tokens-first: every color, radius, shadow lives in one CSS file.',
      'Dark mode that adjusts ink and accent — not just background.',
      'Project modal previews; full case-study pages for depth.',
    ],
    learned:
      "Designing a system and a site simultaneously is a feedback loop you can't fake. Every time the site needed something the system couldn't give it cleanly, the system was wrong.",
    links: {
      live: 'https://jdilig.me',
      source: 'https://github.com/balbonits/jdilig-me-v3',
    },
    previewImage: '/screenshots/home-dark.png',
  },
  {
    slug: 'baseline',
    kind: 'GAME',
    year: '2025',
    title: 'Baseline',
    status: 'LIVE',
    desc: 'Half-court basketball trivia. Spurs & Celtics players, no purchases, no ads.',
    summary:
      "Daily basketball trivia game. One question, three guesses, share your streak. Inspired by Wordle's pacing — but for hoop-heads.",
    tags: ['React', 'Zustand', 'Vite'],
    role: 'Solo',
    timeline: 'Three weekends · 2025',
    bundle: '24 KB',
    overview: [
      'I wanted a trivia game that respected my time. One round per day. Three guesses. No leaderboards, no streaks shoved in your face — just enough to make you come back tomorrow.',
    ],
    highlights: [
      'Daily seed pulled from the date, so everyone plays the same game.',
      'Local-only state — no account, no tracking.',
      "Spurs & Celtics era questions weighted higher (founder's privilege).",
    ],
    learned:
      'Trivia games live or die by question quality. I spent three times as long curating questions as I did writing code.',
    links: { live: null, source: 'https://github.com/balbonits' },
  },
  {
    slug: 'scratchpad',
    kind: 'TOOL',
    year: '2025',
    title: 'Scratchpad',
    status: 'LIVE',
    desc: 'Keyboard-first markdown notes app. Syncs to IndexedDB, exports as .md.',
    summary:
      'A no-fuss markdown notes app. Opens instantly, saves locally, exports to plain .md files. No accounts, no cloud, no AI.',
    tags: ['React', 'IndexedDB', 'Vite'],
    role: 'Solo',
    timeline: 'Two weekends · 2025',
    bundle: '31 KB',
    overview: [
      'I kept opening five different note apps depending on which device I was on. Built Scratchpad because I just wanted one that loaded in under a second and never asked me to log in.',
    ],
    highlights: [
      'Cmd-K command palette for everything.',
      'All data in IndexedDB; export anytime as .md.',
      'Vim keybindings as an opt-in mode.',
    ],
    learned:
      'Persistence bugs are the worst kind of bug. Test data loss paths before you test happy paths.',
    links: { live: null, source: 'https://github.com/balbonits' },
  },
  {
    slug: 'atlas',
    kind: 'WORK',
    year: '2024',
    title: 'Atlas dashboard',
    accent: 'rebuild',
    status: 'SHIPPED',
    desc: 'Full rebuild of an internal analytics dashboard. Shipped a React 19 + TS rewrite. Cut initial load 42%.',
    summary:
      "Led the React 19 + TypeScript rewrite of Atlas's core analytics dashboard. Cut initial load by 42%, shrank the component count by half, and made dark mode actually work.",
    tags: ['React 19', 'TypeScript', 'Recharts', 'Tanstack Query'],
    role: 'Lead engineer',
    timeline: 'Five months · 2024',
    bundle: '—',
    overview: [
      "Atlas's dashboard had grown organically for four years. I led the rewrite — not a refactor, a rewrite — across five months and three engineers. The new dashboard ships a 42% smaller initial bundle and a component library four product teams now share.",
    ],
    highlights: [
      'Cut initial load from 4.1s to 2.4s on cold cache.',
      'Halved the component count without losing features.',
      'Mentored two engineers from mid to senior level.',
    ],
    learned:
      'A rewrite only succeeds if you can ship it incrementally. We shipped behind a flag for two months before flipping it on.',
    links: { live: null, source: null },
  },
  {
    slug: 'shaders',
    kind: 'EXPT',
    year: '2024',
    title: 'Shader sketches',
    status: 'LIVE',
    desc: 'Collection of WebGL fragment shader experiments. Each one fits on a postcard.',
    summary:
      "A growing collection of fragment-shader sketches. Each one's source code fits on a 4×6 postcard and runs in your browser at 60fps.",
    tags: ['GLSL', 'Three.js', 'TypeScript'],
    role: 'Solo',
    timeline: 'Ongoing',
    bundle: '—',
    overview: [
      'Started as a way to learn GLSL after years of staring at Shadertoy. Each sketch is constrained to fit visibly on a postcard — keeps me from overcomplicating, forces me to pick one idea per piece.',
    ],
    highlights: [
      'Eighteen sketches and counting.',
      'Each piece is under 80 lines of GLSL.',
      'Source-on-hover so you can read the code right there.',
    ],
    learned:
      'Constraints make the work better. The postcard rule killed three of my favorite ideas; the survivors were better for it.',
    links: { live: null, source: 'https://github.com/balbonits' },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string): { prev: Project; next: Project } {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const safe = idx === -1 ? 0 : idx;
  return {
    prev: PROJECTS[(safe - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(safe + 1) % PROJECTS.length],
  };
}
