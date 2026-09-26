import type { ReactNode } from 'react';

const widths = {
  /** Home, Projects, ProjectDetail — gallery layouts. */
  wide: 'max-w-[1120px]',
  /** Resume, Contact — prose-heavy pages. */
  narrow: 'max-w-[720px]',
};

type Props = {
  size?: keyof typeof widths;
  className?: string;
  children: ReactNode;
};

/** Centered page column with the site's responsive side gutters. */
export default function Container({
  size = 'wide',
  className = '',
  children,
}: Props) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-10 ${widths[size]} ${className}`}>
      {children}
    </div>
  );
}
