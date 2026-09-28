import jdiligLighthouse from './lighthouse.json';

export type ProjectCategory = 'GAME' | 'SITE' | 'TOOL' | 'WORK' | 'EXPT';
export type ProjectStatus = 'LIVE' | 'SHIPPED' | 'ARCHIVED' | 'WIP';
export type SortOption = 'year-desc' | 'year-asc' | 'title-asc';

/** Output of `npm run lighthouse` (see scripts/lighthouse.mjs). */
export type LighthouseData = {
  url: string;
  measuredAt: string;
  formFactor: string;
  lighthouseVersion: string;
  scores: Record<
    'performance' | 'accessibility' | 'bestPractices' | 'seo',
    number
  >;
};

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
  /** Gzipped JS bundle size, when it's worth showing. */
  bundle?: string;
  overview: string[];
  highlights: string[];
  learned?: string;
  links: { live?: string; source?: string };
  /** Optional path to a preview screenshot (relative to /public). */
  previewImage?: string;
  /** Image gallery shown on the project detail page. */
  gallery?: { src: string; alt: string }[];
  /**
   * Label for the "live" link (button + nav). Defaults to a category-appropriate
   * label — WORK / SITE → "Visit site", GAME → "Play", TOOL → "Open",
   * EXPT → "Live demo".
   */
  liveLabel?: string;
  /** When true, the project is pulled out of the grid and rendered as the hero. */
  featured?: boolean;
  /**
   * When true, the project is left off the site: lists, detail page, and
   * prev/next links. Also remove it from public/sitemap.xml (a test checks).
   */
  hidden?: boolean;
  /** Lighthouse scores shown as gauges on the detail page. */
  lighthouse?: LighthouseData;
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

