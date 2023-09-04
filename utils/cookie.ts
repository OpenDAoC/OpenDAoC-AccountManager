import { encrypt, decrypt } from '@/utils/cookie-crypto';

const cookieName = 'auth';

export function setCookie(data: any) {
    const encryptedData = encrypt(JSON.stringify(data));
   
    // Set the cookie
    document.cookie = `${cookieName}=${encryptedData}; max-age=${60 * 60 * 24 * 7}; path=/; samesite=strict; ${process.env.NODE_ENV !== 'development' ? 'secure' : ''}`;
}

export function getCookie() {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(cookie => cookie.startsWith(cookieName));

    if (!cookie) {
        return null;
    }

    const cookieValue = cookie.split('=')[1];
    const decryptedData = decrypt(cookieValue);

    return JSON.parse(decryptedData);
}

export function removeCookie() {
    document.cookie = `${cookieName}=; max-age=0; path=/; samesite=strict; ${process.env.NODE_ENV !== 'development' ? 'secure' : ''}`;
}