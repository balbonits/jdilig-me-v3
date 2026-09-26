/** Renders plain copy, turning `backtick` spans into inline <code>. */
export default function RichText({ text }: { text: string }) {
  return (
    <>
      {text
        .split('`')
        .map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))}
    </>
  );
}
