import React from 'react';
import styles from '../../styles/Home.module.css';

type AttemptsProps = {
  rows: number[];
  columns: number[];
  history: string[];
  attempt: string;
};

const Attempts: React.FC<AttemptsProps> = ({
  rows,
  columns,
  history,
  attempt,
}) => {
  return (
    <div className={styles.gridWrapper}>
      {rows.map((rowIdx) => {
        const rowId = `row-${rowIdx}`;
        return (
          <div key={rowId} id={rowId} className={styles.row}>
            {columns.map((colIdx) => {
              const colId = `cell-${rowIdx}-${colIdx}`;
              return (
                <div id={colId} key={colId} className={styles.cell}>
                  {history[rowIdx]
                    ? history[rowIdx][colIdx]
                    : rowIdx === history.length
                    ? attempt[colIdx]
                    : ''}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Attempts;
