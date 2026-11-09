import { GitHubIcon, LinkedInIcon, Icon } from '@/components/icons';
import { PROFILE } from '@/data/profile';

const footLink =
  'inline-flex min-h-11 items-center gap-1.5 px-2 text-fg-muted no-underline hover:text-fg-strong hover:underline';

export default function Footer() {
  return (
    <footer className="border-t border-border-faint py-8 text-center text-sm text-fg-subtle">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-1.5 px-5 font-mono sm:px-10">
        <ul className="mb-2 flex flex-wrap items-center justify-center gap-x-2 font-sans text-[15px]">
          <li>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={footLink}>
              <LinkedInIcon className="h-4 w-4" aria-hidden="true" /> LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
          <li>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className={footLink}>
              <GitHubIcon className="h-4 w-4" aria-hidden="true" /> GitHub
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${PROFILE.email}`} className={footLink}>
              <Icon.Mail className="h-4 w-4" aria-hidden="true" /> {PROFILE.email}
            </a>
          </li>
        </ul>
        <div>
          © {new Date().getFullYear()} {PROFILE.name} · Built with React, Vite,
          and Tailwind.
        </div>
        <div>
          Sub-site:{' '}
          <a
            href="https://games.jdilig.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            games.jdilig.me
          </a>
        </div>
      </div>
    </footer>
  );
}
