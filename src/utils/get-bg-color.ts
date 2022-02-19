function getBgColor(secret: string, attempt: string, i: number): string {
  let correctLetter = secret[i];
  let attemptLetter = attempt[i];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return '#212121';
  }
  if (correctLetter === attemptLetter) {
    return '#538d4e';
  }
  return '#b59f3b';
}

export default getBgColor;
