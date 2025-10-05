import type { FC } from 'react';
import styles from './ProtoTabs.module.css';

export interface ProtoTabsProps {
  tabs?: string[];
  activeTab?: number;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export const ProtoTabs: FC<ProtoTabsProps> = ({
  tabs = ['Tab 1', 'Tab 2', 'Tab 3'],
  activeTab = 0,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`${styles['proto-tabs']} ${styles[`proto-tabs--${variant}`]} ${className}`}>
      {tabs.map((_, index) => (
        <div
          key={index}
          className={`${styles['proto-tabs__tab']} ${
            index === activeTab ? styles['proto-tabs__tab--active'] : ''
          }`}
        >
          <div className={styles['proto-tabs__label']} />
        </div>
      ))}
    </div>
  );
};
