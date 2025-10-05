import type { ReactNode } from 'react';
import { ProtoBox } from '../../layout/ProtoBox';
import { ProtoText } from '../../content/ProtoText';
import { ProtoImage } from '../../content/ProtoImage';
import { ProtoButton } from '../../content/ProtoButton';
import styles from './ProtoCard.module.css';

export interface ProtoCardProps {
  /** Card title */
  title?: string;
  /** Custom image element or height string */
  image?: ReactNode;
  /** Image height (used if image prop is not provided) */
  imageHeight?: string;
  /** Custom description element or number of text lines */
  description?: ReactNode;
  /** Number of text lines (used if description prop is not provided) */
  textLines?: number;
  /** Custom button element */
  button?: ReactNode;
  /** Show default button (used if button prop is not provided) */
  hasButton?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function ProtoCard({
  title,
  image,
  imageHeight = '150px',
  description,
  textLines = 3,
  button,
  hasButton = false,
  className = '',
}: ProtoCardProps) {
  const classNames = [styles['proto-card'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <ProtoBox className={classNames} height="auto" variant="solid">
      <div className={styles['proto-card__content']}>
        {image || <ProtoImage height={imageHeight} label={title} />}
        <div className={styles['proto-card__body']}>
          {title && <div className={styles['proto-card__title']}>{title}</div>}
          {description || <ProtoText lines={textLines} variant="paragraph" />}
          {(button || hasButton) && (
            <div className={styles['proto-card__actions']}>
              {button || <ProtoButton label="Action" variant="outline" size="sm" />}
            </div>
          )}
        </div>
      </div>
    </ProtoBox>
  );
}
