import { memoize } from 'lodash';
import decrypt from './decrypt';
import randomInt from './random-int';

const useEncryptedList = memoize((encrypted: string) => {
  const words = decrypt(encrypted);
  const secret = words[randomInt(words.length)];
  return { words, secret };
});

export default useEncryptedList;
