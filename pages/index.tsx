import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) { // Only redirect once the loading state is false
      if (user && user.username) {
        router.push('/user');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading]);

  return null; // You can return null or a loading spinner while redirecting
}
