import { describe, it, expect } from 'vitest';
import {
  liveLinkLabel,
  filterProjects,
  sortProjects,
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
    for (const p of PROJECTS) {
      expect(p.categories.length).toBeGreaterThan(0);
    }
  });

  it('games are tagged with both GAME and EXPT', () => {
    const games = PROJECTS.filter((p) => p.categories.includes('GAME'));
    for (const g of games) {
      expect(g.categories).toContain('EXPT');
    }
  });
});
