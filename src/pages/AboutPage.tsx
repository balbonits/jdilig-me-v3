import { PageTemplate } from '../templates/PageTemplate';

export function AboutPage() {
  return (
    <PageTemplate
      title="About Us"
      subtitle="Learn more about our mission and values"
    >
      <div className="prose max-w-none">
        <p>This is a modern web application built with React, TypeScript, and Vite.</p>
        <p>Features include:</p>
        <ul>
          <li>Progressive Web App capabilities</li>
          <li>Component-based architecture</li>
          <li>TypeScript for type safety</li>
          <li>Tailwind CSS for styling</li>
          <li>Comprehensive testing setup</li>
        </ul>
      </div>
    </PageTemplate>
  );
}