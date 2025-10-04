import { Link } from 'react-router';
import { protos } from '@docs/protos';
import styles from './ProtosLandingPage.module.css';

export function ProtosLandingPage() {
  const protoEntries = Object.keys(protos);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Protos</h1>
        <p className={styles.subtitle}>Browse and view design protos</p>

        {/* Protos Grid */}
        <div className={styles.grid}>
          {protoEntries.map((protoName) => (
            <Link
              key={protoName}
              to={`/docs/protos/${protoName}`}
              className={`${styles['card-link']} group`}
            >
              <div className={styles.card}>
                <div className={styles['card-content']}>
                  <h3 className={styles['card-title']}>
                    {protoName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h3>
                  <p className={styles['card-description']}>Click to view proto</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
