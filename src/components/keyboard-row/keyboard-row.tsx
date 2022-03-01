import React from 'react';

import styles from '../../styles/Keyboard.module.css';

type KeyboardRowProps = {
  letters: string;
  isLast?: boolean;
};

const KeyboardRow: React.FC<KeyboardRowProps> = ({
  letters,
  isLast = false,
}) => {
  return (
    <div className={styles.keyboard}>
      {isLast && <button className={styles.keyboardButton}>Enter</button>}
      {letters.split('').map((l: string) => (
        <button key={l} className={styles.keyboardButton}>
          {l}
        </button>
      ))}
      {isLast && <button className={styles.keyboardButton}>Backspace</button>}
    </div>
  );
};

export default KeyboardRow;
