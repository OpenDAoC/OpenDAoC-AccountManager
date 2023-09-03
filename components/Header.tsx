import Image from 'next/image';

import config from '../config';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

export default function Header() {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');
      if (response.data.success) {
        // Clear user context and redirect to home page
        setUser({ username: null, discordId: null, discordName: null });
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
  <header className="w-full flex justify-between items-center p-4 bg-gray-900 sticky top-0">
      <span className="logo flex items-center">
        <Image
          src={config.logoPath}
          alt={config.serverName + ' logo'}
          title={config.serverName + ' logo'}
          width="50"
          height="50"
          priority
        />
        <span className="ml-2 text-white font-bold">{config.siteTitle}</span>
      </span>
      {user && user.username && (
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      )}
    </header>
  );
}
