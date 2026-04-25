import { Link } from 'react-router';
import Eyebrow from '@/components/ui/Eyebrow';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[500px] w-full max-w-[720px] items-center justify-center px-10 py-14">
      <div className="text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3 mb-3.5 text-[56px] font-bold tracking-[-0.03em] text-fg-strong">
          Nothing{' '}
          <span className="font-serif text-accent italic font-normal">
            here
          </span>
          .
        </h1>
        <p className="mb-6 text-[16px] text-fg-muted">
          That page doesn't exist. Maybe it never did.
        </p>
        <Link to="/" className="text-accent no-underline hover:underline">
          ← Go home
        </Link>
      </div>
    </div>
  );
}
