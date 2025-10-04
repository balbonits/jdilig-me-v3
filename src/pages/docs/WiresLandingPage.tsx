import { Link } from 'react-router';
import { WireBox } from '../../components/wireframe/WireBox/WireBox';
import { WireNav } from '../../components/wireframe/WireNav/WireNav';
import { WireText } from '../../components/wireframe/WireText/WireText';
import { wireframes } from '../../../docs/wires';

export function WiresLandingPage() {
  const wireframeEntries = Object.keys(wireframes);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <WireNav
        items={['Home', 'Docs', 'Wireframes', 'Workflows', 'Style Guide']}
        position="top"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <WireText lines={1} variant="heading" className="mb-8" />
        <h1 className="text-4xl font-bold mb-8 -mt-12">Available Wireframes</h1>

        {/* Wireframes List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wireframeEntries.map((wireframeName) => (
            <Link
              key={wireframeName}
              to={`/docs/wires/${wireframeName}`}
              className="block hover:opacity-75 transition-opacity"
            >
              <WireBox
                height="250px"
                label={wireframeName}
                variant="dashed"
                className="cursor-pointer hover:border-gray-400"
              >
                <div className="p-4 flex flex-col justify-center h-full">
                  <WireText lines={2} variant="heading" className="mb-4" />
                  <WireText lines={4} variant="paragraph" />
                </div>
              </WireBox>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
