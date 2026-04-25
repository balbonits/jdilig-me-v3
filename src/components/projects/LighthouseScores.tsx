import lighthouse from '@/data/lighthouse.json';

type CategoryKey = 'performance' | 'accessibility' | 'bestPractices' | 'seo';

const LABELS: Record<CategoryKey, string> = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  bestPractices: 'Best Practices',
  seo: 'SEO',
};

function colorFor(score: number): {
  bg: string;
  border: string;
  fg: string;
} {
  if (score >= 90) {
    return {
      bg: 'var(--success-soft)',
      border: 'var(--success)',
      fg: 'var(--success)',
    };
  }
  if (score >= 50) {
    return {
      bg: 'var(--warning-soft)',
      border: 'var(--warning)',
      fg: 'var(--warning)',
    };
  }
  return {
    bg: 'var(--danger-soft)',
    border: 'var(--danger)',
    fg: 'var(--danger)',
  };
}

export default function LighthouseScores({
  className = '',
}: {
  className?: string;
}) {
  const scores = lighthouse.scores as Record<CategoryKey, number>;
  const measured = new Date(lighthouse.measuredAt);

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(LABELS) as CategoryKey[]).map((key) => {
          const score = scores[key];
          const c = colorFor(score);
          return (
            <div
              key={key}
              className="flex items-baseline justify-between rounded-[8px] border px-2.5 py-1.5"
              style={{
                background: c.bg,
                borderColor: c.border,
              }}
              title={`${LABELS[key]}: ${score}/100`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">
                {LABELS[key]}
              </span>
              <span
                className="font-mono text-[15px] font-semibold tabular-nums"
                style={{ color: c.fg }}
              >
                {score}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 font-mono text-[10px] text-fg-faint">
        Lighthouse {lighthouse.lighthouseVersion} ·{' '}
        <span className="capitalize">{lighthouse.formFactor}</span> · measured{' '}
        {measured.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
    </div>
  );
}
