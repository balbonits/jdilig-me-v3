import type { ComponentType, SVGProps } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import { ProtoIcon } from '../ProtoIcon';
import { PlayCircleIcon, SpeakerWaveIcon, FilmIcon } from '@heroicons/react/24/outline';
import styles from './ProtoMedia.module.css';

export interface ProtoMediaProps {
  /** Media type */
  type?: 'video' | 'audio' | 'embed';
  /** Media aspect ratio */
  aspect?: '16:9' | '4:3' | '1:1' | '21:9';
  /** Show controls */
  controls?: boolean;
  /** Custom icon */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Label text */
  label?: string;
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

const DEFAULT_ICONS = {
  video: FilmIcon,
  audio: SpeakerWaveIcon,
  embed: PlayCircleIcon,
};

/**
 * ProtoMedia - Media player/embed placeholder
 *
 * @example
 * ```tsx
 * <ProtoMedia type="video" aspect="16:9" controls />
 * <ProtoMedia type="audio" />
 * <ProtoMedia type="embed" label="YouTube Video" />
 * ```
 */
export function ProtoMedia({
  type = 'video',
  aspect = '16:9',
  controls = true,
  icon,
  label,
  className,
}: ProtoMediaProps) {
  const MediaIcon = icon || DEFAULT_ICONS[type];

  return (
    <div
      className={cn(
        styles['proto-media'],
        styles[`proto-media--${type}`],
        styles[`proto-media--${aspect.replace(':', '-')}`],
        className
      )}
    >
      <div className={styles['proto-media__content']}>
        <ProtoIcon icon={MediaIcon} size="xl" />
        {label && <span className={styles['proto-media__label']}>{label}</span>}
        {type !== 'audio' && (
          <span className={styles['proto-media__aspect']}>{aspect}</span>
        )}
      </div>
      {controls && type !== 'embed' && (
        <div className={styles['proto-media__controls']}>
          <div className={styles['proto-media__control-bar']} />
        </div>
      )}
    </div>
  );
}
