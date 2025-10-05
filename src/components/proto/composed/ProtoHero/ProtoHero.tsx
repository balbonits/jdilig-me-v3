import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoHero.module.css';

export interface ProtoHeroProps {
  /** Hero content */
  children?: ReactNode;
  /** Height variant */
  height?: 'sm' | 'md' | 'lg' | 'full';
  /** Background style */
  background?: 'solid' | 'gradient' | 'image';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoHero - Hero/media banner component
 *
 * @example
 * ```tsx
 * <ProtoHero height="lg" background="gradient" align="center">
 *   <ProtoText variant="heading" />
 *   <ProtoButton label="CTA" />
 * </ProtoHero>
 * ```
 */
export function ProtoHero({
  children,
  height = 'md',
  background = 'solid',
  align = 'center',
  className,
}: ProtoHeroProps) {
  return (
    <div
      className={cn(
        styles['proto-hero'],
        styles[`proto-hero--${height}`],
        styles[`proto-hero--${background}`],
        styles[`proto-hero--align-${align}`],
        className
      )}
    >
      <div className={styles['proto-hero__content']}>
        {children}
      </div>
    </div>
  );
}
