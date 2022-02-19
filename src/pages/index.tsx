import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import animations from '../styles/Animations.module.css';

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

function appendStyle(node: HTMLElement, newStyle: any) {
  node.setAttribute('class', node.className + ' ' + newStyle);
}

function getBgColor(attempt: string, i: number) {
  let correctLetter = secret[i];
  let attemptLetter = attempt[i];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return '#212121';
  }
  if (correctLetter === attemptLetter) {
    return '#538d4e';
  }
  return '#b59f3b';
}

const Home: NextPage = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [attempt, setAttempt] = useState<string>('');

  const reveal = (guess: string): void => {
    const row = document.getElementById(`row-${history.length}`);
    if (!row) return;
    const letters = row.childNodes as NodeListOf<HTMLElement>;
    for (let i = 0; i < guess.length; i++) {
      let bgColor = getBgColor(attempt, i);
      setTimeout(() => {
        appendStyle(letters[i], animations.reveal);
        setTimeout(() => {
          letters[i].setAttribute('style', `background-color: ${bgColor}`);
        }, 125);
      }, i * 250);
    }
  };

  const handleKey = (e: KeyboardEvent): void => {
    if (history.length >= 6) return;
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
      reveal(attempt);
      setHistory((_history) => _history.concat(attempt));
      setAttempt('');
    } else if (/^[a-z]{1}$/.test(key) && attempt.length < 5) {
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
