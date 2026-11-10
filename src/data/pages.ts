import type { Project } from '@/data/projects';
import { uxPath, type UxCaseStudy } from '@/data/ux';

/** What a page tells browsers and search engines (see `usePageMeta`). */
export type PageMeta = {
  /** The whole `<title>`. */
  title: string;
  description: string;
  /** Where the page lives on the site; becomes its canonical URL. */
  path: string;
  /** Keep the page out of search results and skip its canonical URL (404s, errors). */
  noindex?: boolean;
};

const SITE = 'jdilig.me';

export const PAGES = {
  // Keep home's title and description in step with index.html (a test checks).
  home: {
    title: `${SITE} — John Dilig, Front-End Developer`,
    description:
      'Personal portfolio of John Dilig — Senior Front-End Developer in Redondo Beach, CA. React, TypeScript, and AI-assisted browser games. 18+ years shipping high-traffic web apps.',
    path: '/',
  },
  projects: {
    title: `Projects — ${SITE}`,
    description:
      'Side projects, browser games, and client work by John Dilig: React, TypeScript, and AI-assisted development.',
    path: '/projects',
  },
  ux: {
    title: `UX case studies — ${SITE}`,
    description:
      'UX case studies by John Dilig: an accessible React design system, plus prototypes built with it, from research to shipped code.',
    path: '/ux',
  },
  resume: {
    title: `Resume — ${SITE}`,
    description:
      'Resume of John Dilig, Senior Front-End Developer in Redondo Beach, CA: React, TypeScript, and 18+ years shipping high-traffic web apps.',
    path: '/resume',
  },
  contact: {
    title: `Contact — ${SITE}`,
    description:
      'Email, phone, LinkedIn, and GitHub for John Dilig, Senior Front-End Developer in Redondo Beach, CA.',
    path: '/contact',
  },
  accessibility: {
    title: `Accessibility — ${SITE}`,
    description:
      "jdilig.me's accessibility statement: the WCAG 2.2 AA and Section 508 target, current status, known limitations, how the site is tested and how to report a problem.",
    path: '/accessibility',
  },
  notFound: {
    title: `Page not found — ${SITE}`,
    description: "That page doesn't exist.",
    path: '/',
    noindex: true,
  },
  error: {
    title: `Something went wrong — ${SITE}`,
    description: 'This page hit an error.',
    path: '/',
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

export function projectMeta(
  project: Pick<Project, 'slug' | 'title' | 'desc'>,
): PageMeta {
  return {
    title: `${project.title} — ${SITE}`,
    description: project.desc,
    path: `/projects/${project.slug}`,
  };
}

export function uxMeta(study: Pick<UxCaseStudy, 'slug' | 'path' | 'name' | 'blurb'>): PageMeta {
  return {
    title: `${study.name} case study — ${SITE}`,
    description: study.blurb,
    path: uxPath(study),
  };
}
