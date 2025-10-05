import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoText.module.css';

export interface ProtoTextProps {
  lines?: number;
  variant?: 'heading' | 'paragraph' | 'caption';
  width?: string;
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

export function ProtoText({
  lines = 3,
  variant = 'paragraph',
  width,
  className,
}: ProtoTextProps) {
  return (
    <div className={cn(styles['proto-text'], className)} style={{ width }}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            styles['proto-text__line'],
            styles[`proto-text__line--${variant}`]
          )}
          style={{
            width: index === lines - 1 ? '70%' : '100%', // Last line shorter
          }}
        />
      ))}
    </div>
  );
}
