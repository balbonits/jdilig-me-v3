import { test } from '@playwright/test';
import path from 'node:path';
import { PROFILE } from '../src/data/profile';
import { EDUCATION, EXPERIENCE, SKILLS, SUMMARY } from '../src/data/resume';
import { displayUrl } from '../src/lib/url';

// Renders public/Reuel_John_Dilig_Resume.pdf from the same data as /resume,
// so the page and the download can't drift apart. Run: `npm run resume:pdf`.

const OUT = path.join(process.cwd(), 'public', PROFILE.resumePdf);

const ACCENT = '#c2410c'; // orange-700 — the site accent, dark enough for print

const CSS = `
@page { size: Letter; margin: 0.5in 0.6in 0.55in; }
* { box-sizing: border-box; }
body {
  margin: 0;
  /* System fonts: identical output on any machine, no network needed. */
  font-family: "Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif;
  font-size: 9.4pt;
  line-height: 1.38;
  color: #1c1917;
}
a { color: inherit; text-decoration: none; }
p { margin: 0; }
.top { padding-bottom: 7pt; border-bottom: 1.5pt solid #0c0a09; }
.top h1 {
  margin: 0;
  font-size: 22pt;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #0c0a09;
}
.top .title { margin-top: 2pt; font-size: 11pt; font-weight: 500; color: ${ACCENT}; }
.top .contact { margin-top: 3pt; font-size: 8.8pt; color: #57534e; }
h2 {
  margin: 11pt 0 5pt;
  padding-bottom: 2.5pt;
  border-bottom: 0.75pt solid #e7e5e4;
  font-size: 8.8pt;
  font-weight: 600;
  /* Keep tracking modest: wide letter-spacing breaks ATS text extraction. */
  letter-spacing: 0.06em;
  color: ${ACCENT};
  break-after: avoid;
}
.skill { margin: 1.5pt 0; }
.skill b { font-weight: 600; color: #0c0a09; }
.entry { margin-bottom: 7.5pt; }
.entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
/* Let long jobs flow across pages, but never strand a job title. */
.entry-head, .where { break-after: avoid; }
.entry-head b { font-size: 10pt; font-weight: 600; color: #0c0a09; }
.sep { margin: 0 3pt; color: #a8a29e; }
.when { flex-shrink: 0; white-space: nowrap; font-size: 8.8pt; font-weight: 500; color: #57534e; }
.where { margin-top: 0.5pt; font-size: 8.8pt; font-style: italic; color: #78716c; }
ul { margin: 2.5pt 0 0; padding-left: 12pt; }
li { margin: 1.2pt 0; break-inside: avoid; }
li::marker { color: #a8a29e; }
.entry-link { margin-top: 2.5pt; font-size: 8.8pt; color: ${ACCENT}; }
`;

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function link(href: string, label = displayUrl(href)): string {
  return `<a href="${esc(href)}">${esc(label)}</a>`;
}

function renderResume(): string {
  const contact = [
    esc(PROFILE.location),
    link(`mailto:${PROFILE.email}`, PROFILE.email),
    esc(PROFILE.phone),
  ].join(' · ');
  const profiles = [PROFILE.website, PROFILE.linkedin, PROFILE.github]
    .map((href) => link(href))
    .join(' · ');

  const skills = SKILLS.map(
    (s) =>
      `<div class="skill"><b>${esc(s.label)}:</b> ${s.items.map(esc).join(', ')}</div>`,
  ).join('');

  const jobs = EXPERIENCE.map(
    (job) => `
      <article class="entry">
        <div class="entry-head">
          <div><b>${esc(job.role)}</b><span class="sep">|</span><b>${esc(job.company)}</b></div>
          <div class="when">${esc(job.when)}</div>
        </div>
        <div class="where">${esc(job.location)}</div>
        <ul>${job.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
        ${job.link ? `<div class="entry-link">${link(job.link.href, job.link.label)}</div>` : ''}
      </article>`,
  ).join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${esc(PROFILE.fullName)} — Resume</title>
  <style>${CSS}</style>
</head>
<body>
  <header class="top">
    <h1>${esc(PROFILE.fullName)}</h1>
    <div class="title">${esc(PROFILE.role)}</div>
    <div class="contact">${contact}</div>
    <div class="contact">${profiles}</div>
  </header>
  <section><h2>SUMMARY</h2><p>${esc(SUMMARY)}</p></section>
  <section><h2>TECHNICAL SKILLS</h2>${skills}</section>
  <section><h2>EXPERIENCE</h2>${jobs}</section>
  <section>
    <h2>EDUCATION</h2>
    <article class="entry">
      <div class="entry-head">
        <div><b>${esc(EDUCATION.degree)}</b><span class="sep">|</span>${esc(EDUCATION.school)}, ${esc(EDUCATION.location)}</div>
        <div class="when">${esc(EDUCATION.when)}</div>
      </div>
    </article>
  </section>
</body>
</html>`;
}

test('render resume PDF', async ({ page }) => {
  await page.setContent(renderResume());
  await page.pdf({
    path: OUT,
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  });
});
