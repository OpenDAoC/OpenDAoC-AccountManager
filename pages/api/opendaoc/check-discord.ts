import type { NextApiRequest, NextApiResponse } from "next";
import connection from '@/utils/db';
import mysql from 'mysql2';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { discordId } = req.body;

  // Check if the user already exists in the database
  connection.query('SELECT * FROM account WHERE DiscordID = ?', [discordId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(200).json({ success: false, message: 'Internal server error' });
    }

    if (Array.isArray(results) && results.length > 0) {
        // If the user exists, return true
        const rows = results as mysql.RowDataPacket[];
        return res.status(200).json({ success: true, username: rows[0].Name });
    } else {
        // If the user doesn't exist, return false
        return res.status(200).json({ success: false });
    }
  });
}
