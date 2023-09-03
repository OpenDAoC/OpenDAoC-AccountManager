import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext'; // Import the context

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loginClass, setLoginClass] = useState('');
  const { setUser } = useUser(); // Get the setUser function from the context

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/login', { username, password });
      const data = response.data;
  
      if (data.success) {
        setLoginMessage(data.message);
        setLoginClass('text-green-500 text-center mt-4');
        setUser({ username, discordId: data.discordId, discordName: data.discordName });
      }      
    } catch (error) {
      setLoginClass('text-red-500 text-center mt-4');
      setLoginMessage('Invalid username or password');
    }
  }

  return (
    <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
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
      {/* Display errors if any */}
    </div>
    <div className="form-group mb-4">
      <label className="block mb-2">Password</label>
      <input
        type="password"
        name="password"
        autoComplete='on'
        className="form-control w-full p-2 border rounded bg-white text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Display errors if any */}
    </div>
    <div className="form-group">
    <input type="submit" className="btn btn-primary w-full p-2 rounded bg-green-900 text-white hover:bg-green-600 cursor-pointer" value="Login" />
    </div>
    {loginMessage && <p className={loginClass}>{loginMessage}</p>}
  </form>
  );
}
