import styles from './ProtoTable.module.css';

export interface ProtoTableProps {
  columns?: number;
  rows?: number;
  hasHeader?: boolean;
  className?: string;
}

export function ProtoTable({
  columns = 3,
  rows = 5,
  hasHeader = true,
  className = '',
}: ProtoTableProps) {
  const classNames = [styles['proto-table'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <table className={styles['proto-table__table']}>
        {hasHeader && (
          <thead className={styles['proto-table__thead']}>
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className={styles['proto-table__th']}>
                  <div className={styles['proto-table__cell-content']}></div>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className={styles['proto-table__tr']}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className={styles['proto-table__td']}>
                  <div className={styles['proto-table__cell-content']}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
