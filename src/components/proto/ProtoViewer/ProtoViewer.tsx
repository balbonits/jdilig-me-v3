import { useState, type ComponentType } from 'react';
import { ProtoViewportContext } from '../ProtoNav/ProtoNav';
import styles from './ProtoViewer.module.css';

export interface ProtoViewerProps {
  proto: ComponentType;
  title?: string;
  className?: string;
}

const VIEWPORT_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1440px',
} as const;

export function ProtoViewer({
  proto: ProtoComponent,
  title = 'Proto',
  className = '',
}: ProtoViewerProps) {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const classNames = [styles['proto-viewer'], className]
    .filter(Boolean)
    .join(' ');

  const frameClassNames = [
    styles['proto-viewer__frame'],
    styles[`proto-viewer__frame--${viewport}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {/* Header with Title and Viewport Controls */}
      <div className={styles['proto-viewer__header']}>
        <div className={styles['proto-viewer__title-section']}>
          <h1 className={styles['proto-viewer__title']}>{title}</h1>
          <p className={styles['proto-viewer__subtitle']}>Viewing proto design</p>
        </div>

        <div className={styles['proto-viewer__controls']}>
          <button
            onClick={() => setViewport('mobile')}
            className={`${styles['proto-viewer__button']} ${
              viewport === 'mobile' ? styles['proto-viewer__button--active'] : ''
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`${styles['proto-viewer__button']} ${
              viewport === 'tablet' ? styles['proto-viewer__button--active'] : ''
            }`}
          >
            Tablet
          </button>
          <button
            onClick={() => setViewport('desktop')}
            className={`${styles['proto-viewer__button']} ${
              viewport === 'desktop' ? styles['proto-viewer__button--active'] : ''
            }`}
          >
            Desktop
          </button>
        </div>
      </div>

      {/* Proto Display Container */}
      <div className={styles['proto-viewer__container']}>
        <ProtoViewportContext.Provider value={viewport}>
          <div
            className={frameClassNames}
            style={{ width: VIEWPORT_WIDTHS[viewport] }}
          >
            <ProtoComponent />
          </div>
        </ProtoViewportContext.Provider>
      </div>
    </div>
  );
}
