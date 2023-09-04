import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
import LoginForm from '@/components/LoginForm';
import Layout from '@/components/Layout';


export default function Login() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.username) {
      router.replace('/user');
    }
  }, [user]);

  return (
    <Layout>
        <LoginForm />
    </Layout>
  );
}
