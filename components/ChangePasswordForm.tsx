import { useState, useEffect } from 'react'; // <-- Add useEffect import
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react"

interface ChangePasswordFormProps {
  onPasswordChanged: () => void;
  onCancelClicked: () => void;
}

export default function ChangePasswordForm({ onPasswordChanged, onCancelClicked }: ChangePasswordFormProps) {
    const [newPassword, setNewPassword] = useState('');
    const [isChanging, setIsChanging] = useState(false);

    const { data: session } = useSession()


    const handleChangePassword = async () => {
        setIsChanging(true);

        const opendaoc_name = session?.user.opendaoc_name;

        fetch('/api/opendaoc/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: opendaoc_name, newPassword: newPassword }),  // TODO: replace with opendaoc_name
        })
        .then((response) => response.json())
        .then(data => {
            if (data.success) {
                toast.success(data.message);
                onPasswordChanged();
            } else {
                toast.error(data.message);
            }
          })

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
                    autoComplete='on'
                    value={newPassword} 
                    hidden={isChanging}
                    autoFocus
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
