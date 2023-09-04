import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { publicRuntimeConfig } = getConfig();

  const REDIRECT_URI = encodeURIComponent(`${publicRuntimeConfig.siteUrl}/auth/discord-callback`);
  const SCOPES = encodeURIComponent('identify email');

  const discordAuthURL = `https://discord.com/api/oauth2/authorize?client_id=${publicRuntimeConfig.DISCORD_CLIENT_ID}&redirect_uri=${publicRuntimeConfig.REDIRECT_URI}&response_type=code&scope=${SCOPES}`;

  res.redirect(discordAuthURL);
}
