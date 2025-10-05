import { useState, type ReactNode } from 'react';
import { ProtoButton } from '../../content/ProtoButton';
import styles from './ProtoViewport.module.css';

export interface ProtoViewportProps {
  children: ReactNode;
  defaultView?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
}

const VIEWPORT_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1440px',
} as const;

export function ProtoViewport({
  children,
  defaultView = 'desktop',
  className = '',
}: ProtoViewportProps) {
  const [viewport] = useState<'mobile' | 'tablet' | 'desktop'>(
    defaultView
  );

  const classNames = [styles['proto-viewport'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <div className={styles['proto-viewport__controls']}>
        <ProtoButton
          label="Mobile"
          size="sm"
          variant={viewport === 'mobile' ? 'primary' : 'outline'}
          className={styles['proto-viewport__button']}
        />
        <ProtoButton
          label="Tablet"
          size="sm"
          variant={viewport === 'tablet' ? 'primary' : 'outline'}
          className={styles['proto-viewport__button']}
        />
        <ProtoButton
          label="Desktop"
          size="sm"
          variant={viewport === 'desktop' ? 'primary' : 'outline'}
          className={styles['proto-viewport__button']}
        />
      </div>
      <div
        className={styles['proto-viewport__frame']}
        style={{ width: VIEWPORT_WIDTHS[viewport] }}
      >
        {children}
      </div>
    </div>
  );
}
