import { BrowserRouter, Routes, Link } from 'react-router';
import { AppRoutes } from './router';
import { SiteHeader } from '@components/SiteHeader';
import { useTheme } from '@hooks/useTheme';
import styles from './App.module.css';

function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Home Page</h1>
        <div className={styles.nav}>
          <Link to="/about" className={styles.link}>
            About
          </Link>
          <Link to="/docs" className={styles.link}>
            Docs
          </Link>
          <Link to="/docs/wires" className={styles.link}>
            Wireframes
          </Link>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>About Page</h1>
        <Link to="/" className={styles.link}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme}>
      <BrowserRouter>
        <SiteHeader theme={theme} onThemeToggle={toggleTheme} />
        <Routes>
          {AppRoutes()}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export { HomePage, AboutPage };
