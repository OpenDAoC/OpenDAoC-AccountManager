import { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { decrypt } from '@/utils/cookie-crypto';
import Cookie from 'js-cookie';

interface User {
  username: string | null;
  discordId: string | null;
  discordName: string | null;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({ username: null, discordId: null, discordName: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCookie = Cookie.get('auth');
    if (authCookie) {
      const decryptedData = decrypt(authCookie);
      const userData = JSON.parse(decryptedData);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
