import { GREEN, YELLOW, GREY } from '../constants';
import getBgColor from './get-bg-color';

function updateKeyboardAfterAnimation(
  nextHistory: string[],
  secret: string,
  cb: Function
): void {
  setTimeout(() => {
    cb(calculateBestColours(nextHistory, secret));
  }, 1250);
}

function calculateBestColours(
  history: string[],
  secret: string
): Map<string, string> {
  let map = new Map();
  for (let attempt of history) {
    for (let i = 0; i < attempt.length; i++) {
      let color = getBgColor(secret, attempt, i);
      let key = attempt[i];
      let bestColor = map.get(key);
      map.set(key, getBetterColour(color, bestColor));
    }
  }
  return map;
}

function getBetterColour(a: string, b: string): string {
  if (a === GREEN || b === GREEN) {
    return GREEN;
  }
  if (a === YELLOW || b === YELLOW) {
    return YELLOW;
  }
  return GREY;
}

export default updateKeyboardAfterAnimation;
