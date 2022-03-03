import { Dispatch, SetStateAction } from 'react';
import animateInvalid from './animate-invalid';

function handleInvalidEvent(
  text: string,
  history: string[],
  stack: Dispatch<SetStateAction<string[]>>
): void {
  stack((q) => q.concat(text));
  animateInvalid(history);
  setTimeout(() => {
    stack((q) => q.slice(0, q.length - 1));
  }, 1200);
}
export default handleInvalidEvent;
