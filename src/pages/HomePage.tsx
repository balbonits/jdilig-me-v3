import { HeroTemplate } from '../templates/HeroTemplate';

export function HomePage() {
  return (
    <HeroTemplate
      title="Welcome to Your Site"
      subtitle="A modern React application with PWA capabilities"
      ctaText="Get Started"
      ctaAction={() => console.log('CTA clicked')}
    />
  );
}