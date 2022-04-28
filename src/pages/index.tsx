import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import storageFactory from 'td-storage';

import useEncryptedList from '../utils/use-encrypted-list';
import animateReveal from '../utils/animate-reveal';
import animatePress from '../utils/animate-press';
import getCell from '../utils/get-cell';
import updateKeyboardAfterAnimation from '../utils/update-keyboard-after-animation';
import handleInvalidEvent from '../utils/handle-invalid-event';
import encrypt from '../utils/encrypt';

import Toast from '../components/toast/toast';
import KeyboardRow from '../components/keyboard-row/keyboard-row';

import styles from '../styles/Home.module.css';

const identity = (_: never, i: number): number => i;
let rows: number[] = Array.from({ length: 5 }, identity);
let columns: number[] = Array.from({ length: 5 }, identity);

type WordleProps = {
  wordlist: string;
};

const store = storageFactory({
  driver: 'localStorage',
  name: 'wordle',
});

const Home: NextPage<WordleProps> = ({ wordlist }) => {
  const [status, setStatus] = useState<'complete' | 'inprogress'>('inprogress');
  const [history, setHistory] = useState<string[]>(
    () => store.get('history') || []
  );
  const [attempt, setAttempt] = useState<string>('');
  const [bestColours, setBestColours] = useState<Map<string, string>>(
    () => new Map()
  );
  const [notifications, notificationStack] = useState<string[]>([]);
  const { words, secret } = useEncryptedList(wordlist, store.get('secret'));

  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  });

  useEffect(() => {
    if (store.has('history')) {
      // persist existing paint on rerender for existing games
      for (let i = 0; i < history.length; i++) {
        animateReveal(secret, history[i], i);
      }
      updateKeyboardAfterAnimation(
        history,
        secret,
        (colours: Map<string, string>) => {
          setBestColours(colours);
        }
      );
    }
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
        handleInvalidEvent(
          'not enough letters pal',
          history,
          notificationStack
        );
        return;
      }
      if (!words.includes(attempt)) {
        handleInvalidEvent(
          'not in the word list m8',
          history,
          notificationStack
        );
        return;
      }
      animateReveal(secret, attempt, history.length);
      const nextHistory = [...history, attempt];
      setHistory(nextHistory);
      store.set('history', nextHistory);
      store.set('secret', encrypt(secret));
      updateKeyboardAfterAnimation(
        nextHistory,
        secret,
        (colours: Map<string, string>) => {
          setBestColours(colours);
        }
      );
      if (attempt === secret) {
        setStatus('complete');
        store.remove('history');
        store.remove('secret');
      }
      if (history.length + 1 === 5 && attempt !== secret) {
        setStatus('complete');
        store.remove('history');
        store.remove('secret');
        setTimeout(() => alert(`"${secret.toUpperCase()}" ya goose! ;)`), 1250);
      }
      setAttempt('');
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
        <div>
          <h1>
            <small className={styles.small}>my clone of</small> Wordle
          </h1>
          <div className={styles.divider} />
        </div>

        <Toast queue={notifications} />
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
            setColour={(letter: string) => bestColours.get(letter)}
          />
          <KeyboardRow
            letters="asdfghjkl"
            handleClick={(letter: string) => handleKey(letter)}
            setColour={(letter: string) => bestColours.get(letter)}
          />
          <KeyboardRow
            letters="zxcvbnm"
            isLast
            handleClick={(letter: string) => handleKey(letter)}
            setColour={(letter: string) => bestColours.get(letter)}
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
