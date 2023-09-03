import Header from './Header';
import Footer from './Footer';
import Head from 'next/head'; // <-- Import the Head component
import config from '../config'; // <-- Import your config if it's not already imported

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col justify-between w-full">
      <Head>
        <title>{config.siteTitle}</title>
      </Head>
      <Header />
      <div className="flex flex-col items-center">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
