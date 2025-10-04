import { useParams } from 'react-router';
import { wireframes } from '../../../docs/wires';

export function WiresViewerPage() {
  const { wireframe } = useParams();

  const WireComponent = wireframes[wireframe as keyof typeof wireframes];

  if (!WireComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Wireframe not found</h1>
          <p className="text-gray-600">The wireframe "{wireframe}" does not exist.</p>
        </div>
      </div>
    );
  }

  return <WireComponent />;
}
