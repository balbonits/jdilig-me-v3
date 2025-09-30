import { PageTemplate } from '../templates/PageTemplate';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <PageTemplate
      title="404"
      subtitle="Page not found"
      variant="centered"
    >
      <div className="mt-8">
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Button onClick={() => window.location.href = '/'}>
          Go Home
        </Button>
      </div>
    </PageTemplate>
  );
}