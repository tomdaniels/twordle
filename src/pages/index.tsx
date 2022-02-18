import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.css';

let rows: number[] = [0, 1, 2, 3, 4, 5];
let columns: number[] = [0, 1, 2, 3, 4, 5];
const Home: NextPage = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [attempt, setAttempt] = useState<string>('');

  return (
    <div>
      <Head>
        <title>twordle baby</title>
        <meta name="description" content="dont be shy, 'avva go" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>
          <small className={styles.small}>my clone of</small> Wordle
        </h1>
        <div className={styles.divider} />

        <div className={styles.gridWrapper}>
          {rows.map((rowIdx) => {
            const rowId = `row-${rowIdx}`;
            return (
              <div key={rowId} id={rowId} className={styles.row}>
                {columns.map((colIdx) => {
                  const colId = `cell-${rowIdx}-${colIdx}`;
                  return (
                    <div id={colId} key={colId} className={styles.cell}></div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
