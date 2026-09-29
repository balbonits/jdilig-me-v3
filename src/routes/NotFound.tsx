import { Link } from 'react-router';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PAGES } from '@/data/pages';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFound() {
  usePageMeta(PAGES.notFound);

  return (
    <Container
      size="narrow"
      className="flex min-h-[500px] items-center justify-center py-14"
    >
      <div className="text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3 mb-3.5 text-[44px] font-bold tracking-[-0.03em] text-fg-strong sm:text-[56px]">
          Nothing{' '}
          <span className="font-serif font-normal text-accent italic">
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
    </Container>
  );
}
