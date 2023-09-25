import crypto from 'crypto';
import getConfig from 'next/config';
import pool from '@/utils/db';
import mysql from 'mysql2';

const { publicRuntimeConfig } = getConfig();

function concatenateUint8Arrays(arr1: Uint8Array, arr2: Uint8Array): Uint8Array {
    const result = new Uint8Array(arr1.length + arr2.length);
    result.set(arr1, 0);
    result.set(arr2, arr1.length);
    return result;
}

export function cryptPassword(pass: string): string {
    const len: number = pass.length;
    let res: Uint8Array = new Uint8Array();

    for (let i = 0; i < len; i++) {
        res = concatenateUint8Arrays(res, new Uint8Array([
            pass.charCodeAt(i) >> 8,
            pass.charCodeAt(i)
        ]));
    }

    const hashBuffer: Buffer = crypto.createHash('md5')
        .update(Buffer.from(res))
        .digest();

    const hashHex: string = hashBuffer.toString('hex').toUpperCase();

    let cleanedHash: string = hashHex;
    const hashLen: number = hashHex.length;

    for (let i = (hashLen - 1) & ~1; i >= 0; i -= 2) {
        if (hashHex.charAt(i) === "0") {
            cleanedHash = cleanedHash.slice(0, i) + cleanedHash.slice(i + 1, hashLen);
        }
    }
    const crypted: string = "##" + cleanedHash;
    
    return crypted;
}

export function containsProhibitedCharacters(password: string): boolean {
    for (let char of publicRuntimeConfig.PROHIBITED_CHARACTERS) {
      if (password.includes(char)) {
        console.log ("Password contains prohibited character: " + char);
        return true;
      }
    }
    return false;
};

export function getAccountFromDiscord(discord_id: string | undefined): Promise<string | null> {
    return new Promise((resolve, reject) => {
        if (discord_id === undefined) {
            resolve(null);
            return;
        }

        // Check if the user already exists in the database
        pool.query('SELECT * FROM account WHERE DiscordID = ?', [discord_id], (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (Array.isArray(results) && results.length > 0) {
                const rows = results as mysql.RowDataPacket[];
                resolve(rows[0].Name);
            } else {
                // If the user doesn't exist, resolve with null
                resolve(null);
            }
        });
    });
}
