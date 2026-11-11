import { forwardRef } from 'react';
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type LinkProps,
  type NavLinkProps,
} from 'react-router';
import { prefersReducedMotion } from '@/lib/motion';

// Every internal link goes through these, so page changes run as a View
// Transition (see docs/MOTION-SPEC.md). Browsers without the API, and
// visitors who prefer reduced motion, get an instant page change.
// Plain <a href> links (static /ux/* apps, files, external) stay full loads.

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { viewTransition, ...props },
  ref,
) {
  return <RouterLink ref={ref} viewTransition={viewTransition ?? !prefersReducedMotion()} {...props} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { viewTransition, ...props },
  ref,
) {
  return <RouterNavLink ref={ref} viewTransition={viewTransition ?? !prefersReducedMotion()} {...props} />;
});

export type { LinkProps, NavLinkProps };
