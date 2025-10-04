import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { uiShowcases } from '@docs/ui';
import './index.css';

// Get component name from URL query parameter
const params = new URLSearchParams(window.location.search);
const componentName = params.get('component');

if (componentName && componentName in uiShowcases) {
  const ShowcaseComponent = uiShowcases[componentName as keyof typeof uiShowcases];

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ShowcaseComponent />
    </StrictMode>,
  );
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Showcase not found</h1>
        <p className="text-gray-600 mt-2">The component showcase does not exist.</p>
      </div>
    </StrictMode>,
  );
}
