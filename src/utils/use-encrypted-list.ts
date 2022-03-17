import { memoize } from 'lodash';
import decrypt from './decrypt';
import randomInt from './random-int';

const useEncryptedList = memoize((encrypted: string, existingSecret) => {
  const words = decrypt(encrypted);
  const secret = !!existingSecret
    ? decrypt(existingSecret)
    : words[randomInt(words.length)];
  return { words, secret };
});

export default useEncryptedList;
