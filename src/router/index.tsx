import { Route } from 'react-router';
import { HomePage, AboutPage } from '../App';

// Import docs pages (will be created)
import { DocsLandingPage } from '../pages/docs/DocsLandingPage';
import { WiresLandingPage } from '../pages/docs/WiresLandingPage';
import { WiresViewerPage } from '../pages/docs/WiresViewerPage';
import { DocsViewerPage } from '../pages/docs/DocsViewerPage';

// Route configuration
export function AppRoutes() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Docs routes */}
      <Route path="/docs" element={<DocsLandingPage />} />
      <Route path="/docs/wires" element={<WiresLandingPage />} />
      <Route path="/docs/wires/:wireframe" element={<WiresViewerPage />} />
      <Route path="/docs/:documentation" element={<DocsViewerPage />} />
    </>
  );
}
