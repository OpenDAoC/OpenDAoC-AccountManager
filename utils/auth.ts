import crypto from 'crypto';

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