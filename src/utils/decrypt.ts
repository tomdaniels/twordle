import CryptoJS from 'crypto-js';
import { memoize } from 'lodash';

const decrypt = memoize((hash: string): string => {
  const decrypted = CryptoJS.enc.Base64.parse(hash).toString(CryptoJS.enc.Utf8);
  try {
    const result = JSON.parse(decrypted);
    return result;
  } catch (error) {
    return decrypted;
  }
});

export default decrypt;
