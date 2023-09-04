import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
import UserProfile from '@/components/UserProfile';
import Layout from '@/components/Layout';

export default function UserPage() {
    const { user, loading } = useUser();
    const router = useRouter();

  useEffect(() => {
    if (!loading) { // Only run this effect when loading is false
      if (!user || !user.username) {
        router.replace('/login');
      }
    }
  }, [user, loading]);

  const handleChangePasswordClick = () => {
    router.push('/change-password');
  };

  return (
    <Layout>
    <div className='flex-grow flex flex-col justify-center items-center'>
      {user && user.username && (
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
