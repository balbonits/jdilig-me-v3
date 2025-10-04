// Drawing #1: Wireframes Viewer - Nav + Sidebar + Main + Viewport Buttons
import { WireNav, WireSidebar, WireBox, WireButton, WireViewport } from '../../src/components/wireframe';

export function WireframesPageWireframe() {
  return (
    <WireViewport defaultView="desktop">
      <WireNav
        items={['Home', 'Docs', 'Wireframes', 'Workflows', 'Style Guide']}
        position="top"
      />

      <div className="flex min-h-screen">
        <WireSidebar
          items={['Section 1', 'Section 2', 'Section 3']}
          position="left"
          width="200px"
        />

        <WireBox
          width="100%"
          height="600px"
          label="Wireframe Display Area"
          className="relative"
        >
          {/* Viewport buttons in bottom-right corner (from drawing) */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <WireButton label="Mobile" size="sm" variant="outline" />
            <WireButton label="Tablet" size="sm" variant="outline" />
            <WireButton label="Desktop" size="sm" variant="primary" />
          </div>
        </WireBox>
      </div>
    </WireViewport>
  );
}
