import { useState, useContext, createContext } from 'react';
import styles from './ProtoNav.module.css';

export interface ProtoNavProps {
  items?: string[];
  position?: 'top' | 'bottom';
  className?: string;
  viewport?: 'mobile' | 'tablet' | 'desktop';
}

// Context to pass viewport from ProtoViewer
export const ProtoViewportContext = createContext<'mobile' | 'tablet' | 'desktop'>('desktop');

export function ProtoNav({
  items = ['Item 1', 'Item 2', 'Item 3'],
  position = 'top',
  className = '',
  viewport,
}: ProtoNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contextViewport = useContext(ProtoViewportContext);
  const activeViewport = viewport || contextViewport;
  const isMobile = activeViewport === 'mobile';

  const classNames = [
    styles['proto-nav'],
    styles[`proto-nav--${position}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classNames}>
      <div className={styles['proto-nav__header']}>
        {/* Logo/Brand area (placeholder) */}
        <div className={styles['proto-nav__brand']}>Logo</div>

        {/* Hamburger menu button - visible on mobile viewport */}
        {isMobile && (
          <button
            className={styles['proto-nav__hamburger']}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles['proto-nav__hamburger-icon']}>
              <div className={styles['proto-nav__hamburger-line']}></div>
              <div className={styles['proto-nav__hamburger-line']}></div>
              <div className={styles['proto-nav__hamburger-line']}></div>
            </div>
          </button>
        )}

        {/* Full menu - visible on tablet/desktop */}
        {!isMobile && (
          <div className={styles['proto-nav__container']}>
            {items.map((item, index) => (
              <div key={index} className={styles['proto-nav__item']}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && isMenuOpen && (
        <div className={styles['proto-nav__mobile-menu']}>
          <button
            className={styles['proto-nav__close']}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {items.map((item, index) => (
            <div key={index} className={styles['proto-nav__mobile-item']}>
              {item}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
