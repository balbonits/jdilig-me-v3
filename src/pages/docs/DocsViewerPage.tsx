import { useParams } from 'react-router';
import styles from './DocsViewerPage.module.css';

/**
 * DocsViewerPage Component
 *
 * Displays documentation content based on the :documentation route parameter.
 *
 * TODO: Implement actual markdown loading and parsing
 */
export function DocsViewerPage() {
  const { documentation } = useParams<{ documentation: string }>();

  // Map of documentation slugs to titles
  const docTitles: Record<string, string> = {
    'proto-library': 'Proto Component Library',
    'getting-started': 'Getting Started Guide',
    'project-architecture': 'Project Architecture & Conventions',
    'development-workflow': 'Development Workflow & Best Practices',
    'api-reference': 'API Reference & Component Documentation',
  };

  const title = docTitles[documentation || ''] || 'Documentation';

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.prose}>
          <p className={styles.text}>
            This is a placeholder for the {title} documentation.
          </p>

          <h2 className={styles.heading}>Introduction</h2>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h2 className={styles.heading}>Overview</h2>
          <p className={styles.text}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <h2 className={styles.heading}>Details</h2>
          <p className={styles.text}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          <div className={styles.alert}>
            <p className={styles['alert-text']}>
              <strong>TODO:</strong> This page will be populated with actual markdown content loaded dynamically based on the route parameter.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
