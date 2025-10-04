// Drawing #2: Docs Content - Nav + Sidebar + Markdown Content
import { useState, useContext } from 'react';
import { ProtoNav, ProtoBox, ProtoText, ProtoIcon, ProtoViewportContext } from '@components/proto';
import { BookOpenIcon, CodeBracketIcon, DocumentDuplicateIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export function DocsContentProto() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const viewport = useContext(ProtoViewportContext);
  const isMobile = viewport === 'mobile';

  const sidebarItems = [
    { id: 'intro', label: 'Intro', icon: BookOpenIcon },
    { id: 'api', label: 'API Reference', icon: CodeBracketIcon },
    { id: 'examples', label: 'Examples', icon: DocumentDuplicateIcon },
    { id: 'guide', label: 'Guide', icon: AcademicCapIcon },
  ];

  const contentVariations = {
    intro: { heading: '80%', paragraphLines: 5 },
    api: { heading: '70%', paragraphLines: 7 },
    examples: { heading: '75%', paragraphLines: 4 },
    guide: { heading: '85%', paragraphLines: 6 },
  };

  const currentContent = contentVariations[activeSection as keyof typeof contentVariations];

  return (
    <div className="w-full">
      <ProtoNav
        items={['Home', 'Docs', 'Protos', 'Workflows', 'Style Guide']}
        position="top"
      />

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile: Horizontal collapsible sidebar */}
        {isMobile ? (
          <div className="relative flex border-b-2 border-gray-400">
            <aside className={`bg-gray-100 flex flex-col gap-2 p-2 transition-all ${isSidebarExpanded ? 'w-48' : 'w-16'}`}>
              <button
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="p-2 bg-gray-200 rounded border-0 cursor-pointer hover:bg-gray-300 flex items-center justify-center"
              >
                <span className="text-xs">{isSidebarExpanded ? '◀' : '▶'}</span>
              </button>

              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 p-2 rounded border-0 cursor-pointer ${
                    activeSection === item.id ? 'bg-blue-200' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <ProtoIcon icon={item.icon} size="sm" />
                  {isSidebarExpanded && <span className="text-sm text-gray-600 whitespace-nowrap">{item.label}</span>}
                </button>
              ))}
            </aside>
          </div>
        ) : (
          /* Desktop: Vertical sidebar */
          <aside className="w-52 border-r-2 border-gray-400 bg-gray-100 p-4 flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded border-0 cursor-pointer ${
                  activeSection === item.id ? 'bg-blue-200' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <ProtoIcon icon={item.icon} size="sm" />
                <span>{item.label}</span>
              </button>
            ))}
          </aside>
        )}

        <ProtoBox
          label={`${sidebarItems.find(s => s.id === activeSection)?.label} Content`}
          className="flex-1 min-h-[500px] md:min-h-[700px]"
        >
          <div className="p-4 md:p-8 text-left w-full flex flex-col gap-4 md:gap-6">
            <ProtoText lines={1} variant="heading" width={currentContent.heading} />
            <ProtoText lines={currentContent.paragraphLines} variant="paragraph" />

            <ProtoText lines={1} variant="heading" width="70%" />
            <ProtoText lines={3} variant="paragraph" />
          </div>
        </ProtoBox>
      </div>
    </div>
  );
}
