import { useState } from 'react';
import axios from 'axios';
import { cryptPassword } from '@/utils/auth';
import { useUser } from '@/contexts/UserContext';
import { PROHIBITED_CHARACTERS } from '@/config';

interface ChangePasswordFormProps {
  onPasswordChanged: () => void;
  onCancelClicked: () => void;
}

export default function ChangePasswordForm({ onPasswordChanged, onCancelClicked }: ChangePasswordFormProps) {
    const [newPassword, setNewPassword] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [isChanging, setIsChanging] = useState(false); // State to track if the request is in progress
    const { user } = useUser();

    let lastProhibitedCharacter = '';

    const containsProhibitedCharacters = (password: string) => {
      for (let char of PROHIBITED_CHARACTERS) {
        if (password.includes(char)) {
          lastProhibitedCharacter = char;
          return true;
        }
      }
      return false;
    };
  
    const handleChangePassword = async () => {
      if (containsProhibitedCharacters(newPassword)) {
        setFeedbackMessage('Password contains prohibited character: ' + lastProhibitedCharacter);
        return;
      }

      setIsChanging(true);
      const encryptedPassword = cryptPassword(newPassword);
      try {
        const response = await axios.post('/api/update-password', { username: user && user.username, newPassword: encryptedPassword });
        if (response.data.success) {
          setFeedbackMessage('Password changed successfully!');
          setTimeout(() => {
            onPasswordChanged();
          }, 2500);
        } else {
          setFeedbackMessage('Failed to change password. Please try again.');
        }
      } catch (error) {
        console.error("Failed to change password:", error);
        setFeedbackMessage('An error occurred. Please try again later.');
      } 
    };

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-center text-xl font-semibold mb-4">Change Password</h1>
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
                    className={`mt-2 px-4 py-2 rounded w-full mb-2 ${isChanging ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300'} text-black`} 
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
                    className="mt-2 px-4 py-2 rounded w-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 text-black"
                >
                    Cancel
                </button>
            </form>
            {feedbackMessage && 
                <p className={`mt-4 text-center ${feedbackMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {feedbackMessage}
                </p>
            }
        </div>
    );
}
