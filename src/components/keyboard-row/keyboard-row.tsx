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
    <div className={styles.keyboardRow}>
      {isLast && (
        <button
          className={styles.keyboardButton}
          style={{ width: 'auto', padding: '0 12px' }}
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
          {l}
        </button>
      ))}
      {isLast && (
        <button
          className={styles.keyboardButton}
          style={{ width: 'auto', padding: '0 12px' }}
          onClick={() => handleClick('backspace')}
        >
          BACKSPACE
        </button>
      )}
    </div>
  );
};

export default KeyboardRow;
