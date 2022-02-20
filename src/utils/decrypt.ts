import CryptoJS from 'crypto-js';
import { memoize } from 'lodash';

const decrypt = memoize((hash: string): string => {
  const decrypted = CryptoJS.enc.Base64.parse(hash).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
});

export default decrypt;
