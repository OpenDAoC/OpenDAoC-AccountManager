import getConfig from 'next/config'
import { signIn } from 'next-auth/react';

export default function LoginForm() {

  const handleDiscordLogin = () => {
    signIn('discord');
  };

  const { publicRuntimeConfig } = getConfig();

  return (
    <>
    <h1 className="text-xl font-bold text-center text-white mb-4">Login to manage your {publicRuntimeConfig.serverName} account</h1>

    <div className="bg-dark p-6 rounded-lg shadow-md w-full max-w-md">
      <button onClick={handleDiscordLogin} className="w-full p-2 rounded bg-indigo-700 text-white hover:bg-indigo-600 cursor-pointer font-semibold">
        Login with Discord
      </button>
    </div>
    </>
  );
}
