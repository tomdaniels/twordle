import { GREEN, YELLOW, GREY } from '../constants';

function getBgColor(secret: string, attempt: string, i: number): string {
  let correctLetter = secret[i];
  let attemptLetter = attempt[i];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return GREEN;
  }
  if (correctLetter === attemptLetter) {
    return YELLOW;
  }
  return GREY;
}

export default getBgColor;
