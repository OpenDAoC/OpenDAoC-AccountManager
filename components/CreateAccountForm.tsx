import { useState } from 'react';
import { useSession } from "next-auth/react"

interface CreateAccountFormProps {
  onCreateSuccess: () => void;
  onCreateError: (message: string) => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onCreateSuccess, onCreateError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession()

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/opendaoc/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password: password, discordId: session?.user.discord_id, discordName: session?.user.discord_name }),
    })
    .then((response) => response.json())
    .then(data => {
        if (data.success) {
            onCreateSuccess();
        } else {
            onCreateError(data.message);
        }})
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
          autoFocus
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
