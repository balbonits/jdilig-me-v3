import { useState, type ReactNode } from 'react';
import { WireButton } from '../WireButton';
import styles from './WireViewport.module.css';

export interface WireViewportProps {
  children: ReactNode;
  defaultView?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
}

const VIEWPORT_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1440px',
} as const;

export function WireViewport({
  children,
  defaultView = 'desktop',
  className = '',
}: WireViewportProps) {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>(
    defaultView
  );

  const classNames = [styles['wire-viewport'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <div className={styles['wire-viewport__controls']}>
        <WireButton
          label="Mobile"
          size="sm"
          variant={viewport === 'mobile' ? 'primary' : 'outline'}
          className={styles['wire-viewport__button']}
        />
        <WireButton
          label="Tablet"
          size="sm"
          variant={viewport === 'tablet' ? 'primary' : 'outline'}
          className={styles['wire-viewport__button']}
        />
        <WireButton
          label="Desktop"
          size="sm"
          variant={viewport === 'desktop' ? 'primary' : 'outline'}
          className={styles['wire-viewport__button']}
        />
      </div>
      <div
        className={styles['wire-viewport__frame']}
        style={{ width: VIEWPORT_WIDTHS[viewport] }}
      >
        {children}
      </div>
    </div>
  );
}
