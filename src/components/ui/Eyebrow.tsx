type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <span
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent ${className}`}
    >
      § {children}
    </span>
  );
}
