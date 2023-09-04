import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';

interface CreateAccountFormProps {
  onCreateSuccess: (username: string, discordId: string | null, discordName: string | null) => void;
  onCreateError: (message: string) => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onCreateSuccess, onCreateError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useUser();
  const discordId = user && user.discordId;
  const discordName = user && user.discordName;

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const response = await axios.post('/api/opendaoc/create-account', {
      username,
      password,
      discordId,
      discordName
    });

    const data = response.data;

    if (data.success) {
      onCreateSuccess(username, discordId, discordName);
    } else {
      onCreateError(data.message);
    }
  };

  return (
    <form onSubmit={handleCreateAccount}>
      <div className="form-group mb-4">
        <label className="block mb-2 text-white font-semibold">Username</label>
        <input
          type="text"
          name="username"
          placeholder='Username'
          autoComplete="on"
          className="form-control w-full p-2 border rounded bg-white text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mb-4">
        <label className="block mb-2 text-white font-semibold">Password</label>
        <input
          type="password"
          name="password"
          placeholder='Password'
          autoComplete="on"
          className="form-control w-full p-2 border rounded bg-white text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input type="submit" className="btn btn-primary w-full p-2 rounded bg-green-900 text-white hover:bg-green-600 cursor-pointer font-semibold" value="Create Account" />
      </div>
    </form>
  );
};
