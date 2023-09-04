import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';

interface LinkAccountFormProps {
  onLinkSuccess: (username: string, discordId: string | null, discordName: string | null) => void;
  onLinkError: (message: string) => void;
}

export const LinkAccountForm: React.FC<LinkAccountFormProps> = ({ onLinkSuccess, onLinkError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useUser();
  const discordId = user && user.discordId;
  const discordName = user && user.discordName;

  const handleLinkAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await axios.post('/api/opendaoc/link-account', {
      userId: username,
      password,
      discordId,
      discordName
    });

    const data = response.data;

    if (data.success) {
      onLinkSuccess(username, discordId, discordName);
    } else {
      onLinkError(data.message);
    }
  };

  return (
    <form onSubmit={handleLinkAccount}>
      <div className="form-group mb-4">
        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          autoComplete="on"
          className="form-control w-full p-2 border rounded bg-white text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mb-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="on"
          className="form-control w-full p-2 border rounded bg-white text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input type="submit" className="btn btn-primary w-full p-2 rounded bg-blue-900 text-white hover:bg-blue-600 cursor-pointer" value="Link Account" />
      </div>
    </form>
  );
};
