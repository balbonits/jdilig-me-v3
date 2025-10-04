import type { FC } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import styles from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  showPrevNext = true,
  maxVisible = 5,
  size = 'md',
  className = '',
}) => {
  // Calculate page numbers to display
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the start
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisible);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisible + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis');
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      className={`${styles.pagination} ${styles[`pagination--${size}`]} ${className}`}
      aria-label="Pagination"
    >
      {/* First Page Button */}
      {showFirstLast && (
        <button
          className={`${styles.pagination__button} ${styles['pagination__button--nav']}`}
          onClick={() => handlePageChange(1)}
          disabled={isFirstPage}
          aria-label="Go to first page"
        >
          <ChevronDoubleLeftIcon className={styles.pagination__icon} />
        </button>
      )}

      {/* Previous Page Button */}
      {showPrevNext && (
        <button
          className={`${styles.pagination__button} ${styles['pagination__button--nav']}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon className={styles.pagination__icon} />
        </button>
      )}

      {/* Page Number Buttons */}
      <div className={styles.pagination__pages}>
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={styles.pagination__ellipsis}
                aria-hidden="true"
              >
                &hellip;
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              className={`${styles.pagination__button} ${styles['pagination__button--page']} ${
                isActive ? styles['pagination__button--active'] : ''
              }`}
              onClick={() => handlePageChange(page)}
              disabled={isActive}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Page Button */}
      {showPrevNext && (
        <button
          className={`${styles.pagination__button} ${styles['pagination__button--nav']}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          aria-label="Go to next page"
        >
          <ChevronRightIcon className={styles.pagination__icon} />
        </button>
      )}

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          className={`${styles.pagination__button} ${styles['pagination__button--nav']}`}
          onClick={() => handlePageChange(totalPages)}
          disabled={isLastPage}
          aria-label="Go to last page"
        >
          <ChevronDoubleRightIcon className={styles.pagination__icon} />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
