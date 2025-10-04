import { WireBox } from '../WireBox';
import { WireText } from '../WireText';
import { WireImage } from '../WireImage';
import { WireButton } from '../WireButton';
import styles from './WireCard.module.css';

export interface WireCardProps {
  title?: string;
  imageHeight?: string;
  textLines?: number;
  hasButton?: boolean;
  className?: string;
}

export function WireCard({
  title,
  imageHeight = '150px',
  textLines = 3,
  hasButton = false,
  className = '',
}: WireCardProps) {
  const classNames = [styles['wire-card'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <WireBox className={classNames} height="auto" variant="solid">
      <div className={styles['wire-card__content']}>
        <WireImage height={imageHeight} label={title} />
        <div className={styles['wire-card__body']}>
          <WireText lines={textLines} variant="paragraph" />
          {hasButton && (
            <div className={styles['wire-card__actions']}>
              <WireButton label="Action" variant="outline" size="sm" />
            </div>
          )}
        </div>
      </div>
    </WireBox>
  );
}
