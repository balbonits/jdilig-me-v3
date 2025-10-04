import { Route } from 'react-router';
import { HomePage, AboutPage } from '../App';

// Import docs pages
import { DocsLayout } from '@pages/docs/DocsLayout';
import { DocsLandingPage } from '@pages/docs/DocsLandingPage';
import { ProtosLandingPage } from '@pages/docs/ProtosLandingPage';
import { ProtosViewerPage } from '@pages/docs/ProtosViewerPage';
import { DocsViewerPage } from '@pages/docs/DocsViewerPage';
import { UIShowcaseLandingPage } from '@pages/docs/UIShowcaseLandingPage';
import { UIShowcaseViewerPage } from '@pages/docs/UIShowcaseViewerPage';

// Route configuration - returns array of Route elements for use inside <Routes>
export const AppRoutes = () => [
  <Route key="home" path="/" element={<HomePage />} />,
  <Route key="about" path="/about" element={<AboutPage />} />,

  // Docs routes - nested under DocsLayout for SPA navigation
  <Route key="docs-layout" path="/docs" element={<DocsLayout />}>
    <Route key="docs-home" index element={<DocsLandingPage />} />
    <Route key="protos-landing" path="protos" element={<ProtosLandingPage />} />
    <Route key="proto-viewer" path="protos/:proto" element={<ProtosViewerPage />} />
    <Route key="ui-landing" path="ui" element={<UIShowcaseLandingPage />} />
    <Route key="ui-showcase" path="ui/:component" element={<UIShowcaseViewerPage />} />
    <Route key="doc-viewer" path=":documentation" element={<DocsViewerPage />} />
  </Route>,
];
