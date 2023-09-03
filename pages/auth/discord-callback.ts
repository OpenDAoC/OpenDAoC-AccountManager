import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';
import { siteUrl, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '@/config';
import Cookie from 'js-cookie';
import { decrypt, encrypt } from '@/utils/cookie-crypto';

const DiscordCallback = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    const code = router.query.code;

    if (!code) {
      router.push('/login'); // Redirect to login page
      return;
    }

    const fetchDiscordData = async () => {
      try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
          client_id: DISCORD_CLIENT_ID,
          client_secret: DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: code as string,
          redirect_uri: `${siteUrl}/auth/discord-callback`,
          scope: 'identify email',
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`
          }
        });

        const discordData = userResponse.data;

        // Extract the necessary data from discordData
        const discordId = discordData.id;
        const discordName = `${discordData.username}`;

        if (!user) {
          router.push('/login'); // Redirect to login page
          return;
        }

        const userId = user.username;

        // Call the /api/update-discord endpoint
        const updateResponse = await axios.post('/api/update-discord', {
          userId,
          discordId,
          discordName
        });

        if (updateResponse.data.success) {          

          // Update the user context
          setUser({ username: userId, discordId: discordId, discordName: discordName });

          // Update the user cookie
          const existingUserData = Cookie.get('auth');
          if (existingUserData) {
            const decryptedData = decrypt(existingUserData);
            const currentUserData = JSON.parse(decryptedData);
            const newUserData = { ...currentUserData, discordId, discordName };
            const encryptedData = encrypt(JSON.stringify(newUserData));
            Cookie.set('auth', encryptedData);
          }
          
        } 
        else 
        {
          console.error("Failed to update Discord details:", updateResponse.data.message);
        }
      
        router.push('/');

      } catch (error) {
        console.error('Error during Discord OAuth:', error);
        router.push('/');
      }
    };

    fetchDiscordData();
  }, [router.query]);

};

export default DiscordCallback;
