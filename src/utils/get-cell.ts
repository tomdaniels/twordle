function getCell(attempt: string, history: string[]): HTMLElement | void {
  const row = history.length;
  const col = attempt.length;
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell) return cell;
}

export default getCell;
