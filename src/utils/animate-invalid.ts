import appendStyle from './append-style';
import animations from '../styles/Animations.module.css';

function animateInvalid(history: string[]): void {
  const row = document.getElementById(`row-${history.length}`);
  if (!row) return;
  appendStyle(row, animations.shake);

  setTimeout(() => {
    row.style.animationName = '';
    row.style.animationDuration = '';
    row.style.animationTimingFunction = '';
    row.classList.remove(animations.shake);
  }, 1000);
}

export default animateInvalid;
