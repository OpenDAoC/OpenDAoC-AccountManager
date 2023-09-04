import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../contexts/UserContext';
import { Toaster } from 'react-hot-toast';
import getConfig from 'next/config'

export default function App({ Component, pageProps }: AppProps) 
{
  const { publicRuntimeConfig } = getConfig()
  
  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
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
