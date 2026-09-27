import { screenshotSrcSet } from '@/lib/screenshots';

type Props = {
  image?: string;
  alt?: string;
  starCount?: number;
  /** Load eagerly at high priority — for previews above the fold. */
  priority?: boolean;
  /**
   * How wide the preview shows (an `<img sizes>` value). When set, the
   * browser can load the 720 px thumbnail instead of the original.
   */
  sizes?: string;
  /** Size the preview with height utilities, e.g. `h-[160px] sm:h-[240px]`. */
  className?: string;
};

export default function ProjectHeroPreview({
  image,
  alt = '',
  starCount = 50,
  priority = false,
  sizes,
  className = '',
}: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-bg-muted ${className}`}>
        <img
          src={image}
          srcSet={sizes ? screenshotSrcSet(image) : undefined}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          'radial-gradient(ellipse at 30% 40%, #1c1917 0%, #0c0a09 70%)',
      }}
    >
      {Array.from({ length: starCount }).map((_, i) => {
        const x = (i * 73) % 100;
        const y = (i * 41) % 100;
        const s = (i % 3) + 1;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: s,
              height: s,
              background: i % 7 === 0 ? '#fb923c' : '#fafaf9',
              opacity: 0.45 + (i % 5) * 0.11,
            }}
          />
        );
      })}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fb923c"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <path d="M12 2 L4 20 L12 16 L20 20 Z" />
      </svg>
    </div>
  );
}
