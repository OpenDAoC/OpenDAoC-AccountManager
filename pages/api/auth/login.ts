import type { NextApiRequest, NextApiResponse } from "next";
import { cryptPassword } from '@/utils/auth';
import connection from '@/utils/db';
import { encrypt } from '@/utils/cookie-crypto';
import mysql from 'mysql2';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;
  const encryptedPassword = cryptPassword(password);

  connection.query('SELECT * FROM account WHERE name = ? AND password = ?', [username, encryptedPassword], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    const rows = results as mysql.RowDataPacket[];

    if (rows && rows.length > 0) {
        const user = rows[0];
        const discordId = user.DiscordID; 
        const discordName = user.DiscordName;
        const userData = { username, discordId, discordName };
        const encryptedData = encrypt(JSON.stringify(userData));
        // User found and authenticated
        const userCookie = serialize('auth', (encryptedData), {
          httpOnly: false,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        });

        res.setHeader('Set-Cookie', userCookie);
        return res.status(200).json({ success: true, message: 'Logged in successfully', discordId, discordName });
    } else {
      // No user found or wrong credentials
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
}
