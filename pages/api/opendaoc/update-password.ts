import type { NextApiRequest, NextApiResponse } from "next";
import pool from '@/utils/db';
import { containsProhibitedCharacters, cryptPassword } from '@/utils/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, newPassword } = req.body;

  if (username.length < 3) {
    return res.status(200).json({ success: false, message: 'Account not found.' });
  }

  if (newPassword.length < 6 || newPassword.length > 15) {
    return res.status(200).json({ success: false, message: 'Password must be between 6 and 15 characters.' });
  }

  if (containsProhibitedCharacters(newPassword)) {
    return res.status(200).json({ success: false, message: 'Password contains prohibited characters.' });
  }

  const passwordHash = cryptPassword(newPassword);

  pool.query('UPDATE account SET Password = ? WHERE Name = ?', [passwordHash, username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(200).json({ success: false, message: 'Internal server error' });
    }

    return res.status(200).json({ success: true, message: 'Password updated successfully!' });
  });
}
