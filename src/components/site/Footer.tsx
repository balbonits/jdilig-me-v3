import { PROFILE } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-border-faint py-8 text-center text-sm text-fg-subtle">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-1.5 px-10 font-mono">
        <div>
          © {new Date().getFullYear()} {PROFILE.name} · Built with React, Vite,
          and Tailwind.
        </div>
        <div className="text-fg-faint">
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
