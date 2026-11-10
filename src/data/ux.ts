// UX case studies. Copy from Chief of Creatives (DS-CASE-COPY.md v1.0); facts match the shipped repo.

export type UxSection = { title: string; paragraphs?: string[]; bullets?: string[] };

export type UxCaseStudy = {
  slug: string;
  name: string;
  /** Full page title shown as the h1. */
  title: string;
  /** One line for the /ux index card. */
  blurb: string;
  lede: string;
  links: { demo: { label: string; href: string }; source: string };
  images: Array<{ src: string; alt: string; width: number; height: number }>;
  sections: UxSection[];
};

export const UX_CASE_STUDIES: UxCaseStudy[] = [
  {
    slug: 'design-system',
    name: 'Ember UI',
    title: 'Ember UI: an accessible design system starter',
    blurb:
      'Ember UI: a small, accessible React design system with tokens, eight components and docs for every one.',
    lede:
      'I built a small design system from the ground up: tokens first, eight core components, and documentation that explains how each one works by keyboard and for screen readers.',
    links: {
      demo: { label: 'View the Storybook', href: 'https://ember-ui-storybook.vercel.app' },
      source: 'https://github.com/balbonits/ember-ui',
    },
    images: [
      { src: '/ux/ember-ui-modal-light.png', alt: 'Ember UI Modal open in the light theme: an "Add a role" dialog with a required Company field, Cancel and Save buttons, and a focused close button.', width: 1024, height: 720 },
      { src: '/ux/ember-ui-modal-dark.png', alt: 'The same Ember UI Modal in the dark theme.', width: 1024, height: 720 },
    ],
    sections: [
      {
        title: 'Problem',
        paragraphs: [
          "Most front-end projects I've worked on start fast and drift. Colors get copied by hand, buttons come in five slightly different versions, and accessibility gets checked at the end, if at all. I wanted to show what it looks like to do it the other way: decide the foundations once and make accessible behavior the default instead of an add-on.",
        ],
      },
      {
        title: "Who it's for",
        bullets: [
          'Assumption: a small product team, a few front-end developers and one designer, who needs consistent UI without adopting a large third-party library.',
          'Assumption: developers who will use the components without reading the WCAG spec, so the docs have to tell them what matters.',
        ],
      },
      {
        title: 'Approach',
        bullets: [
          'Tokens first. Color, type, spacing, radius and motion live in one file before any component exists.',
          'Small and finished. Eight components, each with every state built and documented, instead of thirty half-done ones.',
          'Native first. Where the browser already does the job, like the dialog element or a native select, I use it and style it.',
          'Checked automatically. Every story runs through an automated accessibility scan, so a regression shows up before it ships.',
        ],
      },
      {
        title: 'Tokens',
        paragraphs: [
          'The tokens come from the same set I use on this site, so Ember UI and jdilig.me match. There\'s a raw palette and a semantic layer on top (background, surface, text, border, accent, focus and status colors), with light and dark themes. Every text and background pairing is documented with its contrast ratio. Motion tokens turn off for anyone who has reduced motion set.',
        ],
      },
      {
        title: 'Components',
        paragraphs: [
          'Button, Input, Select, Checkbox, Modal, Tabs, Table and Toast. Each one has its default, hover, focus, active, disabled and error states where they apply. Every docs page follows the same order: when to use it, anatomy, variants, states, keyboard keys, accessibility notes and a code example.',
        ],
      },
      {
        title: 'Accessibility',
        bullets: [
          'Every component works fully by keyboard, with a visible focus ring.',
          'The Modal traps focus, closes on Escape and returns focus to whatever opened it.',
          'Tabs follow the WAI-ARIA tabs pattern, with arrow keys, Home and End.',
          'Tables have captions, header scope and sort state announced to screen readers.',
          'Toasts announce politely for info and assertively for errors, and pause while you hover or focus them.',
          'Form errors are tied to their fields, so screen readers read them with the input.',
          'The automated scan reports zero serious or critical issues on every story.',
        ],
      },
      {
        title: 'Result',
        paragraphs: [
          'Ember UI is live as a Storybook with every component, the token sheet and light and dark themes. The code, a dated progress log and milestone screenshots are public on GitHub.',
        ],
      },
      {
        title: "What I'd do next",
        bullets: [
          'Add a custom listbox for searchable selects.',
          'Publish it as an npm package with versioned releases.',
          'Add visual regression tests alongside the accessibility checks.',
          'Grow it alongside the next two projects, the job tracker and the dev dashboard, which are built with it.',
        ],
      },
    ],
  },
];

export function getUxCaseStudy(slug: string | undefined): UxCaseStudy | undefined {
  return UX_CASE_STUDIES.find((c) => c.slug === slug);
}
