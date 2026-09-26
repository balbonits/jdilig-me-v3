type Props = {
  tags: string[];
  className?: string;
};

export default function TagList({ tags, className = '' }: Props) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-[5px] border border-border-DEFAULT bg-bg-muted px-[7px] py-0.5 font-mono text-[10.5px] text-fg-strong"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
