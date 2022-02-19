import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import animateReveal from '../utils/animate-reveal';
import styles from '../styles/Home.module.css';

let rows: number[] = [0, 1, 2, 3, 4, 5];
let columns: number[] = [0, 1, 2, 3, 4];

const wordList = [
  'hello',
  'piano',
  'pizza',
  'patio',
  'aroma',
  'trick',
  'unzip',
];

const randomIdx = Math.floor(Math.random() * wordList.length);
const secret = wordList[randomIdx];

const Home: NextPage = () => {
  const [status, setStatus] = useState<'complete' | 'inprogress'>('inprogress');
  const [history, setHistory] = useState<string[]>([]);
  const [attempt, setAttempt] = useState<string>('');

  const handleKey = (e: KeyboardEvent): void => {
    if (status === 'complete') return;
    const key = e.key.toLowerCase();

    if (key === 'backspace') {
      setAttempt(attempt.slice(0, attempt.length - 1));
      return;
    } else if (key === 'enter') {
      if (attempt.length < 5) {
        return;
      }
      if (!wordList.includes(attempt)) {
        alert('not in the list m8');
        return;
      }
      animateReveal(secret, attempt, history);
      setHistory((_history) => _history.concat(attempt));
      setAttempt('');
      if (attempt === secret) {
        setStatus('complete');
      }
      if (history.length === 5 && attempt !== secret) {
        setTimeout(() => alert(secret + ' ;)'), 1250);
      }
    } else if (/^[a-z]{1}$/.test(key)) {
      setAttempt((attempt) => (attempt += key));
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKey);
    return () => {
      window.removeEventListener('keyup', handleKey);
    };
  });

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
      </div>
    </div>
  );
};

export default Home;
