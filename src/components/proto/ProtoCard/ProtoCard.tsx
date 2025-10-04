import { ProtoBox } from '../ProtoBox';
import { ProtoText } from '../ProtoText';
import { ProtoImage } from '../ProtoImage';
import { ProtoButton } from '../ProtoButton';
import styles from './ProtoCard.module.css';

export interface ProtoCardProps {
  title?: string;
  imageHeight?: string;
  textLines?: number;
  hasButton?: boolean;
  className?: string;
}

export function ProtoCard({
  title,
  imageHeight = '150px',
  textLines = 3,
  hasButton = false,
  className = '',
}: ProtoCardProps) {
  const classNames = [styles['proto-card'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <ProtoBox className={classNames} height="auto" variant="solid">
      <div className={styles['proto-card__content']}>
        <ProtoImage height={imageHeight} label={title} />
        <div className={styles['proto-card__body']}>
          <ProtoText lines={textLines} variant="paragraph" />
          {hasButton && (
            <div className={styles['proto-card__actions']}>
              <ProtoButton label="Action" variant="outline" size="sm" />
            </div>
          )}
        </div>
      </div>
    </ProtoBox>
  );
}
