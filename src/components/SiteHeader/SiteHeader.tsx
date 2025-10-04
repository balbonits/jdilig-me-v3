import { Navbar } from '@components/ui/Navbar/Navbar';
import { Button } from '@components/ui/Button/Button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import styles from './SiteHeader.module.css';

export interface SiteHeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function SiteHeader({ theme, onThemeToggle }: SiteHeaderProps) {
  return (
    <Navbar
      brand={<Link to="/" className={styles['site-header__brand']}>JDilig</Link>}
      fixed="top"
    >
      <div className={styles['site-header__nav']}>
        <Link to="/docs" className={styles['site-header__link']}>
          Docs
        </Link>
        <Link to="/docs/protos" className={styles['site-header__link']}>
          Protos
        </Link>
        <Link to="/docs/ui" className={styles['site-header__link']}>
          UI
        </Link>
        <Button
          variant={theme === 'dark' ? 'primary' : 'light'}
          outline={theme === 'light'}
          size="sm"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <MoonIcon className={styles['site-header__icon']} />
          ) : (
            <SunIcon className={styles['site-header__icon']} />
          )}
        </Button>
      </div>
    </Navbar>
  );
}
