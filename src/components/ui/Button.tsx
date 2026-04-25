import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-contrast shadow-sm hover:bg-accent-hover hover:-translate-y-[1px] active:translate-y-0 border-transparent',
  secondary:
    'bg-surface text-fg-strong border-border-DEFAULT shadow-xs hover:bg-bg-subtle hover:border-border-strong',
  ghost:
    'bg-transparent text-fg-muted border-transparent hover:bg-bg-muted hover:text-fg-strong',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'px-4 py-[9px] text-sm rounded-md gap-1.5',
  lg: 'px-5 py-[11px] text-[15px] rounded-[10px] gap-2',
};

const base =
  'inline-flex items-center justify-center font-sans font-medium tracking-[-0.01em] border transition-all duration-150 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & CommonProps
>(function Button(
  { variant = 'primary', size = 'md', className = '', children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});

export const LinkButton = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps
>(function LinkButton(
  { variant = 'primary', size = 'md', className = '', children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} no-underline ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
});
