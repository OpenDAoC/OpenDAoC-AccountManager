import { NextApiRequest, NextApiResponse } from 'next';
import connection from '@/utils/db';
import config from '@/config';
import { containsProhibitedCharacters, cryptPassword } from '@/utils/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { userId, password, discordId, discordName } = req.body;

  if (userId.length === 0) {
    return res.status(200).json({ success: false, message: 'Username cannot be empty.' });
  }

  if (containsProhibitedCharacters(password)) {
    return res.status(200).json({ success: false, message: 'Password contains prohibited characters.' });
  }

  if (discordId.length < 1 || discordName.length < 1) {
    return res.status(200).json({ success: false, message: 'Error fetching Discord data.' });
  }

  const passwordHash = cryptPassword(password);

  connection.query('SELECT * FROM account WHERE Name = ? and Password = ?', [userId, passwordHash], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(200).json({ success: false, message: 'Internal server error' });
    }

    if (Array.isArray(results) && results.length === 0) {
      return res.status(200).json({ success: false, message: 'Account or password incorrect.' });
    } 
    else
    {
      connection.query('UPDATE account SET DiscordID = ?, DiscordName = ?, LastTimeRowUpdated = NOW() WHERE Name = ?', [discordId, discordName, userId], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(200).json({ success: false, message: 'Internal server error' });
        }

        return res.status(200).json({ success: true, message: 'Discord details updated successfully' });
      });
    }
  });
}
