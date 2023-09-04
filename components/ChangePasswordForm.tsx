import { useState, useEffect } from 'react'; // <-- Add useEffect import
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { toast } from "react-hot-toast";


interface ChangePasswordFormProps {
  onPasswordChanged: () => void;
  onCancelClicked: () => void;
}

export default function ChangePasswordForm({ onPasswordChanged, onCancelClicked }: ChangePasswordFormProps) {
    const [newPassword, setNewPassword] = useState('');
    const [isChanging, setIsChanging] = useState(false);
    const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(null); // New state for the timeout
    const { user } = useUser();

    useEffect(() => {
        return () => {
            // Cleanup the timeout when the component is unmounted
            if (messageTimeout) {
                clearTimeout(messageTimeout);
            }
        };
    }, [messageTimeout]);


    const handleChangePassword = async () => {
        setIsChanging(true);
        const response = await axios.post('/api/opendaoc/update-password', { username: user && user.username, newPassword });
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
        setIsChanging(false); // Reset the changing state
    };

    return (
      <>
        <h1 className="text-xl font-bold text-center text-white mb-4">Change Password</h1>
        <div className="bg-dark p-6 rounded-lg shadow-md w-full max-w-md">
            <form>
                <input 
                    type="password" 
                    placeholder="New Password" 
                    value={newPassword} 
                    hidden={isChanging}
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="border p-3 rounded text-black mb-4 w-full"
                />
                <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangePassword();
                    }} 
                    className={`mt-2 px-4 py-2 rounded w-full mb-2 ${isChanging ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300'} text-black font-semibold`} 
                    hidden={isChanging}
                >
                    Update Password
                </button>
                <button 
                      onClick={(e) => {
                        e.preventDefault();
                        onCancelClicked();
                      }} 
                    hidden={isChanging}
                    className="mt-2 px-4 py-2 rounded w-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 text-black font-semibold"
                >
                    Cancel
                </button>
            </form>
        </div>
      </>
    );
}
