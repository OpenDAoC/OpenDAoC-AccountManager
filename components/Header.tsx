import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import getConfig from 'next/config'
import { signOut, useSession } from "next-auth/react"

export default function Header() {
  const { publicRuntimeConfig } = getConfig()

  const { data: session } = useSession()

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--foreground-color', publicRuntimeConfig.theme.foreground);
    root.style.setProperty('--background-light', publicRuntimeConfig.theme.backgroundLight);
    root.style.setProperty('--background-dark', publicRuntimeConfig.theme.backgroundDark);
  }, [publicRuntimeConfig.theme]);


  const handleLogout = async () => {
    signOut()
  };

  return (
  
  <header className="w-full flex justify-between items-center p-4 sticky top-0">
      <span className="logo flex items-center">
        <Link href="/">
          <Image
            loader={()=>publicRuntimeConfig.logoPath }
            src={publicRuntimeConfig.logoPath}
            alt={publicRuntimeConfig.serverName + ' logo'}
            title={publicRuntimeConfig.serverName + ' logo'}
            width="50"
            height="50"
            priority
            unoptimized
          />
         </Link>
         <Link href="/">
          <span className="ml-2 text-white font-bold text-xl">{publicRuntimeConfig.siteTitle}</span>
          </Link>
      </span>
            {session && (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold">
                Logout
              </button>
            )}
    </header>
  
  );
}
