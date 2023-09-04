import type { NextApiRequest, NextApiResponse } from "next";
import connection from '@/utils/db';
import getConfig from 'next/config'
import { containsProhibitedCharacters, cryptPassword } from '@/utils/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password, discordId, discordName } = req.body;

  const { publicRuntimeConfig } = getConfig();

  if (username.length === 0) {
    return res.status(200).json({ success: false, message: 'Username cannot be empty.' });
  }

  if (password.length < publicRuntimeConfig.MIN_PASSWORD_LENGTH || password.length > publicRuntimeConfig.MAX_PASSWORD_LENGTH) {
    return res.status(200).json({ success: false, message: `Password must be between ${publicRuntimeConfig.MIN_PASSWORD_LENGTH} and ${publicRuntimeConfig.MAX_PASSWORD_LENGTH} characters.` });
  }

  if (containsProhibitedCharacters(password)) {
    return res.status(200).json({ success: false, message: 'Password contains prohibited characters.' });
  }

  if (discordId.length === 0 || discordName.length === 0) {
    return res.status(200).json({ success: false, message: 'Error fetching Discord data.' });
  }

  // Check if the user already exists in the database
  connection.query('SELECT * FROM account WHERE Name = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(200).json({ success: false, message: 'Internal server error' });
    }

    if (Array.isArray(results) && results.length > 0) {
      return res.status(200).json({ success: false, message: 'Account already exists.' });
    } 
    else
     {
      const passwordHash = cryptPassword(password);
      // User doesn't exist, create a new account
      connection.query('INSERT INTO account (Account_ID, Name, Password, PrivLevel, CreationDate, LastTimeRowUpdated, DiscordID, DiscordName) VALUES (?, ?, ?, 1, NOW(), NOW(), ?, ?)', [username, username, passwordHash, discordId, discordName], (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(200).json({ success: false, message: 'Failed to create account' });
        }
        return res.status(200).json({ success: true, message: 'Account created successfully' });
      });
    }
  });
}
