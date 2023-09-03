import { useUser } from '@/contexts/UserContext';

export default function UserProfile() {
  const { user } = useUser();

  const handleLinkDiscord = () => {
    window.location.href = '/api/auth/discord';
  };
  

  return (
      <div className="flex-grow flex flex-col justify-center items-center">
          <>
            <h1>Welcome, {user && user.username}!</h1>
            {user && user.discordName ? (
              <p className="text-sm">Discord: {user.discordName}</p>
            ) : (
              <button onClick={handleLinkDiscord} className="mt-4 bg-indigo-700 text-white px-4 py-2 rounded">
                Link Discord Account
              </button>
            )}
          </>
    </div>
  );
}
