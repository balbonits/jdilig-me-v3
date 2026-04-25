import { PROFILE } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-border-faint py-8 text-center text-sm text-fg-subtle">
      <div className="mx-auto max-w-[1120px] px-10 font-mono">
        © {new Date().getFullYear()} {PROFILE.name} · Built with React, Vite,
        and Tailwind.
      </div>
    </footer>
  );
}
