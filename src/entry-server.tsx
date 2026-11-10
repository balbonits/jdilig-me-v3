/* eslint-disable react-refresh/only-export-components -- build-time module, never hot-reloaded */
// Build-time only: renders each route to static HTML so crawlers and visitors
// without JavaScript get the real content (see scripts/prerender.mjs).
import { renderToString } from 'react-dom/server';
import { StaticRouter, useRoutes } from 'react-router';
import { routeTree } from '@/router';
import { PAGES, projectMeta, uxMeta, type PageMeta } from '@/data/pages';
import { UX_CASE_STUDIES, uxPath } from '@/data/ux';
import { PROJECTS } from '@/data/projects';
import { PROFILE } from '@/data/profile';
import { EXPERIENCE, HEADLINE, SKILLS, SUMMARY } from '@/data/resume';

function Routes() {
  return useRoutes(routeTree);
}

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Routes />
    </StaticRouter>,
  );
}

/** Every page to prerender, with its metadata. `file` is relative to dist/. */
export function pages(): Array<{ url: string; file: string; meta: PageMeta }> {
  return [
    { url: '/', file: 'index.html', meta: PAGES.home },
    { url: '/projects', file: 'projects.html', meta: PAGES.projects },
    ...PROJECTS.map((p) => ({
      url: `/projects/${p.slug}`,
      file: `projects/${p.slug}.html`,
      meta: projectMeta(p),
    })),
    { url: '/ux', file: 'ux.html', meta: PAGES.ux },
    ...UX_CASE_STUDIES.map((c) => ({
      url: uxPath(c),
      file: `${uxPath(c).slice(1)}.html`,
      meta: uxMeta(c),
    })),
    { url: '/resume', file: 'resume.html', meta: PAGES.resume },
    { url: '/contact', file: 'contact.html', meta: PAGES.contact },
    { url: '/accessibility', file: 'accessibility.html', meta: PAGES.accessibility },
    { url: '/404', file: '404.html', meta: PAGES.notFound },
  ];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Jul 2026" -> "2026-07"; anything else -> undefined. */
function isoMonth(text: string): string | undefined {
  const m = /^([A-Z][a-z]{2}) (\d{4})$/.exec(text.trim());
  if (!m) return undefined;
  const i = MONTHS.indexOf(m[1]);
  return i < 0 ? undefined : `${m[2]}-${String(i + 1).padStart(2, '0')}`;
}

/** schema.org Person + WebSite, built from the same data the pages show. */
export function structuredData(): object[] {
  const site = `${PROFILE.website}/`;
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site}#person`,
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    description: `${HEADLINE}. ${SUMMARY}`,
    url: site,
    image: `${PROFILE.website}/og-image.png`,
    email: `mailto:${PROFILE.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Redondo Beach', addressRegion: 'CA', addressCountry: 'US' },
    sameAs: [PROFILE.github, PROFILE.linkedin],
    knowsAbout: SKILLS,
    alumniOf: { '@type': 'EducationalOrganization', name: 'ITT Technical Institute' },
    worksFor: EXPERIENCE.map((job) => {
      const [start, end] = job.when.split('–').map((s) => s.trim());
      return {
        '@type': 'EmployeeRole',
        roleName: job.role,
        startDate: isoMonth(start ?? ''),
        endDate: isoMonth(end ?? ''),
        worksFor: { '@type': 'Organization', name: job.company },
      };
    }),
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}#website`,
    name: 'jdilig.me',
    url: site,
    description: PAGES.home.description,
    inLanguage: 'en',
    author: { '@id': `${site}#person` },
    publisher: { '@id': `${site}#person` },
  };
  return [person, website];
}

export { PROFILE };
