import { Link } from 'react-router';
import styles from './UIShowcaseLandingPage.module.css';

/**
 * UIShowcaseLandingPage - Grid of all UI component showcases
 */
export function UIShowcaseLandingPage() {
  const showcases = [
    {
      id: 'buttons',
      title: 'Buttons',
      description: 'Button variants, sizes, button groups',
    },
    {
      id: 'forms',
      title: 'Forms',
      description: 'Badges, alerts, input groups',
    },
    {
      id: 'layout',
      title: 'Layout',
      description: 'Cards, sections, list groups',
    },
    {
      id: 'navigation',
      title: 'Navigation',
      description: 'Nav, navbar, pagination, dropdowns',
    },
    {
      id: 'overlays',
      title: 'Overlays',
      description: 'Modals and tooltips',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>UI Component Library</h1>
        <p className={styles.description}>
          Bootstrap-inspired React components built with TypeScript, Tailwind CSS v4, and modern best practices.
        </p>
      </div>

      <div className={styles.grid}>
        {showcases.map((showcase) => (
          <Link
            key={showcase.id}
            to={`/docs/ui/${showcase.id}`}
            className={styles['card-link']}
          >
            <h2 className={styles['card-title']}>{showcase.title}</h2>
            <p className={styles['card-description']}>{showcase.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
