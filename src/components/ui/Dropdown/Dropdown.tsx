import { useState, useEffect, useRef, type ReactNode } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  label: string | ReactNode;
  onClick?: () => void;
  href?: string;
  divider?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
}

export const Dropdown = ({
  trigger,
  items,
  placement = 'bottom-start',
  className = '',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled || item.divider) return;

    if (item.onClick) {
      item.onClick();
    }

    closeDropdown();
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className}`}>
      <div onClick={toggleDropdown} className={styles.dropdown__trigger}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`${styles.dropdown__menu} ${styles[`dropdown__menu--${placement}`]}`}>
          {items.map((item, index) => {
            if (item.divider) {
              return <div key={index} className={styles.dropdown__divider} />;
            }

            const itemClasses = `${styles.dropdown__item} ${
              item.disabled ? styles['dropdown__item--disabled'] : ''
            }`;

            if (item.href && !item.disabled) {
              return (
                <a
                  key={index}
                  href={item.href}
                  className={itemClasses}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                    if (item.href) {
                      window.location.href = item.href;
                    }
                  }}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={index}
                type="button"
                className={itemClasses}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
