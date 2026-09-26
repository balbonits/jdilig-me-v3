import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { Link, type LinkProps } from 'react-router';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
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
  'inline-flex items-center justify-center font-sans font-medium tracking-[-0.01em] border transition-all duration-150 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
) {
  return `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
}

export function Button({
  variant,
  size,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button className={buttonClass(variant, size, className)} {...rest} />;
}

type LinkButtonProps = StyleProps &
  (
    | ({ to: LinkProps['to'] } & Omit<LinkProps, 'className'>)
    | ({ to?: never } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

/**
 * A link styled as a button. Pass `to` for in-app routes (renders a router
 * `<Link>`, so navigation stays client-side) or `href` for external URLs
 * and files (renders a plain `<a>`).
 */
export function LinkButton({
  variant,
  size,
  className = '',
  ...rest
}: LinkButtonProps) {
  const classes = buttonClass(variant, size, `no-underline ${className}`);
  if (rest.to !== undefined) return <Link className={classes} {...rest} />;
  return <a className={classes} {...rest} />;
}
