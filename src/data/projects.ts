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
  /** Image gallery shown on the project detail page. */
  gallery?: { src: string; alt: string }[];
  /**
   * Label for the "live" link (button + nav). Defaults to a kind-appropriate
   * label — WORK / SITE → "Visit site", GAME → "Play", TOOL → "Open",
   * EXPT → "View demo".
   */
  liveLabel?: string;
};

export function liveLinkLabel(project: Project): string {
  if (project.liveLabel) return project.liveLabel;
  switch (project.kind) {
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

export const PROJECTS: Project[] = [
  {
    slug: 'squanto',
    kind: 'WORK',
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
    kind: 'SITE',
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
