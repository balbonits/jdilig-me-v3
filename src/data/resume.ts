// Resume content for /resume and the downloadable PDF
// (`npm run resume:pdf` renders public/Reuel_John_Dilig_Resume.pdf from it).

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

export const SUMMARY = `Senior front-end developer with 18+ years of shipping production web apps, most recently in React and TypeScript. Built for high-traffic streaming, enterprise SaaS, consumer fintech, and live-event platforms — including front-end work on a Sports Emmy–winning FOX Sports feature. Strong focus on UX, accessibility, and performance, and on close collaboration with backend and design teams. Uses Claude Code to speed up development, documentation, and testing, with human review at every step.`;

export const SKILLS: SkillCategory[] = [
  {
    label: 'Front-End',
    items: [
      'React',
      'TypeScript',
      'JavaScript (ES6+)',
      'Redux',
      'React Router',
      'HTML5',
      'CSS3',
    ],
  },
  {
    label: 'UI & Styling',
    items: ['Tailwind CSS', 'Material UI', 'Responsive design', 'Accessibility (a11y)'],
  },
  {
    label: 'Testing & Quality',
    items: [
      'Jest',
      'Testing Library',
      'Vitest',
      'WebdriverIO',
      'Selenium',
      'Lighthouse',
    ],
  },
  {
    label: 'Data Visualization & Maps',
    items: ['Chart.js', 'Leaflet'],
  },
  {
    label: 'Media & Streaming',
    items: ['JW Player', 'Live-event interfaces', 'Real-time state management'],
  },
  {
    label: 'AI-Assisted Development',
    items: ['Claude Code', 'GenAI workflows for planning, code review & QA'],
  },
  {
    label: 'Tools & Workflow',
    items: ['Vite', 'Webpack', 'Git', 'REST APIs', 'JSON data modeling'],
  },
  {
    label: 'Backend (working knowledge)',
    items: ['Java / Spring Boot', 'ASP.NET'],
  },
];

export const EXPERIENCE: Job[] = [
  {
    role: 'Front-End Developer (Contract)',
    company: 'Fox Corporation',
    location: 'Los Angeles, CA',
    when: 'Jul 2026 — Present',
    bullets: [
      'Build the front end of an internal Fox News product: responsive navigation, sortable data tables, global filters, interactive maps, and a streaming AI query interface.',
      'Connect live queries and subscription updates to the UI through reusable hooks and adapters.',
      'Implement enterprise SSO, protected routes, session management, and role-based access control.',
      'Evaluated SVG, Canvas, and WebGL rendering approaches for large-scale data visualization.',
      'Own features end to end — technical planning, development, testing with Jest and Testing Library, code review, and documentation.',
      'Set up AI-assisted workflows for planning, code review, and QA, each with a human approval gate.',
    ],
  },
  {
    role: 'Senior Front-End Developer',
    company: 'Squanto',
    location: 'Los Angeles, CA (Remote)',
    when: 'Oct 2025 — Jun 2026',
    bullets: [
      'Sole front-end developer for squanto.app, a live-entertainment marketplace connecting event hosts, performers, and audiences — owned the web UI from first build through soft launch.',
      'Set up the front-end architecture from scratch: React 19, React Router v7, Tailwind CSS v4 design tokens, and a typed mock-data layer.',
      'Built the interactive event map (react-leaflet) shared by public and signed-in pages, plus data visualizations and analytics views for live, frequently updating data.',
      'Designed the two-party gig-booking flow — offers, counter-offers with full history, and action-needed alerts — connected to the booking contract step.',
      'Shipped a PWA + Cordova mobile build from the same React codebase, plus GA4 and Meta Pixel analytics with GDPR/CCPA consent.',
      'Partnered with the CEO and systems architect through live debugging sessions and spec-driven development; used Claude Code to speed up documentation and test coverage.',
    ],
    link: { label: 'squanto.app', href: 'https://squanto.app/' },
  },
  {
    role: 'React / TypeScript Developer (Contract)',
    company: 'Trinity Broadcasting Network',
    location: 'Fort Worth, TX (Hybrid)',
    when: 'Jun 2023 — Aug 2024',
    bullets: [
      'Led React and TypeScript front-end development for the TBNPlus.com and MeritPlus.com subscription streaming platforms — sign-in and payment flows, plus the MeritPlus marketing landing page.',
      'Worked with backend engineers on Okta (authentication) and Stripe (payments) integrations, and tuned UI performance and reliability.',
      'Maintained TBN.org and related microsites on WordPress and Drupal.',
    ],
    link: { label: 'tbnplus.com', href: 'https://www.tbnplus.com/' },
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'Amazon Web Services',
    location: 'Seattle, WA (Remote)',
    when: 'Jul 2022 — May 2023',
    bullets: [
      "Built and maintained React, Redux, and TypeScript UI components for AWS QuickSight, AWS's business-intelligence platform — including data visualizations such as line charts and word clouds.",
      'Shipped production components under strict testing standards and helped prototype new features with cross-functional teams.',
    ],
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'FOX',
    location: 'Los Angeles, CA (Remote)',
    when: 'Jun 2020 — May 2022',
    bullets: [
      'Maintained and extended the FOX Web Player (built on JW Player), used by millions of viewers across FOX.com, FOX Sports, FOX Nation, and other FOX properties.',
      'Tracked down complex UI and WebView issues, including channel branding and compatibility on Xbox and Chromecast.',
      'Added analytics tracing and performance improvements in close coordination with the engineering team.',
    ],
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'ADP',
    location: 'Pasadena, CA',
    when: 'Nov 2019 — May 2020',
    bullets: [
      "Built React components and pages for myWisely, ADP's direct-to-consumer debit card app, reused across the browser and a hybrid mobile webview.",
      'Wrote tests with Jest and Selenium WebDriver on a stack built with Material UI, Redux, and Webpack.',
    ],
  },
  {
    role: 'Front-End Developer',
    company: 'FOX Sports (FOX Corporation)',
    location: 'Los Angeles, CA',
    when: 'Mar 2012 — Aug 2019',
    bullets: [
      'Front-end developer on FOXSports.com, a high-traffic sports platform covering the NFL, MLB, NBA, NCAA, FIFA World Cup, US Open, and the Olympics.',
      'Built interactive features: live scoreboards, event brackets, newsletter tools, ad integrations, and companion video players.',
      'Contributed front-end work to “The Vanishing Man,” a Sports Emmy Award–winning long-form feature.',
      'Took part in several full-site redesigns and CMS migrations on a Java / Spring backend.',
      'Kept major live events running through performance tuning, analytics, and on-call PagerDuty coverage, including the FS1 channel launch.',
    ],
    link: {
      label: 'The Vanishing Man (Sports Emmy)',
      href: 'https://www.foxsports.com/stories/other/the-vanishing-man',
    },
  },
  {
    role: 'UI Engineer',
    company: 'Medversant Technologies',
    location: 'Los Angeles, CA',
    when: 'May 2008 — Feb 2012',
    bullets: [
      'Sole front-end developer on ProviderSource.com, an early SaaS platform for medical credentialing — built the full UI, including complex form-heavy workflows and internal tools for large-scale data processing.',
    ],
  },
];

export const EDUCATION = {
  school: 'ITT Technical Institute',
  location: 'San Dimas, CA',
  degree: 'Associate of Science, Computer Network Systems',
  when: 'Dec 2008',
} as const;
