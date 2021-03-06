import getBgColor from './get-bg-color';
import appendStyle from './append-style';

import animations from '../styles/Animations.module.css';

const animateReveal = (secret: string, guess: string, idx: number): void => {
  const row = document.getElementById(`row-${idx}`);
  if (!row) return;
  const letters = row.childNodes as NodeListOf<HTMLElement>;
  for (let i = 0; i < guess.length; i++) {
    let bgColor = getBgColor(secret, guess, i);
    setTimeout(() => {
      appendStyle(letters[i], animations.reveal);
      setTimeout(() => {
        letters[i].setAttribute(
          'style',
          `background-color: ${bgColor}; border: 2px solid ${bgColor}`
        );
      }, 125);
    }, i * 250);
  }
};

export default animateReveal;
