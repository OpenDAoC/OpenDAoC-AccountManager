import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import { useEffect } from 'react';
import UserProfile from '@/components/UserProfile';
import Layout from '@/components/Layout';

export default function UserPage() {
    const { data: session, status } = useSession()
    const router = useRouter();
    
    const handleChangePasswordClick = () => {
      router.push('/change-password');
    };

  useEffect(() => {
      if (session && !session.user.opendaoc_name) {
        router.replace('/link-account');
      }

    }, [session, router]);

  return (
    <Layout>
    <div className='flex-grow flex flex-col justify-center items-center'>
      {session && session.user.discord_id && session.user.opendaoc_name && ( 
        <>
          <UserProfile />
          <button onClick={handleChangePasswordClick} className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded font-semibold">
            Change Password
          </button>
        </>
      )}
    </div>
    </Layout>
  );
}
