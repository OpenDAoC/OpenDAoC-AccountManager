import { useRouter } from 'next/router';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import Layout from '@/components/Layout';
import { useSession } from "next-auth/react"

export default function ChangePasswordPage() {
  const router = useRouter();
  const { data: session } = useSession()
  
  const handlePasswordChanged = () => {
    router.push('/');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <Layout>
        <div>
            {session && session.user.opendaoc_name && <ChangePasswordForm onPasswordChanged={handlePasswordChanged} onCancelClicked={handleCancel} />}
        </div>
    </Layout>
  );
}
