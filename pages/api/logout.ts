import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // Clear the authentication cookie
  res.setHeader('Set-Cookie', 'auth=; Max-Age=0; Path=/; HttpOnly');

  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
