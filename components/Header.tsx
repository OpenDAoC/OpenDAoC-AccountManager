import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
import { removeCookie } from '@/utils/cookie';
import config from '@/config';
import axios from 'axios';

export default function Header() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/logout');
      if (response.data.success) {
        // Clear user context and redirect to home page
        setUser({ username: null, discordId: null, discordName: null });
        removeCookie();
        router.push('/');
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
  <header className="w-full flex justify-between items-center p-4 bg-gray-900 sticky top-0">
      <span className="logo flex items-center">
        <Link href="/">
          <Image
            src={config.logoPath}
            alt={config.serverName + ' logo'}
            title={config.serverName + ' logo'}
            width="50"
            height="50"
            priority
          />
         </Link>
         <Link href="/">
          <span className="ml-2 text-white font-bold text-xl">{config.siteTitle}</span>
          </Link>

      </span>
      {user && user.discordName && (
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold">
          Logout
        </button>
      )}
    </header>
  );
}
