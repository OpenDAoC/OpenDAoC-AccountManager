import { NextApiRequest, NextApiResponse } from 'next';
import { siteUrl, DISCORD_CLIENT_ID} from '@/config';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const REDIRECT_URI = encodeURIComponent(`${siteUrl}/auth/discord-callback`);
  const SCOPES = encodeURIComponent('identify email');

  const discordAuthURL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`;

  res.redirect(discordAuthURL);
}
