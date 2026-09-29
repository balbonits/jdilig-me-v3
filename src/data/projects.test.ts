import { describe, it, expect } from 'vitest';
import {
  liveLinkLabel,
  filterProjects,
  sortProjects,
  getAdjacent,
  ALL_PROJECTS,
  PROJECTS,
  type Project,
  type ProjectCategory,
} from './projects';

function makeProject(overrides: Partial<Project>): Project {
  return {
    slug: 'test',
    categories: ['SITE'],
    year: '2026',
    title: 'Test Project',
    status: 'LIVE',
    desc: '',
    summary: '',
    tags: [],
    role: '',
    timeline: '',
    bundle: '',
    overview: [],
    highlights: [],
    links: {},
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// liveLinkLabel
// ---------------------------------------------------------------------------

describe('liveLinkLabel', () => {
  it('returns custom liveLabel when set', () => {
    const p = makeProject({ categories: ['GAME'], liveLabel: 'Launch' });
    expect(liveLinkLabel(p)).toBe('Launch');
  });

  it('returns "Visit site" for WORK primary', () => {
    expect(liveLinkLabel(makeProject({ categories: ['WORK'] }))).toBe('Visit site');
  });

  it('returns "Visit site" for SITE primary', () => {
    expect(liveLinkLabel(makeProject({ categories: ['SITE'] }))).toBe('Visit site');
  });

  it('returns "Play" for GAME primary', () => {
    expect(liveLinkLabel(makeProject({ categories: ['GAME', 'EXPT'] }))).toBe('Play');
  });

  it('returns "Open" for TOOL primary', () => {
    expect(liveLinkLabel(makeProject({ categories: ['TOOL', 'EXPT'] }))).toBe('Open');
  });

  it('returns "Live demo" for EXPT primary', () => {
    expect(liveLinkLabel(makeProject({ categories: ['EXPT'] }))).toBe('Live demo');
  });
});

// ---------------------------------------------------------------------------
// filterProjects
// ---------------------------------------------------------------------------

describe('filterProjects', () => {
  const game = makeProject({ slug: 'game', categories: ['GAME', 'EXPT'] });
  const site = makeProject({ slug: 'site', categories: ['SITE'] });
  const tool = makeProject({ slug: 'tool', categories: ['TOOL', 'EXPT'] });
  const projects = [game, site, tool];

  it('returns all projects when active set is empty', () => {
    expect(filterProjects(projects, new Set())).toEqual(projects);
  });

  it('filters to exact category match', () => {
    const result = filterProjects(projects, new Set<ProjectCategory>(['SITE']));
    expect(result).toEqual([site]);
  });

  it('includes projects with any matching category (multi-category project)', () => {
    const result = filterProjects(projects, new Set<ProjectCategory>(['EXPT']));
    expect(result).toEqual([game, tool]);
  });

  it('supports multi-select — returns union across selected categories', () => {
    const result = filterProjects(
      projects,
      new Set<ProjectCategory>(['GAME', 'SITE']),
    );
    expect(result).toEqual([game, site]);
  });

  it('returns empty array when no projects match', () => {
    const result = filterProjects(projects, new Set<ProjectCategory>(['WORK']));
    expect(result).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// sortProjects
// ---------------------------------------------------------------------------

describe('sortProjects', () => {
  const a = makeProject({ slug: 'a', title: 'Alpha', year: '2024' });
  const b = makeProject({ slug: 'b', title: 'Bravo', year: '2026' });
  const c = makeProject({ slug: 'c', title: 'Charlie', year: '2025' });
  const projects = [a, b, c];

  it('sorts by year descending (newest first)', () => {
    const result = sortProjects(projects, 'year-desc');
    expect(result.map((p) => p.slug)).toEqual(['b', 'c', 'a']);
  });

  it('sorts by year ascending (oldest first)', () => {
    const result = sortProjects(projects, 'year-asc');
    expect(result.map((p) => p.slug)).toEqual(['a', 'c', 'b']);
  });

  it('sorts by title A-Z', () => {
    const result = sortProjects(projects, 'title-asc');
    expect(result.map((p) => p.slug)).toEqual(['a', 'b', 'c']);
  });

  it('does not mutate the input array', () => {
    const original = [...projects];
    sortProjects(projects, 'year-asc');
    expect(projects).toEqual(original);
  });
});

// ---------------------------------------------------------------------------
// PROJECTS seed data sanity checks
// ---------------------------------------------------------------------------

describe('PROJECTS seed data', () => {
  it('every project has at least one category', () => {
    for (const p of ALL_PROJECTS) {
      expect(p.categories.length).toBeGreaterThan(0);
    }
  });

  it('games are tagged with both GAME and EXPT', () => {
    const games = ALL_PROJECTS.filter((p) => p.categories.includes('GAME'));
    for (const g of games) {
      expect(g.categories).toContain('EXPT');
    }
  });

  // The Projects page shows the first featured project as the hero and leaves
  // every featured project out of the grid, so a second one would vanish.
  it('features at most one visible project', () => {
    expect(PROJECTS.filter((p) => p.featured).length).toBeLessThanOrEqual(1);
  });
});

// ---------------------------------------------------------------------------
// Content that pages depend on
// ---------------------------------------------------------------------------

describe('project content', () => {
  // Shown through RichText, which turns `backtick` pairs into <code>.
  const richText = (p: Project) => [
    ...p.overview,
    ...p.highlights,
    ...(p.learned ? [p.learned] : []),
  ];
  // Shown as plain text, so a backtick would appear as a backtick.
  const plainText = (p: Project) => [p.title, p.accent ?? '', p.desc, p.summary];
  const backticks = (text: string) => text.split('`').length - 1;

  it('gives every project its own slug (it is the URL)', () => {
    const slugs = ALL_PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses four-digit years', () => {
    for (const p of ALL_PROJECTS) expect(p.year).toMatch(/^\d{4}$/);
  });

  it('links only to https URLs', () => {
    for (const p of ALL_PROJECTS) {
      for (const url of Object.values(p.links)) {
        expect(url, p.slug).toMatch(/^https:\/\//);
      }
    }
  });

  // These lists render with the text as the React key.
  it('has no repeated tag, paragraph, or highlight within a project', () => {
    for (const p of ALL_PROJECTS) {
      for (const list of [p.tags, p.overview, p.highlights]) {
        expect(new Set(list).size, p.slug).toBe(list.length);
      }
    }
  });

  it('closes every backtick in text shown through RichText', () => {
    for (const p of ALL_PROJECTS) {
      for (const text of richText(p)) expect(backticks(text) % 2, p.slug).toBe(0);
    }
  });

  it('has no backticks in text that is not shown through RichText', () => {
    for (const p of ALL_PROJECTS) {
      for (const text of plainText(p)) expect(backticks(text), p.slug).toBe(0);
    }
  });
});

describe('getAdjacent', () => {
  it('wraps around the ends of the list', () => {
    const first = PROJECTS[0];
    const last = PROJECTS[PROJECTS.length - 1];
    expect(getAdjacent(first.slug).prev).toBe(last);
    expect(getAdjacent(last.slug).next).toBe(first);
  });

  it('steps through the list in order', () => {
    const [a, b, c] = PROJECTS;
    expect(getAdjacent(b.slug)).toEqual({ prev: a, next: c });
  });
});
