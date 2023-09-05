import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DiscordLoginForm from '@/components/DiscordLoginForm';
import Layout from '@/components/Layout';


export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session) { 
        router.replace('/user');
    }
  }, [session, router]);

  return (
    <Layout>
        <DiscordLoginForm />
    </Layout>
  );
}
