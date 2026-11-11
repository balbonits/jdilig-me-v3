// UX case studies. Copy from Chief of Creatives (DS-CASE-COPY.md v1.0); facts match the shipped repo.

export type UxSection = { title: string; paragraphs?: string[]; bullets?: string[] };

export type UxCaseStudy = {
  slug: string;
  /** Page path when it isn't /ux/<slug>, e.g. when the prototype itself lives at /ux/<slug>/. */
  path?: string;
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
      demo: { label: 'View the Storybook', href: '/ux/design-system/storybook/' },
      source: 'https://github.com/balbonits/a11y-design-system',
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
          'Keep growing it with the projects built on it. The job tracker is live, and the dev dashboard is next.',
        ],
      },
    ],
  },
  {
    slug: 'job-tracker',
    path: '/ux/job-tracker/case-study',
    name: 'Job tracker',
    title: 'Job tracker: a calm way to run a job search',
    blurb:
      'A job application tracker prototype: a stage board, follow-up reminders and notes, built on Ember UI and usable by keyboard on any screen.',
    lede:
      'I designed and built a clickable job application tracker. It starts from two assumed job seekers and a journey map and ends as a working prototype on my own design system. It runs in the browser with fictional data.',
    links: {
      demo: { label: 'Open the prototype', href: '/ux/job-tracker/' },
      source: 'https://github.com/balbonits/job-app-tracker',
    },
    images: [
      { src: '/ux/job-tracker-board-desktop.png', alt: 'The job tracker board on desktop: five columns, Saved, Applied, Interviewing, Offer and Closed, with role cards showing company, title, time in stage and the next reminder.', width: 1280, height: 800 },
      { src: '/ux/job-tracker-board-mobile-dark.png', alt: 'The same board on a phone in dark mode, with the stages as tabs and the Applied tab open.', width: 390, height: 844 },
    ],
    sections: [
      {
        title: 'Problem',
        paragraphs: [
          "A real job search means dozens of roles at different stages, each with its own follow-up date. Most people track it in a spreadsheet that goes stale or in an inbox where things get buried, so follow-ups slip. I wanted a tracker that shows where every application stands at a glance and tells you what's due without nagging.",
        ],
      },
      {
        title: "Who it's for",
        bullets: [
          'Assumption: Maya, an active applicant. She is a mid-level front-end developer applying to 10 to 20 roles a week from a laptop, and she needs every stage visible and no missed follow-ups.',
          "Assumption: Dev, a casual looker. He checks roles on his phone at lunch a few times a month, and he needs to save a role in seconds and remember later why he liked it.",
          "These personas come from common job-search patterns, not interviews. That's why each one is labeled an assumption.",
        ],
      },
      {
        title: 'Approach',
        bullets: [
          'Journey first. Maya goes from find, save, apply and wait to follow up, interview and an offer or rejection. Waiting and following up are the anxious steps, so reminders are tied to stage changes.',
          'Fast capture. Add role needs only a company and a title. Everything else is optional.',
          'No drag-only moves. Every card has a Move or edit button with a stage menu, so changing a stage works the same by mouse, touch, keyboard or screen reader.',
          'Mobile-first. Stages are tabs on a phone and columns on a wide screen. Every control is at least 44 pixels.',
          'Built on Ember UI. When the tracker needed something the design system lacked, like an Undo button in a toast, I added it to Ember UI instead of building a one-off.',
        ],
      },
      {
        title: 'Journey map and IA',
        paragraphs: [
          "The prototype answers the journey's opportunities directly. Moving a role to Applied adds a follow-up a week out, Interviewing adds a thank-you note for the next day, and Offer adds a reply-by reminder. Reminders shows \"Nothing due. You're caught up.\" when the list is empty.",
          'Five places: the Board (home), Role detail with Overview, Notes and Timeline tabs, an Add role dialog, Reminders grouped Overdue, Today, This week and Later, and Settings for export, demo reset and state previews.',
        ],
      },
      {
        title: 'Wireframes and states',
        paragraphs: [
          'I sketched low-fidelity frames for the Board, Role detail, Add role and Reminders before writing any app code, then built every screen with its empty, loading and error states. The error state is a "Can\'t save" alert with an Export button, so nobody loses their data if browser storage is blocked. You can preview each state from Settings.',
        ],
      },
      {
        title: 'Accessibility',
        bullets: [
          'Every function works by keyboard. A skip link is the first Tab stop.',
          'Changing views acts like changing pages. The title updates, focus moves to the new heading, and Back returns you to where you were scrolled.',
          'Dialogs keep focus inside, close on Escape and return focus to the button that opened them. Testing caught a case where that broke, and the fix went into Ember UI.',
          'Saved notes, toasts and errors are announced through live regions. Form errors are tied to their fields.',
          'An automated check runs axe on 17 screens and states at five widths, from 320 to 1280 pixels, in light and dark mode. It also fails on sideways scrolling or any control under 44 pixels. It passes with zero serious or critical issues, and it runs in CI on every push.',
          'The repo includes a self-assessed Section 508 Accessibility Conformance Report. A screen-reader pass is still to come, and the report says so.',
        ],
      },
      {
        title: 'Result',
        paragraphs: [
          'The prototype is live at [/ux/job-tracker/](/ux/job-tracker/). The code, the dated progress log, the wireframes and milestone screenshots are public on [GitHub](https://github.com/balbonits/job-app-tracker).',
          'Its self-assessed [accessibility conformance report](https://github.com/balbonits/job-app-tracker/blob/main/docs/ACR.md) (VPAT 2.5, Section 508 edition) lists what passes and what is still open. The site-wide [accessibility statement](/accessibility) covers the standards and known limitations.',
        ],
      },
      {
        title: "What I'd do next",
        bullets: [
          'Run a screen-reader pass and add the results to the conformance report.',
          'Add the switchable Ember UI themes once they land in the design system.',
          'Test it with real job seekers to replace the assumed personas.',
          'Add the optional fields the IA lists that the prototype skips, like salary range and contacts.',
        ],
      },
    ],
  },
];

/** The case study page's path: /ux/<slug> unless the study sets its own. */
export function uxPath(c: Pick<UxCaseStudy, 'slug' | 'path'>): string {
  return c.path ?? `/ux/${c.slug}`;
}

export function getUxCaseStudy(slug: string | undefined): UxCaseStudy | undefined {
  return UX_CASE_STUDIES.find((c) => c.slug === slug);
}
