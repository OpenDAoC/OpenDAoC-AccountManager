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
        console.log("user: " + JSON.stringify(user));
        router.push('/login');
      }
    }
  }, [user, loading]);

  const handleChangePasswordClick = () => {
    router.push('/change-password');
  };

  return (
    <Layout>
    <div>
      {user && user.username && (
        <>
          <UserProfile />
          <button onClick={handleChangePasswordClick} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
            Change Password
          </button>
        </>
      )}
    </div>
    </Layout>
  );
}
