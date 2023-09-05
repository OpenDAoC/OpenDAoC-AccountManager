import getConfig from 'next/config'
import { toast } from 'react-hot-toast';
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { LinkAccountForm } from '@/components/LinkAccountForm';
import { CreateAccountForm } from '@/components/CreateAccountForm';


export default function LinkAccount() {
  const [activeSection, setActiveSection] = useState<'link' | 'create'>('link');
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig()
  const { data: session } = useSession()
  
  useEffect(() => {
    if (session && session.user.opendaoc_name) {
      router.replace('/user');
    }}, [session, router]);

  const handleCreateSuccess = async () => {
    window.location.href = '/user';
    toast.success("Account created and linked successfully!");
  };

  const handleLinkSuccess = async () => {
    window.location.href = '/user';
    toast.success("Account linked successfully!");
  };

  const handleError = (errorMessage: string) => {
    toast.error(errorMessage);
  };

  return (
    <Layout>
    <h1 className="text-xl font-bold text-center text-white mb-4">Link or Create your {publicRuntimeConfig.serverName} Account</h1>
    <div className="bg-dark p-6 rounded-lg shadow-md w-full max-w-md">


      {/* Tabs */}
      <div className="mb-4 flex justify-center items-center">
        <button
          onClick={() => setActiveSection('link')}
          className={`ml-2 py-2 px-4 font-semibold ${activeSection === 'link' ? 'border-b-2 border-yellow-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Link Existing Account
        </button>
        <button
          onClick={() => setActiveSection('create')}
          className={`ml-2 py-2 px-4 font-semibold ${activeSection === 'create' ? 'border-b-2 border-yellow-500 text-white' : 'text-slate-400 hover:text-white'}`}
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
