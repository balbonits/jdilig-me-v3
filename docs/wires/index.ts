// Wireframe exports
export { HomeWireframe } from './home';
export { WireframesPageWireframe } from './wireframes-page';
export { DocsContentWireframe } from './docs-content';

// Wireframe registry for dynamic loading
export const wireframes = {
  home: HomeWireframe,
  'wireframes-page': WireframesPageWireframe,
  'docs-content': DocsContentWireframe,
};
