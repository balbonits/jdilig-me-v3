import { useParams } from 'react-router';
import styles from './UIShowcaseViewerPage.module.css';

/**
 * UIShowcaseViewerPage - Displays individual UI component showcases in an iframe
 */
export function UIShowcaseViewerPage() {
  const { component } = useParams();

  const validComponents = ['buttons', 'forms', 'layout', 'navigation', 'overlays'];

  if (!component || !validComponents.includes(component)) {
    return (
      <div className={styles['error-wrapper']}>
        <h1 className={styles['error-title']}>Showcase not found</h1>
        <p className={styles['error-text']}>The component showcase "{component}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className={styles['iframe-container']}>
      <iframe
        src={`/showcase.html?component=${component}`}
        className={styles.iframe}
        title={`${component} showcase`}
      />
    </div>
  );
}
