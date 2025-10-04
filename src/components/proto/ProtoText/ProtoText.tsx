import styles from './ProtoText.module.css';

export interface ProtoTextProps {
  lines?: number;
  variant?: 'heading' | 'paragraph' | 'caption';
  width?: string;
  className?: string;
}

export function ProtoText({
  lines = 3,
  variant = 'paragraph',
  width,
  className = '',
}: ProtoTextProps) {
  const classNames = [styles['proto-text'], className].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={{ width }}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${styles['proto-text__line']} ${styles[`proto-text__line--${variant}`]}`}
          style={{
            width: index === lines - 1 ? '70%' : '100%', // Last line shorter
          }}
        />
      ))}
    </div>
  );
}
