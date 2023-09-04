import crypto from 'crypto';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const ENCRYPTION_KEY: string = publicRuntimeConfig.ENCRYPTION_KEY;
const IV_LENGTH: number = 16; 

function encrypt(text: string): string {
  const iv: Buffer = crypto.randomBytes(IV_LENGTH);
  const cipher: crypto.Cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted: Buffer = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string): string {
  const textParts: string[] = text.split(':');
  const iv: Buffer = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText: Buffer = Buffer.from(textParts.join(':'), 'hex');
  const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted: Buffer = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export { encrypt, decrypt };
