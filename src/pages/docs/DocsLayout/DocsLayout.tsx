import { Link, Outlet, useLocation, useParams } from 'react-router';
import styles from './DocsLayout.module.css';

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
    <div className={styles.layout}>
      {/* Top Navigation - Persistent across all docs pages */}
      <nav className={styles['top-nav']}>
        <div className={styles['nav-list']}>
          <Link to="/" className={styles['nav-link']}>
            Home
          </Link>
          <Link
            to="/docs"
            className={`${styles['nav-link']} ${!isProtosSection && !isUISection ? styles['nav-link--active'] : ''}`}
          >
            Docs
          </Link>
          <Link
            to="/docs/protos"
            className={`${styles['nav-link']} ${isProtosSection ? styles['nav-link--active'] : ''}`}
          >
            Protos
          </Link>
          <Link
            to="/docs/ui"
            className={`${styles['nav-link']} ${isUISection ? styles['nav-link--active'] : ''}`}
          >
            UI Components
          </Link>
          <span className={`${styles['nav-link']} ${styles['nav-link--disabled']}`}>
            Workflows
          </span>
          <span className={`${styles['nav-link']} ${styles['nav-link--disabled']}`}>
            Style Guide
          </span>
        </div>
      </nav>

      {/* Conditional Layout: Show sidebar for individual docs/protos, not for landing pages */}
      {showSidebar && (
        <div className={styles['content-wrapper']}>
          {/* Sidebar - Dynamic based on section */}
          <aside className={styles.sidebar}>
            <div className={styles['sidebar-nav']}>
              {isProtosSection ? (
                // Protos Sidebar
                <>
                  <Link to="/docs/protos" className={styles['sidebar-back']}>
                    ← All Protos
                  </Link>
                  <div className={styles['sidebar-divider']}></div>
                  <Link
                    to="/docs/protos/docs-home"
                    className={`${styles['sidebar-link']} ${proto === 'docs-home' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Docs Home
                  </Link>
                  <Link
                    to="/docs/protos/protos-page"
                    className={`${styles['sidebar-link']} ${proto === 'protos-page' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Protos Page
                  </Link>
                  <Link
                    to="/docs/protos/docs-content"
                    className={`${styles['sidebar-link']} ${proto === 'docs-content' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Docs Content
                  </Link>
                </>
              ) : isUISection ? (
                // UI Components Sidebar
                <>
                  <Link to="/docs/ui" className={styles['sidebar-back']}>
                    ← All Components
                  </Link>
                  <div className={styles['sidebar-divider']}></div>
                  <Link
                    to="/docs/ui/buttons"
                    className={`${styles['sidebar-link']} ${component === 'buttons' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Buttons
                  </Link>
                  <Link
                    to="/docs/ui/forms"
                    className={`${styles['sidebar-link']} ${component === 'forms' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Forms
                  </Link>
                  <Link
                    to="/docs/ui/layout"
                    className={`${styles['sidebar-link']} ${component === 'layout' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Layout
                  </Link>
                  <Link
                    to="/docs/ui/navigation"
                    className={`${styles['sidebar-link']} ${component === 'navigation' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Navigation
                  </Link>
                  <Link
                    to="/docs/ui/overlays"
                    className={`${styles['sidebar-link']} ${component === 'overlays' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Overlays
                  </Link>
                </>
              ) : (
                // Documentation Sidebar
                <>
                  <Link
                    to="/docs/proto-library"
                    className={`${styles['sidebar-link']} ${documentation === 'proto-library' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Proto Library
                  </Link>
                  <Link
                    to="/docs/getting-started"
                    className={`${styles['sidebar-link']} ${documentation === 'getting-started' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Getting Started
                  </Link>
                  <Link
                    to="/docs/project-architecture"
                    className={`${styles['sidebar-link']} ${documentation === 'project-architecture' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Architecture
                  </Link>
                  <Link
                    to="/docs/development-workflow"
                    className={`${styles['sidebar-link']} ${documentation === 'development-workflow' ? styles['sidebar-link--active'] : ''}`}
                  >
                    Workflow
                  </Link>
                </>
              )}
            </div>
          </aside>

          {/* Main Content Area - Only this updates on navigation */}
          <main className={styles['main-content']}>
            <Outlet />
          </main>
        </div>
      )}

      {/* Landing pages (no sidebar) */}
      {!showSidebar && (
        <main className={styles['main-content--full']}>
          <Outlet />
        </main>
      )}
    </div>
  );
}
