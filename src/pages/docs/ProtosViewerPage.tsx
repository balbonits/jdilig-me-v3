import { useParams, Link } from 'react-router';
import { protos } from '@docs/protos';
import { ProtoViewer } from '@components/proto';

export function ProtosViewerPage() {
  const { proto } = useParams();

  const WireComponent = protos[proto as keyof typeof protos];

  if (!WireComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Proto not found</h1>
          <p className="text-gray-600 mb-4">The proto "{proto}" does not exist.</p>
          <Link to="/docs/protos" className="text-blue-600 hover:text-blue-800 underline">
            Back to Protos
          </Link>
        </div>
      </div>
    );
  }

  const protoName = proto?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Proto';

  return (
    <div className="p-8">
      <ProtoViewer proto={WireComponent} title={protoName} />
    </div>
  );
}
