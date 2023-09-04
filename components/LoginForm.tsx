import { useRouter } from 'next/router';

export default function LoginForm() {
  const router = useRouter();
  const handleDiscordLogin = () => {
    router.push('/api/auth/discord'); // Redirect to initiate the Discord OAuth2 flow
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
      <button onClick={handleDiscordLogin} className="w-full p-2 rounded bg-indigo-700 text-white hover:bg-indigo-600 cursor-pointer font-semibold">
        Login with Discord
      </button>
    </div>
  );
}
