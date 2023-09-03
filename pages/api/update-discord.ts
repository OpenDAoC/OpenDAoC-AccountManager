import { NextApiRequest, NextApiResponse } from 'next';
import connection from '@/utils/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { userId, discordId, discordName } = req.body;

  console.log("updating discord details for user", userId, "with discordId", discordId, "and discordName", discordName);

  connection.query('UPDATE account SET DiscordID = ?, DiscordName = ? WHERE Name = ?', [discordId, discordName, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    return res.status(200).json({ success: true, message: 'Discord details updated successfully' });
  });
}
