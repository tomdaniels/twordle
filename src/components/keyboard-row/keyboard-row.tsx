import React from 'react';

import styles from '../../styles/Keyboard.module.css';

type KeyboardRowProps = {
  setColour: Function;
  handleClick: Function;
  letters: string;
  isLast?: boolean;
};

const KeyboardRow: React.FC<KeyboardRowProps> = ({
  setColour,
  handleClick,
  letters,
  isLast = false,
}) => {
  return (
    <div className={styles.keyboard}>
      {isLast && (
        <button
          className={styles.keyboardButton}
          onClick={() => handleClick('enter')}
        >
          ENTER
        </button>
      )}
      {letters.split('').map((l: string) => (
        <button
          key={l}
          style={{ backgroundColor: setColour(l) }}
          className={styles.keyboardButton}
          onClick={() => handleClick(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
      {isLast && (
        <button
          className={styles.keyboardButton}
          onClick={() => handleClick('backspace')}
        >
          BACKSPACE
        </button>
      )}
    </div>
  );
};

export default KeyboardRow;
