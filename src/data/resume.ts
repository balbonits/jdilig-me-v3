export type SkillCategory = {
  label: string;
  items: string[];
};

export type Job = {
  role: string;
  company: string;
  location: string;
  when: string;
  bullets: string[];
  link?: { label: string; href: string };
};

export const SUMMARY = `Front-End Developer with 18+ years of experience building and maintaining complex, high-reliability web applications. Deep expertise in React and TypeScript for sophisticated, state-heavy interfaces, combined with practical full-stack experience across Java/Spring and modern JavaScript ecosystems. Proven ability to troubleshoot production issues under pressure, collaborate closely with architects and cross-functional teams, and leverage Generative AI (Claude Code) to accelerate development, documentation, testing, and architecture decisions. Strong track record delivering reliable, scalable solutions for high-traffic platforms and streaming services.`;

export const SKILLS: SkillCategory[] = [
  {
    label: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'Redux',
      'Zustand',
      'React Query',
      'React Router',
      'Tailwind',
      'Material UI',
      'Chart.js',
      'Leaflet',
    ],
  },
  {
    label: 'Backend & Full-Stack',
    items: ['Java', 'Spring Boot', 'ASP.NET', 'RESTful API integration'],
  },
  {
    label: 'Data & Logging',
    items: ['JSON-based data modeling', 'High-throughput logging patterns'],
  },
  {
    label: 'AI-Augmented Development',
    items: [
      'Claude Code (agentic generation, documentation, testing, architecture)',
      'GenAI tooling',
    ],
  },
  {
    label: 'Media & Streaming',
    items: [
      'JW Player',
      'HLS.js',
      'Live event interfaces',
      'Real-time state management',
    ],
  },
  {
    label: 'Practices',
    items: [
      'Performance optimization (Google Lighthouse)',
      'Automated testing (Jest, Vitest, Webdriver.IO)',
      'Git workflows',
      'High-reliability systems',
    ],
  },
];

export const EXPERIENCE: Job[] = [
  {
    role: 'Senior Front-End Developer',
    company: 'Squanto',
    location: 'Los Angeles, CA (Remote)',
    when: 'Oct 2025 — Present',
    bullets: [
      'Sole Front-End Developer on squanto.app — a two-sided live-entertainment marketplace connecting event hosts, performers, and audiences — owning the entire web UI through design, implementation, testing, and soft-launch readiness.',
      'Established the frontend architecture from scratch: React 19 + React Router v7 + Tailwind CSS v4 with semantic design tokens, a typed mock-data layer with localStorage persistence, and strict data-attribute conventions for QA targeting.',
      'Built the interactive map system on react-leaflet — shared by public audience and authenticated event-hosting pages — with pixel-based overlap cycling, light/dark tile inversion, and PRO feature-gated filters.',
      'Designed a two-party gig-acceptance workflow with counter-offer history, action-required ribbons, and a five-section performer dashboard, integrated with a booking contract flow.',
      'Shipped a Tailwind-v4 design system, a Modal / ConfirmDialog / Toast feedback layer, API-driven category dropdowns, and a subscription-plan system with PRO-tier feature flags.',
      'Integrated GA4 + Meta Pixel analytics with GDPR/CCPA consent, form-interaction tracking, external-link tracking, and automatic API / render / unhandled error capture.',
      'Delivered a PWA + Cordova hybrid mobile build from a single React codebase, plus a Lighthouse-based healthcheck pipeline (build, lint, bundle-size, mobile + desktop scores).',
      'Drove end-to-end delivery in partnership with the CEO and systems architect via live debugging sessions and spec-driven development, leveraging Claude Code for agentic code generation, documentation, and test coverage.',
    ],
    link: { label: 'squanto.app', href: 'https://squanto.app/' },
  },
  {
    role: 'React / CMS Developer (Contract)',
    company: 'Trinity Broadcasting Network',
    location: 'Fort Worth, TX (Hybrid)',
    when: 'Jun 2023 — Aug 2024',
    bullets: [
      'Led React / TypeScript frontend development for TBNPlus.com and MeritPlus.com subscription streaming platforms, owning complex user flows including authentication and payment.',
      'Collaborated with backend engineers on Okta and Stripe integration while troubleshooting and optimizing UI performance and reliability.',
      'Provided technical support and maintenance for TBN.org and supporting microsites using WordPress and Drupal CMS.',
    ],
    link: { label: 'tbnplus.com', href: 'https://www.tbnplus.com/' },
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'AWS QuickSight',
    location: 'Seattle, WA (Remote)',
    when: 'Jul 2022 — May 2023',
    bullets: [
      'Developed, updated, and troubleshot React, Redux, and TypeScript UI components for AWS QuickSight, a large-scale business intelligence and data visualization platform.',
      'Delivered production components under strict testing standards and collaborated on cross-functional prototypes.',
    ],
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'FOX',
    location: 'Los Angeles, CA (Remote)',
    when: 'Jun 2020 — May 2022',
    bullets: [
      'Maintained and enhanced the FOX Web Player (powered by JW Player) used across FOX.com, FOXSports.com, FOX Nation, and other properties serving millions of users.',
      'Diagnosed and resolved complex UI and WebView issues, including channel branding and compatibility on Xbox and Chromecast.',
      'Implemented analytics tracing and performance improvements in close coordination with engineering teams.',
    ],
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'ADP',
    location: 'Pasadena, CA',
    when: 'Nov 2019 — May 2020',
    bullets: [
      "Built and maintained React components and pages for myWisely, ADP's direct-to-consumer debit card platform and hybrid mobile app — delivering reusable UI for both browser and mobile webview.",
      'Implemented testing with Jest and Selenium Webdriver alongside Material UI, Webpack, and Redux state management.',
    ],
  },
  {
    role: 'Front-End Developer',
    company: 'FOX Sports (FOX Corporation)',
    location: 'Los Angeles, CA',
    when: 'Mar 2012 — Aug 2019',
    bullets: [
      'Front-End Developer on the FOXSports.com team — a leading high-traffic sports media platform covering NFL, MLB, NBA, NCAA, FIFA World Cup, US Open, and the Olympics.',
      'Contributed to multiple full-site redesigns and CMS migrations, working with proprietary Java Spring backend systems to deliver JSON / HTML output.',
      'Built and supported complex interactive features including live scoreboards, event brackets, newsletter tools, ad integrations, and companion video players using JavaScript, React.js (partial integration), JW Player, and Webpack.',
      'Supported high-reliability media operations through performance optimization, analytics implementation, and on-call PagerDuty coverage during major live events and channel launches (including FS1).',
    ],
    link: { label: 'foxsports.com', href: 'https://www.foxsports.com/' },
  },
  {
    role: 'UI Engineer',
    company: 'Medversant Technologies LLC',
    location: 'Los Angeles, CA',
    when: 'May 2008 — Feb 2012',
    bullets: [
      'Primary UI Engineer responsible for designing and building the complete frontend of ProviderSource.com, a pioneering SaaS medical credentialing platform.',
      'Developed complex form-heavy interfaces and internal web applications to support large-scale data processing workflows.',
    ],
  },
];

export const EDUCATION = {
  school: 'ITT Technical Institute',
  location: 'San Dimas, CA',
  degree: 'Associate of Science, Computer Network Systems',
  when: 'Jun 2006 — Dec 2008',
} as const;
