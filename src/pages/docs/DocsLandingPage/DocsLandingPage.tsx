import { Link } from 'react-router';
import styles from './DocsLandingPage.module.css';

export function DocsLandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Documentation</h1>
        <p className={styles.subtitle}>Table of Contents / Glossary</p>

        {/* TOC Items */}
        <div className={styles.toc}>
          <div className={styles['toc-item']}>
            <span className={styles['toc-number']}>1</span>
            <Link to="/docs/proto-library" className={styles['toc-link']}>
              Proto Component Library
            </Link>
          </div>

          <div className={styles['toc-item']}>
            <span className={styles['toc-number']}>2</span>
            <Link to="/docs/getting-started" className={styles['toc-link']}>
              Getting Started Guide
            </Link>
          </div>

          <div className={styles['toc-item']}>
            <span className={styles['toc-number']}>3</span>
            <Link to="/docs/project-architecture" className={styles['toc-link']}>
              Project Architecture & Conventions
            </Link>
          </div>

          <div className={styles['toc-item']}>
            <span className={styles['toc-number']}>4</span>
            <Link to="/docs/development-workflow" className={styles['toc-link']}>
              Development Workflow & Best Practices
            </Link>
          </div>

          <div className={styles['toc-item']}>
            <span className={styles['toc-number']}>5</span>
            <Link to="/docs/api-reference" className={styles['toc-link']}>
              API Reference & Component Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
