import type { NextApiRequest, NextApiResponse } from "next";
import connection from '@/utils/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, newPassword } = req.body;

  connection.query('UPDATE account SET Password = ? WHERE Name = ?', [newPassword, username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  });
}
