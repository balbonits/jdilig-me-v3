import styles from './WireText.module.css';

export interface WireTextProps {
  lines?: number;
  variant?: 'heading' | 'paragraph' | 'caption';
  width?: string;
  className?: string;
}

export function WireText({
  lines = 3,
  variant = 'paragraph',
  width,
  className = '',
}: WireTextProps) {
  const classNames = [styles['wire-text'], className].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={{ width }}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${styles['wire-text__line']} ${styles[`wire-text__line--${variant}`]}`}
          style={{
            width: index === lines - 1 ? '70%' : '100%', // Last line shorter
          }}
        />
      ))}
    </div>
  );
}
