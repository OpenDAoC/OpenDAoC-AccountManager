import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
import { setCookie } from '@/utils/cookie';
import getConfig from 'next/config'
import axios from 'axios';
import toast from 'react-hot-toast';

const DiscordCallback = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const { publicRuntimeConfig } = getConfig();


  useEffect(() => {
    const code = router.query.code;

    if (!code) {
      router.replace('/login'); // Redirect to login page
      return;
    }

    const fetchDiscordData = async () => {
      try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
          client_id: publicRuntimeConfig.DISCORD_CLIENT_ID,
          client_secret: publicRuntimeConfig.DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: code as string,
          redirect_uri: `${publicRuntimeConfig.siteUrl}/auth/discord-callback`,
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
        const discordId = discordData.id;
        const discordName = `${discordData.username}`;

        // Check if the Discord ID exists in your database
        const checkResponse = await axios.post('/api/opendaoc/check-discord', { discordId });

        if (checkResponse.data.success) {
          // If the Discord ID exists, log the user in and update the context
          const responseUsername = checkResponse.data.username;
          const userData = { username: responseUsername, discordId, discordName };

          // Update the context and cookie
          setUser(userData);
          setCookie(userData);

          // Redirect to home page
          router.push('/');
          toast.success(`Welcome back, ${responseUsername}!`);
        } 
        else
        {
          const userData = { username: null, discordId, discordName };
          
          // Update the context and cookie
          setUser(userData);
          setCookie(userData);

          // Redirect to link account page
          router.push('/link-account');
          toast.success(`Logged in with Discord. \n Please link or create your ${publicRuntimeConfig.serverName} account.`)
        }

      } catch (error) {
        console.error('Error during Discord OAuth:', error);
        router.push('/');
      }
    };

    fetchDiscordData();
  }, [router.query]);

};

export default DiscordCallback;
