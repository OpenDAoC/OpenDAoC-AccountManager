import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession()

  useEffect(() => {
      if (session) {
        router.replace('/user');
      } 
      else {
        router.replace('/login');
      }
    }, [session, router]);


  return null; // You can return null or a loading spinner while redirecting
}