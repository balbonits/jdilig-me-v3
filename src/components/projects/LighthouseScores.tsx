type CategoryKey = 'performance' | 'accessibility' | 'bestPractices' | 'seo';

type LighthouseData = {
  url: string;
  measuredAt: string;
  formFactor: string;
  lighthouseVersion: string;
  scores: Record<CategoryKey, number>;
};

const LABELS: Record<CategoryKey, string> = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  bestPractices: 'Best Practices',
  seo: 'SEO',
};

// Lighthouse's own score-band colors (matched to lighthouse-viewer):
//   ≥ 90 → green   (#0cce6b)
//   50–89 → amber  (#ffa400)
//   < 50  → red    (#ff4e42)
function colorFor(score: number): { ring: string; text: string; soft: string } {
  if (score >= 90) {
    return {
      ring: '#0cce6b',
      text: '#0cce6b',
      soft: 'rgba(12, 206, 107, 0.12)',
    };
  }
  if (score >= 50) {
    return {
      ring: '#ffa400',
      text: '#ffa400',
      soft: 'rgba(255, 164, 0, 0.12)',
    };
  }
  return {
    ring: '#ff4e42',
    text: '#ff4e42',
    soft: 'rgba(255, 78, 66, 0.12)',
  };
}

function Gauge({ score, label }: { score: number; label: string }) {
  const size = 104;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(100, score)) / 100);
  const c = colorFor(score);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill={c.soft}
            stroke="rgba(127, 127, 127, 0.18)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={c.ring}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 320ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center font-mono text-[28px] font-semibold tabular-nums"
          style={{ color: c.text }}
          aria-label={`${label} score: ${score} out of 100`}
        >
          {score}
        </div>
      </div>
      <div className="text-center text-[13px] font-medium leading-tight text-fg-strong">
        {label}
      </div>
    </div>
  );
}

export default function LighthouseScores({
  data,
  className = '',
}: {
  data: LighthouseData;
  className?: string;
}) {
  const scores = data.scores;
  const measured = new Date(data.measuredAt);

  return (
    <section
      className={`rounded-[12px] border border-border-DEFAULT bg-bg-subtle p-6 ${className}`}
      aria-label="Lighthouse scores"
    >
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
          Lighthouse
        </h2>
        <a
          href="https://developer.chrome.com/docs/lighthouse/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-faint hover:text-fg-muted"
        >
          About scoring →
        </a>
      </div>

      <div className="grid grid-cols-2 items-start justify-items-center gap-6 sm:grid-cols-4">
        {(Object.keys(LABELS) as CategoryKey[]).map((key) => (
          <Gauge key={key} score={scores[key]} label={LABELS[key]} />
        ))}
      </div>

      <div className="mt-6 text-center font-mono text-[10px] text-fg-faint">
        Lighthouse {data.lighthouseVersion} ·{' '}
        <span className="capitalize">{data.formFactor}</span> · measured{' '}
        {measured.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
    </section>
  );
}
