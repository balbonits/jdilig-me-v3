// Drawing #2: Docs Content - Nav + Sidebar + Markdown Content
import { WireNav, WireSidebar, WireBox, WireText, WireViewport } from '../../src/components/wireframe';

export function DocsContentWireframe() {
  return (
    <WireViewport defaultView="desktop">
      <WireNav
        items={['Home', 'Docs', 'Wireframes', 'Workflows', 'Style Guide']}
        position="top"
      />

      <div className="flex min-h-screen">
        <WireSidebar
          items={['Intro', 'API Reference', 'Examples', 'Guide']}
          position="left"
          width="200px"
        />

        <WireBox
          width="100%"
          height="700px"
          label="Markdown Content Area"
        >
          <div className="p-8 text-left w-full flex flex-col gap-6">
            {/* Simulate markdown content with headings and paragraphs */}
            <WireText lines={1} variant="heading" width="60%" />
            <WireText lines={5} variant="paragraph" />

            <WireText lines={1} variant="heading" width="50%" />
            <WireText lines={4} variant="paragraph" />

            <WireText lines={1} variant="heading" width="55%" />
            <WireText lines={3} variant="paragraph" />
          </div>
        </WireBox>
      </div>
    </WireViewport>
  );
}
