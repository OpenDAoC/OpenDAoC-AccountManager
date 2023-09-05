import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast';
import getConfig from 'next/config'

// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps<{ session: Session }>) {

  const { publicRuntimeConfig } = getConfig()

  return (
    <>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    <Toaster 
      position='bottom-center'
      toastOptions={{
        // Define default options
        className: '',
        duration: publicRuntimeConfig.toastDuration * 1000,
      }}
      />
    </>
  );
}
