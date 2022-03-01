import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import useEncryptedList from '../utils/use-encrypted-list';
import animateReveal from '../utils/animate-reveal';
import animatePress from '../utils/animate-press';
import getCell from '../utils/get-cell';

import KeyboardRow from '../components/keyboard-row/keyboard-row';

import styles from '../styles/Home.module.css';

let rows: number[] = [0, 1, 2, 3, 4, 5];
let columns: number[] = [0, 1, 2, 3, 4];

type WordleProps = {
  wordlist: string;
};

const Home: NextPage<WordleProps> = ({ wordlist }) => {
  const [status, setStatus] = useState<'complete' | 'inprogress'>('inprogress');
  const [history, setHistory] = useState<string[]>([]);
  const [attempt, setAttempt] = useState<string>('');
  const { words, secret } = useEncryptedList(wordlist);

  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  });

  const onKeyPress = (e: KeyboardEvent): void => {
    if (status === 'complete') return;
    const key = e.key.toLowerCase();
    handleKey(key);
  };

  const handleKey = (key: string) => {
    if (key === 'backspace') {
      const cell = getCell(attempt.slice(0, attempt.length - 1), history);
      if (cell) {
        cell.style.border = '2px solid #3a3a3a';
      }
      setAttempt(attempt.slice(0, attempt.length - 1));
      return;
    } else if (key === 'enter') {
      if (attempt.length < 5) {
        return;
      }
      if (!words.includes(attempt)) {
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
    } else if (/^[a-z]{1}$/.test(key) && attempt.length < 5) {
      animatePress(attempt, history);
      setAttempt((_attempt) => (_attempt += key));
    }
  };

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
        <div className={styles.keyboard}>
          <KeyboardRow
            letters="qwertyuiop"
            handleClick={(letter: string) => handleKey(letter)}
          />
          <KeyboardRow
            letters="asdfghjkl"
            handleClick={(letter: string) => handleKey(letter)}
          />
          <KeyboardRow
            letters="zxcvbnm"
            isLast
            handleClick={(letter: string) => handleKey(letter)}
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const { wordlist } = await (
    await fetch('https://word-api.vercel.app/api/words')
  ).json();

  return {
    props: {
      wordlist,
    },
  };
}

export default Home;
