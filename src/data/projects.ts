export type ProjectCategory = 'GAME' | 'SITE' | 'TOOL' | 'WORK' | 'EXPT';
export type ProjectStatus = 'LIVE' | 'SHIPPED' | 'ARCHIVED' | 'WIP';
export type SortOption = 'year-desc' | 'year-asc' | 'title-asc';

export type Project = {
  slug: string;
  categories: ProjectCategory[];
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
  /** Image gallery shown on the project detail page. */
  gallery?: { src: string; alt: string }[];
  /**
   * Label for the "live" link (button + nav). Defaults to a category-appropriate
   * label — WORK / SITE → "Visit site", GAME → "Play", TOOL → "Open",
   * EXPT → "View demo".
   */
  liveLabel?: string;
  /** When true, the project is pulled out of the grid and rendered as the hero. */
  featured?: boolean;
};

export function getFeaturedProject(projects: Project[] = PROJECTS): Project | undefined {
  return projects.find((p) => p.featured);
}

export function getNonFeaturedProjects(projects: Project[] = PROJECTS): Project[] {
  return projects.filter((p) => !p.featured);
}

export function liveLinkLabel(project: Project): string {
  if (project.liveLabel) return project.liveLabel;
  switch (project.categories[0]) {
    case 'WORK':
    case 'SITE':
      return 'Visit site';
    case 'GAME':
      return 'Play';
    case 'TOOL':
      return 'Open';
    case 'EXPT':
    default:
      return 'Live demo';
  }
}

export function filterProjects(
  projects: Project[],
  active: Set<ProjectCategory>,
): Project[] {
  if (active.size === 0) return projects;
  return projects.filter((p) => p.categories.some((c) => active.has(c)));
}

export function sortProjects(projects: Project[], sort: SortOption): Project[] {
  return [...projects].sort((a, b) => {
    switch (sort) {
      case 'year-desc':
        return b.year.localeCompare(a.year);
      case 'year-asc':
        return a.year.localeCompare(b.year);
      case 'title-asc':
        return a.title.localeCompare(b.title);
    }
  });
}

