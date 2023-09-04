import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../contexts/UserContext';
import { Toaster } from 'react-hot-toast';
import config from '@/config';

export default function App({ Component, pageProps }: AppProps) {
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
        duration: config.toastDuration * 1000,
      }}
      />
    </>
  );
}
