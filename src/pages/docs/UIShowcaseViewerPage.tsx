import { useParams } from 'react-router';

/**
 * UIShowcaseViewerPage - Displays individual UI component showcases in an iframe
 */
export function UIShowcaseViewerPage() {
  const { component } = useParams();

  const validComponents = ['buttons', 'forms', 'layout', 'navigation', 'overlays'];

  if (!component || !validComponents.includes(component)) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Showcase not found</h1>
        <p className="text-gray-600 mt-2">The component showcase "{component}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <iframe
        src={`/showcase.html?component=${component}`}
        className="w-full h-full border-0"
        title={`${component} showcase`}
      />
    </div>
  );
}
