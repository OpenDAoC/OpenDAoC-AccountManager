import Header from './Header';
import Footer from './Footer';
import Head from 'next/head'; 
import getConfig from 'next/config'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { publicRuntimeConfig } = getConfig()

  return (
    <div className="flex min-h-screen flex-col justify-between w-full">
      <Head>
        <title>{publicRuntimeConfig.siteTitle}</title>
        <meta name="description" content={publicRuntimeConfig.siteDescription} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <div className="flex flex-col items-center">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
