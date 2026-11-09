// Resume content for the home #resume section and /resume.
// Source of truth: Job Hunter's NDA-safe site copy (/workspace/jdilig-site/resume-copy.md),
// used word for word per John (2026-11-09). Add nothing that is not in that copy.
// public/Reuel_John_Dilig_Resume.pdf is John's master resume PDF, copied as is.

export type Job = {
  role: string;
  company: string;
  when: string;
  summary: string;
};

export const HEADLINE = "Senior Front-End Developer — React, TypeScript, Next.js";

export const STATUS = "Open to full-time front-end roles. Based in Redondo Beach, CA; remote preferred. Available now.";

export const SUMMARY = "I've been building production web apps for 18+ years, mostly in media, sports, streaming and SaaS. These days I work in React, TypeScript and Next.js, on real-time, data-dense interfaces: live data tables, AI-powered query tools, auth and payment flows. I like owning a feature from the first commit to production, and I use AI-assisted tooling (Claude Code, multi-agent workflows) to ship faster and keep docs and tests current.";

export const SKILLS: string[] = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Redux",
  "Zustand",
  "React Query",
  "GraphQL",
  "REST",
  "Tailwind CSS",
  "Material UI",
  "Accessibility",
  "Jest",
  "Testing Library",
  "Vitest",
  "Enterprise SSO / role-based UI",
  "Okta",
  "Stripe",
  "JW Player",
  "Vite",
  "Webpack",
  "Claude Code / AI-assisted development",
];

export const EXPERIENCE: Job[] = [
  {
    role: "Frontend Developer (Contract)",
    company: "FOX",
    when: "Jul 2026 – Nov 2026",
    summary:
      "Front-end work on a new internal real-time analytics web app, from early build to production. I mostly built the sortable, filterable data tables with live GraphQL data and the natural-language AI query feature (streamed answers, saved history, follow-ups), and I assisted with map visualizations and other UI work. On election night it was used by FOX News analysts and producers and was displayed as \"Election Insights\" during FOX News' election watch.",
  },
  {
    role: "Senior Front-End Developer",
    company: "Squanto",
    when: "Oct 2025 – Jun 2026",
    summary:
      "Sole front-end developer for squanto.app, a live gig marketplace for hosts, performers and audiences. Built the entire web UI in React/TypeScript through soft launch, including real-time maps and data visualizations, and extended it to mobile as a PWA.",
  },
  {
    role: "React/TypeScript Developer (Contract)",
    company: "Trinity Broadcasting Network",
    when: "Jun 2023 – Aug 2024",
    summary:
      "Led front-end development for the TBNPlus and MeritPlus subscription streaming platforms, owning sign-in and payment flows (Okta, Stripe).",
  },
  {
    role: "Front-End Developer (Contract)",
    company: "AWS QuickSight",
    when: "Jul 2022 – May 2023",
    summary:
      "Built React, Redux and TypeScript UI components for AWS's business intelligence platform.",
  },
  {
    role: "Front-End Developer (Contract)",
    company: "FOX",
    when: "Jun 2020 – May 2022",
    summary:
      "Maintained and enhanced the FOX Web Player (JW Player) across FOX.com, FOXSports.com, FOX Nation and more, including fixes for Xbox and Chromecast.",
  },
  {
    role: "Front-End Developer (Contract)",
    company: "ADP",
    when: "Nov 2019 – May 2020",
    summary:
      "Built React components and pages for myWisely, ADP's consumer debit card platform and hybrid mobile app.",
  },
  {
    role: "Front-End Developer",
    company: "FOX Sports",
    when: "Mar 2012 – Aug 2019",
    summary:
      "Built real-time features for FOXSports.com across the NFL, MLB, NBA, World Cup and Olympics: live scoreboards, brackets and video players. Contributed to \"The Vanishing Man,\" a Sports Emmy–winning longform feature, and covered on-call for major live events.",
  },
  {
    role: "UI Engineer",
    company: "Medversant Technologies",
    when: "May 2008 – Feb 2012",
    summary:
      "Primary UI engineer for ProviderSource.com, a SaaS medical credentialing platform.",
  },
];

export const EDUCATION = "A.S., Computer Network Systems — ITT Technical Institute";
