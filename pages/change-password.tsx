import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import Layout from '@/components/Layout';

export default function ChangePasswordPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) { // Only run this effect when loading is false
      if (!user || !user.username) {
        router.push('/login');
      }
    }
  }, [user, loading]);
  

  const handlePasswordChanged = () => {
    router.push('/');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <Layout>
        <div>
            {user && user.username && <ChangePasswordForm onPasswordChanged={handlePasswordChanged} onCancelClicked={handleCancel} />}
        </div>
    </Layout>
  );
}
