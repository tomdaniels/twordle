import CryptoJS from 'crypto-js';

function encrypt(text: string): string {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
}

export default encrypt;
