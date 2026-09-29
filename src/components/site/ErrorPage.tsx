import { Button, LinkButton } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { PAGES } from '@/data/pages';
import { usePageMeta } from '@/hooks/usePageMeta';

/** Shown in place of a page that threw while rendering (see ErrorBoundary). */
export default function ErrorPage() {
  usePageMeta(PAGES.error);

  return (
    <Container
      size="narrow"
      className="flex min-h-[500px] items-center justify-center py-14"
    >
      <div role="alert" className="text-center">
        <Eyebrow>Error</Eyebrow>
        <h1 className="mt-3 mb-3.5 text-[44px] font-bold tracking-[-0.03em] text-fg-strong sm:text-[56px]">
          Something{' '}
          <span className="font-serif font-normal text-accent italic">
            broke
          </span>
          .
        </h1>
        <p className="mb-6 text-[16px] text-fg-muted">
          This page hit an error. Reloading usually fixes it.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Button size="lg" onClick={() => window.location.reload()}>
            Reload
          </Button>
          <LinkButton to="/" variant="secondary" size="lg">
            Go home
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
