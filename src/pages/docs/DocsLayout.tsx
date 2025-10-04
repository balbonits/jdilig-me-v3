import { Link, Outlet, useLocation, useParams } from 'react-router';

/**
 * DocsLayout - Shared layout for the entire docs subsite
 * Provides persistent navigation and dynamic sidebar that only updates content area on route changes
 */
export function DocsLayout() {
  const location = useLocation();
  const { proto, documentation, component } = useParams();

  const isProtosSection = location.pathname.startsWith('/docs/protos');
  const isUISection = location.pathname.startsWith('/docs/ui');
  const isDocsHome = location.pathname === '/docs';
  const isProtosHome = location.pathname === '/docs/protos';
  const isUIHome = location.pathname === '/docs/ui';
  const showSidebar = !isDocsHome && !isProtosHome && !isUIHome;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Persistent across all docs pages */}
      <nav className="w-full border-b-2 border-gray-300 bg-white px-6 py-4">
        <div className="flex gap-6">
          <Link
            to="/"
            className="px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Home
          </Link>
          <Link
            to="/docs"
            className={`px-4 py-2 text-base font-medium rounded transition-colors ${
              !isProtosSection && !isUISection
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Docs
          </Link>
          <Link
            to="/docs/protos"
            className={`px-4 py-2 text-base font-medium rounded transition-colors ${
              isProtosSection
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Protos
          </Link>
          <Link
            to="/docs/ui"
            className={`px-4 py-2 text-base font-medium rounded transition-colors ${
              isUISection
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            UI Components
          </Link>
          <span className="px-4 py-2 text-base font-medium text-gray-400 bg-gray-100 rounded cursor-not-allowed">
            Workflows
          </span>
          <span className="px-4 py-2 text-base font-medium text-gray-400 bg-gray-100 rounded cursor-not-allowed">
            Style Guide
          </span>
        </div>
      </nav>

      {/* Conditional Layout: Show sidebar for individual docs/protos, not for landing pages */}
      {showSidebar && (
        <div className="flex min-h-screen">
          {/* Sidebar - Dynamic based on section */}
          <aside className="w-52 border-r-2 border-gray-300 bg-white p-4">
            <div className="flex flex-col gap-2">
              {isProtosSection ? (
                // Protos Sidebar
                <>
                  <Link
                    to="/docs/protos"
                    className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    ← All Protos
                  </Link>
                  <div className="border-t border-gray-300 my-2"></div>
                  <Link
                    to="/docs/protos/docs-home"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      proto === 'docs-home'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Docs Home
                  </Link>
                  <Link
                    to="/docs/protos/protos-page"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      proto === 'protos-page'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Protos Page
                  </Link>
                  <Link
                    to="/docs/protos/docs-content"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      proto === 'docs-content'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Docs Content
                  </Link>
                </>
              ) : isUISection ? (
                // UI Components Sidebar
                <>
                  <Link
                    to="/docs/ui"
                    className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    ← All Components
                  </Link>
                  <div className="border-t border-gray-300 my-2"></div>
                  <Link
                    to="/docs/ui/buttons"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      component === 'buttons'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Buttons
                  </Link>
                  <Link
                    to="/docs/ui/forms"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      component === 'forms'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Forms
                  </Link>
                  <Link
                    to="/docs/ui/layout"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      component === 'layout'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Layout
                  </Link>
                  <Link
                    to="/docs/ui/navigation"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      component === 'navigation'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Navigation
                  </Link>
                  <Link
                    to="/docs/ui/overlays"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      component === 'overlays'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Overlays
                  </Link>
                </>
              ) : (
                // Documentation Sidebar
                <>
                  <Link
                    to="/docs/proto-library"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      documentation === 'proto-library'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Proto Library
                  </Link>
                  <Link
                    to="/docs/getting-started"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      documentation === 'getting-started'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Getting Started
                  </Link>
                  <Link
                    to="/docs/project-architecture"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      documentation === 'project-architecture'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Architecture
                  </Link>
                  <Link
                    to="/docs/development-workflow"
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      documentation === 'development-workflow'
                        ? 'font-medium text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Workflow
                  </Link>
                </>
              )}
            </div>
          </aside>

          {/* Main Content Area - Only this updates on navigation */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      )}

      {/* Landing pages (no sidebar) */}
      {!showSidebar && (
        <main className="w-full">
          <Outlet />
        </main>
      )}
    </div>
  );
}
