import { useParams, Link } from 'react-router';
import { protos } from '@docs/protos';
import { ProtoViewer } from '@components/proto';
import styles from './ProtosViewerPage.module.css';

export function ProtosViewerPage() {
  const { proto } = useParams();

  const WireComponent = protos[proto as keyof typeof protos];

  if (!WireComponent) {
    return (
      <div className={styles['error-wrapper']}>
        <div className={styles['error-content']}>
          <h1 className={styles['error-title']}>Proto not found</h1>
          <p className={styles['error-text']}>The proto "{proto}" does not exist.</p>
          <Link to="/docs/protos" className={styles['error-link']}>
            Back to Protos
          </Link>
        </div>
      </div>
    );
  }

  const protoName = proto?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Proto';

  return (
    <div className={styles.container}>
      <ProtoViewer proto={WireComponent} title={protoName} />
    </div>
  );
}