/** Every project, including hidden ones. Use PROJECTS for anything the site shows. */
export const ALL_PROJECTS: Project[] = [
  {
    slug: 'city-app-framework',
    categories: ['TOOL', 'EXPT'],
    year: '2026',
    title: 'City App Framework',
    accent: 'a tested kit for AI agents',
    status: 'LIVE',
    desc: 'A small Claude Code plugin for building apps with AI coding agents — project setup, hard stops for risky actions, corrections that stick, and front-end checks, each tested against real model runs.',
    summary:
      "City App Framework gives AI coding agents three things they can't get on their own: your project's facts and working style in a file they actually load, hard stops for the few actions that need you, and a way to make corrections stick. Version 4 was rebuilt from test results — most of v3 never reached the agent — so every rule that made no difference was cut.",
    tags: [
      'Claude Code plugin',
      'AGENTS.md',
      'Hooks',
      'Evals',
      'Node.js',
      'Playwright',
      'axe-core',
    ],
    role: 'Author',
    timeline: 'Aug 2025 — Present',
    featured: true,
    overview: [
      "City App Framework is a small kit for building apps with AI coding agents, shipped as a Claude Code plugin. Running `/city-app:setup` in a project installs a 28-line AGENTS.md — the project's facts, filled in from the repo, plus an 8-line working agreement — a one-line CLAUDE.md that makes Claude load it, and two hooks: a guard that asks before a new dependency or deleting a test and blocks force-push, production deploys, and publishing, and a test gate that won't let the agent finish with failing or newly skipped tests. The AGENTS.md part also works with Codex, Cursor, Copilot, and Grok.",
      "Version 4 is a rebuild. A test harness runs headless Claude Code on a small app and scores every run with fixed checks, and it showed that most of v3 never reached the agent: its CLAUDE.md pointer stopped Claude from loading AGENTS.md automatically, and the universal rules sat behind a link no agent opened (0 of 25 runs). Rules against overbuilding and new dependencies made no difference either — none of 285 runs added a dependency, with or without them, even when asked for a web server. So v4 cuts every rule that didn't change behavior and puts anything that must never happen in a hook.",
      'The rest of the plugin: `/city-app:start` builds an app or feature from a short spec, tests first; `/city-app:lesson` turns a correction into a test, a guard rule, or one AGENTS.md line; and `rules:test` and `rules:prune` re-check whether each rule still earns its place on your project, for example after a model update. Front-end checks round it out: `ui:check` finds accessibility problems, console errors, and pages wider than the screen at phone, tablet, and desktop sizes; `ui:baseline` fails a page that no longer matches its approved screenshot; and `ui:tokens` keeps colors in design tokens.',
    ],
    highlights: [
      'Every part tested against real model runs — 285 scored headless Claude Code sessions — and rules that made no difference were cut.',
      'Found the rules that still change behavior: with a "build the smallest part, then offer options" rule, agents offered options on a vague ask in 5 of 5 runs (0 of 5 without it), and a one-line "add a test for new logic" rule raised test writing from 17 of 25 runs to 25 of 25.',
      'Lessons that stick: a journal of past mistakes carried its lesson in 0 of 5 runs, while one AGENTS.md line or a failing check carried it in 5 of 5 — so `/city-app:lesson` writes checks and one-line rules, not journal entries.',
      "Hooks as hard stops, because instructions are advice and hooks are guarantees: adding a package brings up an Allow/Deny prompt for the human, even in auto mode, and the agent can't finish while tests fail.",
      'The harness tested the kit itself: a first-draft rule sent agents to a reviewer on a trivial `--json` flag in 3 of 5 runs for no gain, so it was cut. On small tasks a solo agent was right 15 of 16 times, and a second "reviewer" agent caught nothing.',
      'A demo app, `demo/habit-web`, uses every part with the evidence for each. Its UI check catches four planted bugs — a console error, a page that scrolls sideways on phones, a button with no name for screen readers, and an image with no alt text — each with a fix-it message.',
    ],
    learned:
      "More rules didn't make better agents. v3 had a 178-line universal AGENTS.md and about 40 convention docs, but most of it never reached the agent, and some of what did — like the anti-overbuild and no-new-dependency rules — was already the model's default. Only short, specific rules the agent could actually load changed its behavior. So v4 keeps a short working agreement, turns lessons into checks, and puts anything that must never happen in a hook. The city idea survives in one form: laws are enforced; customs are advice.",
    links: {
      source: 'https://github.com/balbonits/city-app-framework',
    },
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
      'Squanto is a live-entertainment marketplace connecting event hosts, performers, and audiences. As sole front-end engineer I led the entire web UI, partnering with the CEO and systems architect on spec-driven delivery from early build through soft launch.',
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
    timeline: 'Oct 2025 — Jun 2026',
    overview: [
      'Squanto is a two-sided marketplace where event hosts and performers discover each other, negotiate gigs, and finalize bookings. The UI spans an authenticated dashboard for both sides, an interactive map of events, a rich application / counter-offer flow, and a public brochure experience for venues, performers, and events.',
      'I owned the frontend end-to-end — routing conventions, component architecture, design tokens, forms, analytics, maps, mock data, and tests — leveraging Claude Code for agentic generation, documentation, and test coverage.',
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
    },
    previewImage: '/screenshots/squanto-home.webp',
    gallery: [
      {
        src: '/screenshots/squanto-home.webp',
        alt: 'Landing page — hero with persona CTAs',
      },
      {
        src: '/screenshots/squanto-audience-map.webp',
        alt: 'Live Entertainment Map — public audience map',
      },
      {
        src: '/screenshots/squanto-about.webp',
        alt: 'About Us',
      },
      {
        src: '/screenshots/squanto-help.webp',
        alt: 'Help / FAQ',
      },
      {
        src: '/screenshots/squanto-contact.webp',
        alt: 'Contact Us',
      },
      {
        src: '/screenshots/squanto-demo.webp',
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
      'A complete rewrite of my personal site. Warm-stone design system, dark mode that adjusts ink and accent (not just background), a resume page and PDF rendered from one data file, and a Playwright pipeline that captures the site as previews for its own project cards.',
    tags: [
      'Vite',
      'React 19',
      'Tailwind v4',
      'React Router v7',
      'TypeScript',
      'Playwright',
    ],
    role: 'Solo',
    timeline: 'Apr 2026',
    bundle: '99 KB gzipped',
    overview: [
      "I rebuilt jdilig.me from the ground up as a showcase of the patterns I use day-to-day — tokens-first styling, a router that generates its own nav metadata, component composition with a small reusable kit, and a resume that renders to both a web page and a PDF from the same data.",
      "Every component and token here was designed in Claude Design first, then ported to a real Vite + React + Tailwind v4 project. The site is the kit.",
    ],
    highlights: [
      'Tokens-first: every color, radius, shadow, and motion curve lives in one CSS file, bridged to Tailwind v4 via `@theme inline`.',
      "Dark mode that flips ink and accent (orange-700 → orange-400) — not just background — driven by a `data-theme` attribute with a `@custom-variant dark` bridge.",
      "Header nav is auto-generated from the router table via a `handle: { showInNav }` convention — adding a route to the nav is a one-line change.",
      'The resume page and the downloadable PDF both render from `src/data/resume.ts`; `npm run resume:pdf` regenerates the PDF with Playwright, so the two never drift.',
      'Playwright captures both site themes and the live Squanto app, writing directly to `/public/screenshots` for use as project previews.',
    ],
    learned:
      "Designing a system and a site simultaneously is a feedback loop you can't fake. Every time the site needed something the system couldn't give it cleanly, the system was wrong — and that's worth listening to.",
    links: {
      live: 'https://jdilig.me',
      source: 'https://github.com/balbonits/jdilig-me-v3',
    },
    lighthouse: jdiligLighthouse,
    previewImage: '/screenshots/home-dark.webp',
    gallery: [
      {
        src: '/screenshots/home-dark.webp',
        alt: 'Home — hero with accent period, dark mode',
      },
      {
        src: '/screenshots/home-light.webp',
        alt: 'Home — light mode',
      },
      {
        src: '/screenshots/projects-dark.webp',
        alt: 'Projects index with filter pills',
      },
      {
        src: '/screenshots/resume.webp',
        alt: 'Resume page',
      },
      {
        src: '/screenshots/contact.webp',
        alt: 'Contact card',
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
    previewImage: '/screenshots/game-running-man.webp',
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
    previewImage: '/screenshots/game-neon-tower-defense.webp',
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
    previewImage: '/screenshots/game-block-fps.webp',
  },
  {
    slug: 'coding-interview-reviewer',
    categories: ['TOOL', 'EXPT'],
    year: '2026',
    title: 'Coding Interview Reviewer',
    accent: 'prep',
    status: 'LIVE',
    desc: 'Local-only front-end interview prep workspace — live coding sandbox, AI mock interviewer, courses, quizzes, spaced repetition, and a floating study assistant. Runs entirely offline.',
    summary:
      'A personal front-end interview prep tool built entirely with AI (Claude Code). Nine integrated modules: live Sandpack exercises with auto-graded tests, MDX notes, AI-generated multi-step courses with progress tracking, streaming mock interviewer with voice + Mermaid diagrams, validated quiz generator, SM-2 spaced repetition, RSS news feed, quick-capture form, and a floating study-assistant chat with on-demand web search. No cloud services — Ollama runs the LLM on-device, MongoDB handles persistence, SearXNG handles search.',
    tags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind v4',
      'shadcn/ui',
      'Sandpack',
      'Ollama',
      'MongoDB',
      'SearXNG',
      'MDX',
      'Web Speech',
      'Mermaid',
    ],
    role: 'Solo — AI-built',
    timeline: 'Apr 2026 — Present',
    overview: [
      'A personal study tool for front-end interview prep, built entirely in conversation with Claude Code. Nine routes cover the full prep loop: /exercises runs live Sandpack sandboxes with auto-graded tests and an AI hint/review/explain panel; /notes is a 21-entry MDX library with sort, tag filter, and a saved-notes scroll frame; /courses bundles notes and exercises into multi-step learning paths (15 of them — DSA, React, TypeScript, APIs, testing, databases, microservices, and more) with progress tracking; /quiz generates validated multiple-choice quizzes from any topic; /interview streams a mock interviewer from a local Ollama LLM with Web Speech voice input and Mermaid diagram rendering; /review drives an SM-2 spaced repetition queue auto-seeded from completed course steps; /news aggregates RSS from four front-end publications with per-item AI summaries; /capture turns any snippet or URL into an MDX-ready note. A floating study-assistant chat is available on every page, with session history, Markdown table rendering, TTS playback, line-numbered code blocks, and on-demand web search via local SearXNG (the LLM decides when to call the search tool).',
      'The architecture is intentionally offline — no SaaS subscriptions, no API keys, no cloud database. Ollama serves the LLM on-device, MongoDB runs locally, SearXNG runs in Docker, and Sandpack executes code in the browser without a backend. `npm run dev:local` checks and starts every service before `next dev`.',
    ],
    highlights: [
      '28 exercises across DSA, React, TypeScript, accessibility, REST, MongoDB, Node.js, SEO, microfrontends, and CSS/UX — each with starter code, auto-graded tests, an AI hint/review/explain panel that reads your live editor state, and a sort-by control on the index.',
      '15 AI-generated courses (with validated slugs) that stitch notes + exercises into a single learning path; completing a step auto-seeds the SM-2 review queue, and a SmartBackLink keeps "back" navigation course-aware as you drill into individual steps.',
      'Streaming mock interviewer via Ollama (`qwen2.5:14b`) with topic presets, Web Speech voice input, Mermaid diagram rendering, custom interview setup, and a "Save to Notes" action that turns the session 1:1 into an MDX note.',
      'Floating study-assistant chat available on every page — session persistence + history, GFM Markdown tables, TTS speak buttons, line-numbered/wrap-toggle code blocks, and on-demand web search via local SearXNG (auto-started in Docker by `dev.sh`) using Ollama tool-calling.',
      'SM-2 spaced repetition implemented from scratch in `lib/spaced-repetition.ts`; review queue seeded from exercises + course-step completions, persisted to local MongoDB.',
      '21 MDX notes (closures, React 19, TypeScript, REST, GraphQL, MongoDB, Postgres, Node, SEO, UX/UI, microservices/MFEs, modern HTML/CSS/JS, testing/QA, plus 5 cheat-sheets) — sortable, tag-filterable at /tags/[tag], parsed at request time via `next-mdx-remote/rsc` with Prism highlighting.',
      'Fully local stack: Ollama at `localhost:11434`, MongoDB at `localhost:27017`, SearXNG via Docker, no `.env` required — `npm run dev:local` checks and starts every dependency before `next dev`.',
    ],
    learned:
      'Offline-first architecture is a forcing function for simplicity. Without a cloud database, managed LLM, or hosted search, every integration becomes a direct dependency you can inspect and debug. Adding tool-calling (web search) and a global floating assistant on top of that base felt easy precisely because every layer was already running on localhost — no auth dance, no rate limits, no surprise bills.',
    links: {
      source: 'https://github.com/balbonits/coding-interview-reviewer',
    },
    previewImage: '/screenshots/cir-exercises.webp',
    gallery: [
      { src: '/screenshots/cir-exercises.webp', alt: 'Exercises — live Sandpack editor with auto-graded tests' },
      { src: '/screenshots/cir-notes.webp', alt: 'Notes — MDX library with tag filtering' },
      { src: '/screenshots/cir-interview.webp', alt: 'Interview — streaming AI mock interviewer' },
      { src: '/screenshots/cir-review.webp', alt: 'Review — SM-2 spaced repetition queue' },
      { src: '/screenshots/cir-news.webp', alt: 'News — RSS feed with AI summarization' },
      { src: '/screenshots/cir-capture.webp', alt: 'Capture — quick snippet / URL capture form' },
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
    previewImage: '/screenshots/game-maze-runner.webp',
  },
];

/** The projects the site shows. */
export const PROJECTS = ALL_PROJECTS.filter((p) => !p.hidden);

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