export const PROJECTS: Project[] = [
  {
    slug: 'city-app-framework',
    categories: ['TOOL', 'EXPT'],
    year: '2026',
    title: 'City App Framework',
    accent: 'an OS for AI-driven dev',
    status: 'LIVE',
    desc: 'A personal "operating system" for building apps and games with AI coding agents — universal rules, per-project conventions, and a Sponsor / AI-Council operating model.',
    summary:
      'AI agents are stateless: every project is "first prompt" forever. City App Framework is the answer — a universal AGENTS.md plus per-project AGENTS.md files that bake in how I want code structured, named, tested, and reviewed. Two layers, a Sponsor / AI-Council operating model, and templates I can drop into any new repo so Claude, Grok, and friends start aligned instead of drifting.',
    tags: [
      'AGENTS.md',
      'Claude Code',
      'Grok',
      'Spec-driven',
      'Conventions',
      'Templates',
      'Anti-overengineering',
    ],
    role: 'Author / Sponsor',
    timeline: 'Aug 2025 — Present',
    bundle: '—',
    featured: true,
    overview: [
      'City App Framework is a personal development framework for building apps and games with AI coding agents (Claude, Grok, others). It exists to solve one specific problem: AI agents are stateless, so without a baked-in answer to "how does John want code structured, named, tested, and reviewed," every new project burns tokens on the same arbitrary choices and drifts from how I actually build.',
      'The architecture has two layers. The universal layer (this repo) holds rules and patterns that apply across all my projects — anti-overengineering, escalation triggers, decision patterns, communication norms. The per-project layer is each project\'s own AGENTS.md — stack, commands, file layout, naming, footguns. When an agent opens a project, it reads the project\'s AGENTS.md first, then falls back to the universal rules.',
      'The operating model treats the relationship as Sponsor + AI Council, not democracy. I set vision and boundaries; the agents execute autonomously inside them, escalate only when human judgment is genuinely required, and propose improvements after significant work. It\'s the slim, operational descendant of an earlier "City 2.0" design exercise that framed development as autonomous city governance — same metaphor, less ceremony.',
    ],
    highlights: [
      'Two-layer architecture — universal AGENTS.md + per-project AGENTS.md — so an agent always has fallback rules without the universal layer overriding project-specific intent.',
      'Sponsor / AI-Council operating model with explicit escalation triggers (new dependency, scope change, architecture choice, irreversible operation) — agents act autonomously inside the boundary and only ask when they should.',
      'Drop-in templates (project-AGENTS.md, project-CLAUDE.md, project-GROK.md, project-README.md) so a new repo is wired into the framework with one copy/paste.',
      'Codified conventions/ and decision-patterns/ folders capturing operational rules (anti-overengineering, escalation, communication norms) and recurring tradeoffs with guidance — extracted from real `AGENTS.md` files in jdilig-me-v3, coding-interview-reviewer, and ai-browser-game-demos.',
      'Earlier "City 2.0" philosophy-first design preserved in docs/design-notes/ — 8 Constitutional Principles, 22 docs — kept for thinking, not loaded into daily execution.',
      'Demo / whitepaper site deployed on Vercel from examples/website/ as the framework\'s public face.',
    ],
    learned:
      'The win wasn\'t a clever prompt — it was treating AGENTS.md as the single source of truth for how the agent works. Once the rules live in a file the agent always reads, the first prompt of every project gets dramatically shorter and the drift between projects collapses. The framework is doing the work the system prompt should have done all along.',
    links: {
      live: 'https://website-pi-one-3ymijizbxt.vercel.app',
      source: 'https://github.com/balbonits/city-app-framework',
    },
    liveLabel: 'View whitepaper',
    previewImage: '/screenshots/city-app-framework.png',
  },
  {
    slug: 'squanto',
    categories: ['WORK'],
    year: '2026',
    title: 'Squanto',
    accent: 'marketplace',
    status: 'LIVE',
    desc: 'Sole front-end engineer on squanto.app — a live-entertainment marketplace for event hosts, performers, and audiences.',
    summary:
      'Squanto is a live-entertainment marketplace connecting event hosts, performers, and audiences. I lead the entire web UI as sole front-end engineer, partnering with the CEO and systems architect on spec-driven delivery from early build through soft launch.',
    tags: [
      'React 19',
      'TypeScript',
      'React Router v7',
      'Tailwind v4',
      'Leaflet',
      'Chart.js',
      'PWA / Cordova',
    ],
    role: 'Sole Front-End Engineer',
    timeline: 'Oct 2025 — Present',
    bundle: '—',
    overview: [
      'Squanto is a two-sided marketplace where event hosts and performers discover each other, negotiate gigs, and finalize bookings. The UI spans an authenticated dashboard for both sides, an interactive map of events, a rich application / counter-offer flow, and a public brochure experience for venues, performers, and events.',
      'I own the frontend end-to-end — routing conventions, component architecture, design tokens, forms, analytics, maps, mock data, and tests — leveraging Claude Code for agentic generation, documentation, and test coverage.',
    ],
    highlights: [
      'Built the interactive map system (react-leaflet) with pixel-based overlap cycling, light/dark tile inversion, and dual public/authenticated map pages sharing one core component.',
      'Designed a two-party gig-acceptance workflow with counter-offer history, ACTION-NEEDED ribbons, and a five-section performer dashboard.',
      'Shipped a PWA / Cordova hybrid-mobile build alongside the web app from a single React codebase.',
      'Integrated Meta Pixel + GA4 with consent management, page tracking, form-interaction tracking, and automatic error capture.',
      'Established the full design system in Tailwind v4 — inline utilities, semantic tokens, and a `@reference`-driven CSS-module bridge for legacy components.',
    ],
    learned:
      'A spec-driven feedback loop with an LLM only works when you invest in the spec. Most of the wins came from clean mock data, typed API contracts, and documentation that the model can actually consume — not from clever prompts.',
    links: {
      live: 'https://squanto.app/',
      source: null,
    },
    previewImage: '/screenshots/squanto-home.png',
    gallery: [
      {
        src: '/screenshots/squanto-home.png',
        alt: 'Landing page — hero with persona CTAs',
      },
      {
        src: '/screenshots/squanto-audience-map.png',
        alt: 'Live Entertainment Map — public audience map',
      },
      {
        src: '/screenshots/squanto-about.png',
        alt: 'About Us',
      },
      {
        src: '/screenshots/squanto-help.png',
        alt: 'Help / FAQ',
      },
      {
        src: '/screenshots/squanto-contact.png',
        alt: 'Contact Us',
      },
      {
        src: '/screenshots/squanto-demo.png',
        alt: 'Request a Demo',
      },
    ],
  },
  {
    slug: 'jdilig-me',
    categories: ['SITE'],
    year: '2026',
    title: 'jdilig.me',
    accent: 'refresh',
    status: 'LIVE',
    desc: 'This site. A 2026 rewrite on Vite + React 19 + Tailwind v4, wired to a custom design system.',
    summary:
      'A complete rewrite of my personal site. Warm-stone design system, dark mode that adjusts ink and accent (not just background), a Resend-backed contact form, and a Playwright pipeline that captures the site as previews for its own project cards.',
    tags: [
      'Vite',
      'React 19',
      'Tailwind v4',
      'React Router v7',
      'TypeScript',
      'Resend',
      'Playwright',
    ],
    role: 'Solo',
    timeline: 'Apr 2026',
    bundle: '87 KB gz',
    overview: [
      "I rebuilt jdilig.me from the ground up as a showcase of the patterns I use day-to-day — tokens-first styling, a router that generates its own nav metadata, component composition with a small reusable kit, and a contact form that's actually secure.",
      "Every component and token here was designed in Claude Design first, then ported to a real Vite + React + Tailwind v4 project. The site is the kit.",
    ],
    highlights: [
      'Tokens-first: every color, radius, shadow, and motion curve lives in one CSS file, bridged to Tailwind v4 via `@theme inline`.',
      "Dark mode that flips ink and accent (orange-600 → orange-400) — not just background — driven by a `data-theme` attribute with a `@custom-variant dark` bridge.",
      "Header nav is auto-generated from the router table via a `handle: { showInNav }` convention — adding a route to the nav is a one-line change.",
      "Contact form runs on a Vercel Edge Function backed by Resend, with honeypot + length caps + server-side email validation. Local validation uses the same regex as the server for consistency.",
      'Playwright captures both site themes and the live Squanto app, writing directly to `/public/screenshots` for use as project previews.',
    ],
    learned:
      "Designing a system and a site simultaneously is a feedback loop you can't fake. Every time the site needed something the system couldn't give it cleanly, the system was wrong — and that's worth listening to.",
    links: {
      live: 'https://jdilig.me',
      source: 'https://github.com/balbonits/jdilig-me-v3',
    },
    previewImage: '/screenshots/home-dark.png',
    gallery: [
      {
        src: '/screenshots/home-dark.png',
        alt: 'Home — hero with accent period, dark mode',
      },
      {
        src: '/screenshots/home-light.png',
        alt: 'Home — light mode',
      },
      {
        src: '/screenshots/projects-dark.png',
        alt: 'Projects index with filter pills',
      },
      {
        src: '/screenshots/resume.png',
        alt: 'Resume page',
      },
      {
        src: '/screenshots/contact.png',
        alt: 'Contact form with live email validation',
      },
    ],
  },
  {
    slug: 'running-man',
    categories: ['GAME', 'EXPT'],
    year: '2026',
    title: 'Running Man',
    accent: 'rhythm',
    status: 'LIVE',
    desc: 'Side-scrolling auto-runner. Time jumps to clear obstacles. PixelLab pixel art, synthesized audio.',
    summary:
      'A one-button auto-runner: your character runs right, you tap to jump. PixelLab generates the character, obstacles, and parallax backdrops; Web Audio synthesizes every SFX and the looping music. Variable-height jumps, mood-based obstacle pacing, a five-most-recent-runs panel inside the death overlay.',
    tags: ['Vanilla JS', 'Canvas2D', 'PixelLab', 'Web Audio'],
    role: 'Director — AI-built',
    timeline: 'Apr 2026',
    bundle: '—',
    overview: [
      "The first game in the AI Browser Game Demos repo. A short-session arcade runner where the player never stops running and the only verb is jump.",
      "Built end-to-end by AI under my direction — Claude Code writes every line of game logic, PixelLab generates all the sprites via MCP, Web Audio synthesizes the audio. My role is director: pick the concept, review the build, ask for revisions until the feel is right. No hand-written code, no hand-drawn art.",
    ],
    highlights: [
      "Tight collision: hitboxes measured directly from each PNG's alpha channel so the collider matches the visible art 1:1.",
      'Variable-height jump — taps become hops, holds get the full arc — wired through `keyup` and `pointerup`.',
      'Three obstacle "moods" (tight bursts, standard cadence, long breathers) keep the late game from feeling relentless.',
      'Three-layer parallax — far mountains, pine forest, cloud band — built from PixelLab map-objects with per-layer scroll multipliers.',
      'Last-20-runs persisted to localStorage; death overlay highlights the current run and the all-time best.',
    ],
    learned:
      "Pixel art reads as 'wrong' or 'right' instantly — and the AI doesn't know which. Iterating on the alpha-padding values and the felt of the road took more passes than the entire game-logic rewrite.",
    links: {
      live: 'https://games.jdilig.me/games/running-man/index.html',
      source:
        'https://github.com/balbonits/ai-browser-game-demos/tree/main/games/running-man',
    },
    previewImage: '/screenshots/game-running-man.png',
  },
  {
    slug: 'neon-tower-defense',
    categories: ['GAME', 'EXPT'],
    year: '2026',
    title: 'Neon Tower Defense',
    accent: 'geometry',
    status: 'LIVE',
    desc: 'Wave-based tower defense in a neon CRT aesthetic. Every visual is geometry, every sound is synthesized in code.',
    summary:
      'A 12-wave tower defense in a neon CRT aesthetic, plus an endless score-attack mode after wave 12. Three tower types (bolt / pulse / spike) with three upgrade tiers each, four enemy types, slow + AoE + pierce mechanics. Zero assets shipped — every visual is a Canvas2D primitive, every sound is synthesized via Web Audio.',
    tags: ['Vanilla JS', 'Canvas2D', 'Web Audio', 'No assets'],
    role: 'Director — AI-built',
    timeline: 'Apr 2026',
    bundle: '—',
    overview: [
      'A deliberate counterpoint to Running Man: where Running Man leans on PixelLab-generated pixel art, Neon Tower Defense ships with no asset folder at all. Every visual is a layered glow drawn from `render.js` — a soft halo via shadowBlur plus a brighter outlined core — so triangles, squares, diamonds, and hexagons read as glowing CRT-monitor neon.',
      'Twelve hand-tuned waves with bosses on 4 / 8 / 12. After clearing the campaign the game transitions into endless mode: wave templates cycle, HP / speed / spawn count scale per wave, kill rewards scale with them, and `localStorage[neon-td:best]` tracks the highest wave reached.',
    ],
    highlights: [
      'Three tower archetypes — bolt (fast single-target), pulse (AoE), spike (long-range piercing) — each with three upgrade tiers and per-tier slow / pierce mechanics.',
      'Path is a polyline; non-buildable tiles are computed once at module load by checking each tile centroid against the path.',
      'Endless mode tightens HP / speed / spawn count per wave but scales kill rewards with them, so the player stays solvent for upgrades.',
      'Distinct timbres per tower fire — bolt = high square chirp, pulse = saw thump + filtered noise, spike = high square w/ steep down-bend.',
    ],
    learned:
      "Shape-only games live or die on contrast. Picking palette colors that read as 'glowing' on near-black took as long as tuning the wave economy.",
    links: {
      live: 'https://games.jdilig.me/games/neon-tower-defense/index.html',
      source:
        'https://github.com/balbonits/ai-browser-game-demos/tree/main/games/neon-tower-defense',
    },
    previewImage: '/screenshots/game-neon-tower-defense.png',
  },
  {
    slug: 'block-fps',
    categories: ['GAME', 'EXPT'],
    year: '2026',
    title: 'Block Arena',
    accent: 'polygons',
    status: 'LIVE',
    desc: 'First-person arena shooter — polygonal gun, 3D block enemies, Three.js via CDN, no build step.',
    summary:
      'A first-person arena shooter built entirely from procedural geometry. The viewmodel is a polygonal gun assembled from BoxGeometry parts; enemies are colored block meshes with EdgesGeometry outlines. Three.js loads from esm.sh at runtime via importmap — no build step, no bundler, no installed dependencies.',
    tags: ['Three.js', 'WebGL', 'PointerLock', 'Web Audio'],
    role: 'Director — AI-built',
    timeline: 'Apr 2026',
    bundle: '—',
    overview: [
      'A 3D counterpoint to the 2D pixel and shape pieces. The player wields a polygonal gun (eight BoxGeometry pieces parented to the camera) and defends an arena from three enemy archetypes — grunt, charger, heavy — across eight hand-tuned waves with endless scaling after.',
      'Hitscan firing via THREE.Raycaster with a small spread. Recoil animation is a 0.07s ease-out kick. Tracers fade over 0.08s. Movement is acceleration-based with axis-by-axis AABB sliding around arena pillars so the player never gets stuck on a corner.',
    ],
    highlights: [
      'Three.js loaded from esm.sh CDN via `<script type="importmap">` — no `npm install`, no bundler, no build step.',
      'Polygonal gun viewmodel built from BoxGeometry + EdgesGeometry outlines, glued to the camera.',
      "Pointer Lock API for FPS controls; pressing Esc releases the lock and auto-pauses the game — click to re-lock and resume.",
      'Acceleration-based movement with `approach()`-style smoothing for a slight weighty feel; AABB sliding so you don\'t get stuck on pillars.',
      'Eight wave templates that loop in endless mode with +20% HP and +10% count per cycle.',
    ],
    learned:
      "Three.js without a bundler is more pleasant than I expected. `importmap` keeps the imports clean, and `esm.sh` resolves the addon paths so you can write `from 'three'` exactly like you would in Vite.",
    links: {
      live: 'https://games.jdilig.me/games/block-fps/index.html',
      source:
        'https://github.com/balbonits/ai-browser-game-demos/tree/main/games/block-fps',
    },
    previewImage: '/screenshots/game-block-fps.png',
  },
  {
    slug: 'coding-interview-reviewer',
    categories: ['TOOL', 'EXPT'],
    year: '2026',
    title: 'Coding Interview Reviewer',
    accent: 'prep',
    status: 'SHIPPED',
    desc: 'Local-only front-end interview prep workspace — live coding sandbox, AI mock interviewer, spaced repetition, and an RSS news feed. Runs entirely offline.',
    summary:
      'A personal front-end interview prep tool built entirely with AI (Claude Code). Six integrated modules: a live Sandpack code editor with auto-graded tests, MDX note library, streaming AI mock interviewer, SM-2 spaced repetition queue, RSS tech news feed, and a quick-capture form. No cloud services — Ollama runs the LLM on-device, MongoDB handles persistence.',
    tags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind v4',
      'shadcn/ui',
      'Sandpack',
      'Ollama',
      'MongoDB',
      'MDX',
    ],
    role: 'Solo — AI-built',
    timeline: 'Apr 2026',
    bundle: '—',
    overview: [
      'A personal study tool for front-end interview prep, built entirely in conversation with Claude Code. Six routes: /exercises runs live Sandpack sandboxes with auto-graded tests; /notes is an MDX library covering closures, React 19, TypeScript, accessibility, and more; /interview streams a mock interviewer from a local Ollama LLM; /review drives an SM-2 spaced repetition queue; /news aggregates RSS from four front-end publications; /capture lets you paste a snippet or URL and export it as an MDX note.',
      'The architecture is intentionally offline — no SaaS subscriptions, no API keys, no cloud database. Ollama serves the LLM on-device, MongoDB runs locally, and Sandpack executes code in the browser without a backend.',
    ],
    highlights: [
      '15 exercises across DSA, React, TypeScript, accessibility, and REST patterns — each with starter code, auto-graded tests, and an AI hint/review/explain panel that reads your live editor state.',
      'SM-2 spaced repetition implemented from scratch in `lib/spaced-repetition.ts`; review queue seeded from the exercise library and persisted to local MongoDB.',
      'Streaming mock interviewer via Ollama (`qwen2.5:14b`) — context window trimming keeps sessions within the token budget while preserving the last N turns of conversation history.',
      'MDX content pipeline: exercises and notes live as files in `content/`, parsed at request time via `next-mdx-remote/rsc` with Prism syntax highlighting.',
      'Fully local stack: Ollama at `localhost:11434`, MongoDB at `localhost:27017`, no `.env` required — `npm run dev:local` checks and starts both services before `next dev`.',
    ],
    learned:
      'Offline-first architecture is a forcing function for simplicity. Without a cloud database or managed LLM, every integration becomes a direct dependency you can inspect and debug — which made the whole system easier to reason about than an equivalent SaaS-backed stack.',
    links: {
      live: null,
      source: 'https://github.com/balbonits/coding-interview-reviewer',
    },
    previewImage: '/screenshots/cir-exercises.png',
    gallery: [
      { src: '/screenshots/cir-exercises.png', alt: 'Exercises — live Sandpack editor with auto-graded tests' },
      { src: '/screenshots/cir-notes.png', alt: 'Notes — MDX library with tag filtering' },
      { src: '/screenshots/cir-interview.png', alt: 'Interview — streaming AI mock interviewer' },
      { src: '/screenshots/cir-review.png', alt: 'Review — SM-2 spaced repetition queue' },
      { src: '/screenshots/cir-news.png', alt: 'News — RSS feed with AI summarization' },
      { src: '/screenshots/cir-capture.png', alt: 'Capture — quick snippet / URL capture form' },
    ],
  },
  {
    slug: 'maze-runner',
    categories: ['GAME', 'EXPT'],
    year: '2026',
    title: 'Maze Runner',
    accent: 'seeds',
    status: 'LIVE',
    desc: 'Top-down procedural mazes seeded by a string. Race the clock, collect gems, share seeds.',
    summary:
      'A top-down maze game where the same seed always produces the same maze — share seeds with friends and race their times. Recursive-backtracker generation, Mulberry32 PRNG, fog of war, gem collectibles in dead-end cells, a per-difficulty top-10 scoreboard, and a soothing A-minor pentatonic ambient bed during play.',
    tags: ['Vanilla JS', 'Canvas2D', 'Procedural', 'Web Audio'],
    role: 'Director — AI-built',
    timeline: 'Apr 2026',
    bundle: '—',
    overview: [
      'Classic maze traversal with a racing-game urgency: the timer starts the moment you take your first step, and your best time per seed is saved. Fog of war hides cells beyond five Manhattan-distance from the player; previously seen cells dim into a darker palette. The minimap in the corner reveals explored topology at 3 px / cell.',
      'Three difficulty sizes (Small / Medium / Large) and a seed history (last 20 runs, dedup-by-seed) accessible with `H` from the splash. Press a number key to replay any past seed at the difficulty it was first played on.',
    ],
    highlights: [
      'Recursive-backtracker DFS generation — long winding corridors with relatively few dead ends, gives a "navigating, not searching blind" feel.',
      'Mulberry32 PRNG seeded from a numeric seed or a djb2-hashed string — same seed + same dimensions → identical maze, every time.',
      'Gems placed in dead-end cells using a separate RNG (`numericSeed + 1`) so positions are stable per seed independent of mid-run RNG calls.',
      'Per-difficulty top-10 scoreboard persisted to localStorage; current run is highlighted in green on the win screen.',
      'Three-layer ambient music — sustained sine pad, soft triangle melody, sparse high-octave bell pings — at 64 BPM, sits at 10% master volume under the SFX.',
    ],
    learned:
      'Seeded RNG is a small idea that pays off in unexpected ways. The dual-RNG trick (gem placement seeded from `seed + 1`) keeps placements deterministic even after I reordered the gameplay code three times.',
    links: {
      live: 'https://games.jdilig.me/games/maze-runner/index.html',
      source:
        'https://github.com/balbonits/ai-browser-game-demos/tree/main/games/maze-runner',
    },
    previewImage: '/screenshots/game-maze-runner.png',
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
