import React from 'react';
import { withMedia } from 'react-media-query-hoc';

import styles from '../../styles/Keyboard.module.css';

type Media = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  largeDesktop: boolean;
};

type KeyboardRowProps = {
  setColour: Function;
  handleClick: Function;
  letters: string;
  isLast?: boolean;
  media: Media;
};

const KeyboardRow: React.FC<KeyboardRowProps> = ({
  setColour,
  handleClick,
  letters,
  isLast = false,
  media,
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
          {media.mobile ? 'DEL' : 'BACKSPACE'}
        </button>
      )}
    </div>
  );
};

export const BaseKeyboardRow = KeyboardRow;
export default withMedia(BaseKeyboardRow);
