import { Link, NavLink } from 'react-router';
import { getNavItems } from '@/router';
import { PROFILE } from '@/data/profile';
import { useTheme } from '@/hooks/useTheme';
import { Icon } from '@/components/icons';

export default function Header() {
  // Projects, UX, Resume, Contact, from the route table (UX added 2026-11-10 with John's OK).
  // Renaming or removing a section needs John's OK.
  const items = getNavItems();
  const [theme, toggle] = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header className="border-b border-border-DEFAULT bg-bg">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-1.5 px-3 py-4 sm:gap-3 sm:px-10"
      >
        <Link
          to="/"
          className="relative flex min-h-11 shrink-0 items-center gap-2.5 font-mono before:absolute before:inset-y-0 before:-inset-x-2 before:content-[''] sm:before:hidden text-[17px] font-semibold tracking-[-0.03em] text-fg-strong no-underline"
        >
          <img
            src="/logo.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full ring-1 ring-border-DEFAULT"
          />
          {/* Too wide for small phones — kept for screen readers there. */}
          <span className="max-sm:sr-only">
            jdilig<span className="text-accent">.</span>me
          </span>
        </Link>

        <div className="flex items-center sm:gap-1">
          {items.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `inline-flex min-h-11 min-w-11 items-center justify-center rounded-[2px] px-[3px] text-[13px] font-medium no-underline transition-all duration-[120ms] ease-out sm:px-3 sm:text-sm ${
                  isActive
                    ? 'bg-bg-muted text-fg-strong underline decoration-accent decoration-2 underline-offset-[6px]'
                    : 'text-fg-muted hover:bg-bg-muted hover:text-fg-strong'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1">
        <a
          href={PROFILE.resumePdf}
          download
          className="hidden min-h-11 items-center gap-1.5 rounded-[2px] px-3 text-sm font-medium text-fg-muted no-underline transition-colors hover:bg-bg-muted hover:text-fg-strong md:inline-flex"
        >
          <Icon.Download className="h-4 w-4" aria-hidden="true" />
          Resume PDF
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${nextTheme} theme`}
          className="theme-toggle relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[2px] border border-border-DEFAULT bg-surface text-fg-muted transition-all duration-[120ms] ease-out hover:border-border-strong hover:text-fg-strong"
        >
          {/* Both icons stay mounted so the swap can rotate and cross-fade. */}
          <Icon.Moon aria-hidden="true" data-on={theme === 'light'} className="theme-icon absolute h-4 w-4" />
          <Icon.Sun aria-hidden="true" data-on={theme === 'dark'} className="theme-icon absolute h-4 w-4" />
        </button>
        </div>
      </nav>
    </header>
  );
}
