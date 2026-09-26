import { Link, NavLink } from 'react-router';
import { getNavItems } from '@/router';
import { useTheme } from '@/hooks/useTheme';
import { Icon } from '@/components/icons';

export default function Header() {
  const items = getNavItems();
  const [theme, toggle] = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header className="sticky top-0 z-10 border-b border-border-faint bg-bg/80 backdrop-blur-[10px] backdrop-saturate-[1.8]">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-4 sm:px-10">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 font-mono text-[17px] font-semibold tracking-[-0.03em] text-fg-strong no-underline"
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

        <div className="flex items-center gap-0.5 sm:gap-1">
          {items.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `rounded-md px-2.5 py-[7px] text-sm font-medium no-underline transition-all duration-[120ms] ease-out sm:px-3 ${
                  isActive
                    ? 'bg-bg-muted text-fg-strong'
                    : 'text-fg-muted hover:bg-bg-muted hover:text-fg-strong'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${nextTheme} theme`}
          className="flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-md border border-border-DEFAULT bg-surface text-fg-muted transition-all duration-[120ms] ease-out hover:border-border-strong hover:text-fg-strong"
        >
          {theme === 'light' ? (
            <Icon.Moon className="h-4 w-4" />
          ) : (
            <Icon.Sun className="h-4 w-4" />
          )}
        </button>
      </nav>
    </header>
  );
}
