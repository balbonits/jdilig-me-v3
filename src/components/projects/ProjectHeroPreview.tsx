type Props = {
  height?: number;
  starCount?: number;
  image?: string;
  alt?: string;
  className?: string;
};

export default function ProjectHeroPreview({
  height = 160,
  starCount = 50,
  image,
  alt = '',
  className = '',
}: Props) {
  if (image) {
    return (
      <div
        className={`relative overflow-hidden bg-bg-muted ${className}`}
        style={{ height }}
      >
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        height,
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
