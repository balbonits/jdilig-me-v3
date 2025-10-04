import { useParams } from 'react-router';
import { DocsContentWireframe } from '../../../docs/wires/docs-content';

/**
 * DocsViewerPage Component
 *
 * Displays documentation content based on the :documentation route parameter.
 *
 * TODO: Implement dynamic markdown loading based on documentation parameter
 * For now, renders the DocsContentWireframe as a placeholder.
 */
export function DocsViewerPage() {
  const { documentation } = useParams<{ documentation: string }>();

  // TODO: Load and parse markdown file based on documentation param
  // Example: fetch(`/docs/${documentation}.md`) and render parsed content

  return <DocsContentWireframe />;
}
