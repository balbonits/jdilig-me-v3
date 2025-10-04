// Drawing #1: Protos Viewer - Nav + Sidebar + Main
import { useState, useContext } from 'react';
import { ProtoNav, ProtoBox, ProtoIcon, ProtoViewportContext } from '@components/proto';
import { DocumentTextIcon, Squares2X2Icon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export function ProtosPageProto() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('section-1');
  const viewport = useContext(ProtoViewportContext);
  const isMobile = viewport === 'mobile';

  const sidebarItems = [
    { id: 'section-1', label: 'Section 1', icon: DocumentTextIcon },
    { id: 'section-2', label: 'Section 2', icon: Squares2X2Icon },
    { id: 'section-3', label: 'Section 3', icon: Cog6ToothIcon },
  ];

  const sectionContent = {
    'section-1': 'Documentation Content',
    'section-2': 'Grid View Content',
    'section-3': 'Settings Content',
  };

  return (
    <div className="w-full">
      <ProtoNav
        items={['Home', 'Docs', 'Protos', 'Workflows', 'Style Guide']}
        position="top"
      />

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile: Horizontal collapsible sidebar (collapses left-right) */}
        {isMobile ? (
          <div className="relative flex border-b-2 border-gray-400">
            {/* Collapsed: Thin vertical strip with icon buttons */}
            <aside className={`bg-gray-100 flex flex-col gap-2 p-2 transition-all ${isSidebarExpanded ? 'w-48' : 'w-16'}`}>
              {/* Toggle button */}
              <button
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="p-2 bg-gray-200 rounded border-0 cursor-pointer hover:bg-gray-300 flex items-center justify-center"
              >
                <span className="text-xs">{isSidebarExpanded ? '◀' : '▶'}</span>
              </button>

              {/* Sidebar items */}
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

            {/* Main content area */}
            <div className="flex-1"></div>
          </div>
        ) : (
          /* Desktop: Vertical sidebar with icons + labels */
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
          label={sectionContent[activeSection as keyof typeof sectionContent]}
          className="flex-1 min-h-[400px] md:min-h-[600px]"
        />
      </div>
    </div>
  );
}
