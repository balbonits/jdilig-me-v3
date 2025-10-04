import { useState, useRef, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  content: string | ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  className?: string;
}

export function Tooltip({
  content,
  placement = 'top',
  children,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const tooltipClasses = [
    styles.tooltip,
    styles[`tooltip--${placement}`],
    isVisible && styles['tooltip--visible'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const arrowClasses = [
    styles.tooltip__arrow,
    styles[`tooltip__arrow--${placement}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={triggerRef}
      className={styles.tooltip__wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className={tooltipClasses} role="tooltip">
          <div className={styles.tooltip__content}>{content}</div>
          <div className={arrowClasses} />
        </div>
      )}
    </div>
  );
}
