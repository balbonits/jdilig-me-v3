// Drawing #3: Docs Home - TOC/Glossary Layout
import { WireNav, WireBox, WireText, WireViewport } from '../../src/components/wireframe';

export function HomeWireframe() {
  return (
    <WireViewport defaultView="desktop">
      <WireNav
        items={['Home', 'Docs', 'Wireframes', 'Workflows', 'Style Guide']}
        position="top"
      />

      <WireBox width="100%" height="600px" label="Table of Contents / Glossary">
        <div className="p-8 text-left w-full flex flex-col gap-4">
          <WireText lines={1} variant="heading" width="50%" />

          {/* Numbered list items (5 visible in drawing) */}
          <div className="flex flex-col gap-3 mt-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex gap-3 items-center">
                <span className="text-gray-500 font-mono text-sm w-6">{num}</span>
                <WireText lines={1} variant="paragraph" width={`${70 + (num * 3)}%`} />
              </div>
            ))}
          </div>
        </div>
      </WireBox>
    </WireViewport>
  );
}
