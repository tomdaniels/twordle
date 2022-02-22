import getCell from './get-cell';
import appendStyle from './append-style';
import animations from '../styles/Animations.module.css';

function animatePress(attempt: string, history: string[]): void {
  const cell = getCell(attempt, history);
  console.log(attempt, history);
  if (!cell) return;
  appendStyle(cell, animations.press);
  cell.style.border = '2px solid #666';

  setTimeout(() => {
    cell.style.animationName = '';
    cell.style.animationDuration = '';
    cell.style.animationTimingFunction = '';
    cell.classList.remove(animations.press);
  }, 100);
}

export default animatePress;
