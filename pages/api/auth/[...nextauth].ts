import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import getConfig from 'next/config';
import {getAccountFromDiscord} from '@/utils/auth';

const { publicRuntimeConfig } = getConfig();

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: publicRuntimeConfig.DISCORD_CLIENT_ID,
      clientSecret: publicRuntimeConfig.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.access_token = token;
      session.user.discord_id = token.sub;
      session.user.discord_name = token.name;
      
      try
      {
        const username = await getAccountFromDiscord(token.sub);
        if (username !== null) {
          session.user.opendaoc_name = username;
        }
      } catch (error) {
        console.error("Error fetching account from Discord", error);
      }
   
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
