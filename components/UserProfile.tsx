import { useUser } from '@/contexts/UserContext';

export default function UserProfile() {
  const { user } = useUser(); 

  return (
      <div className="flex-grow flex flex-col justify-center items-center">
          <>
            <h1 className="text-xl font-bold text-center text-white mb-4">Welcome, {user && user.username}!</h1>
              {user && user.discordId && user.discordName && (
                <span className="text-sm text-white">Discord: {user && user.discordName}</span>
              )}
          </>
    </div>
  );
}
