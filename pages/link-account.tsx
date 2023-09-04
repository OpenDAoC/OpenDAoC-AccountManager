import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
import Layout from '@/components/Layout';
import { LinkAccountForm } from '@/components/LinkAccountForm';
import { CreateAccountForm } from '@/components/CreateAccountForm';
import { setCookie } from '@/utils/cookie';
import { serverName } from '@/config';
import { toast } from 'react-hot-toast';

export default function LinkAccount() {
  const [activeSection, setActiveSection] = useState<'link' | 'create'>('link');
  const { setUser } = useUser();
  const router = useRouter();

  const handleCreateSuccess = (username: string, discordId: string | null, discordName: string | null) => {
    toast.success("Account created and linked successfully!");
    handleSuccess(username, discordId, discordName);
  };

  const handleLinkSuccess = (username: string, discordId: string | null, discordName: string | null) => {
    toast.success("Account linked successfully!");
    handleSuccess(username, discordId, discordName);
  };

  const handleSuccess = (username: string, discordId: string | null, discordName: string | null) => {
    const userData = { username, discordId, discordName };
    setUser(userData); // Set the user data in the context
    setCookie(userData); // Set the cookie
    router.push('/'); // Redirect to the home page
  };

  const handleError = (errorMessage: string) => {
    toast.error(errorMessage);
  };

  return (
    <Layout>
    <h2 className="text-xl font-bold text-center text-white mb-4">Link or Create your {serverName} Account</h2>
    <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">


      {/* Tabs */}
      <div className="mb-4 flex justify-center items-center">
        <button
          onClick={() => setActiveSection('link')}
          className={`ml-2 py-2 px-4 font-semibold ${activeSection === 'link' ? 'border-b-2 border-yellow-500' : 'text-gray-500 hover:text-white'}`}
        >
          Link Existing Account
        </button>
        <button
          onClick={() => setActiveSection('create')}
          className={`ml-2 py-2 px-4 font-semibold ${activeSection === 'create' ? 'border-b-2 border-yellow-500' : 'text-gray-500 hover:text-white'}`}
        >
          Create New Account
        </button>
      </div>

      {/* Display LinkAccount Form */}
      <div className={`transition-opacity duration-500 ${activeSection === 'link' ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <LinkAccountForm onLinkSuccess={handleLinkSuccess} onLinkError={handleError} />
      </div>

      {/* Display Create New Account Form */}
      <div className={`transition-opacity duration-500 ${activeSection === 'create' ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <CreateAccountForm onCreateSuccess={handleCreateSuccess} onCreateError={handleError} />
      </div>
    </div>
  </Layout>
  );
}
