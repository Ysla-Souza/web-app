import React, { useEffect, useState } from 'react';
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../firebase/auth';
import PasswordChangeModal from '../components/PasswordChangeModal'; // Ajuste o caminho se necessário

const Profile = () => {
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const [user, setUser] = useState({});
  const [showData, setShowData] = useState(false);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      try {
        const data = await authenticate();
        if (data.email) {
          setUser(data);
          setShowData(true);
          console.log('Dados do usuário:', data);

          if (data.imageProfile) {
            const storageRef = ref(getStorage(), `profile_images/${data.imageProfile}`);
            const url = await getDownloadURL(storageRef);
            setProfilePhotoURL(url);
          }
        } else {
          navigate('/login');
        }
      } catch (err) {
        setError('Falha ao carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };
    authUser();
  }, [navigate]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      setError('Erro ao fazer logout');
    }
  };

  const handlePasswordChange = async (newPassword) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await updatePassword(currentUser, newPassword);
        setNewPassword('');
        setPasswordError('');
        setError('Senha alterada com sucesso!');
        setShowPasswordChange(false);
      } catch (error) {
        setPasswordError('Erro ao alterar senha. Verifique a nova senha.');
        setError('');
      }
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      {showData ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <div className="flex flex-col items-center">
            <img
              src={profilePhotoURL || user.imageProfile}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <h2 className="text-2xl font-semibold mb-2">
              {user.name || 'Nome não definido'}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <button
              onClick={() => setShowPasswordChange(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Alterar Senha
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>Carregando dados do usuário...</div>
      )}
      {showPasswordChange && (
        <PasswordChangeModal 
          onClose={() => setShowPasswordChange(false)} 
          onConfirm={handlePasswordChange} 
        />
      )}
    </div>
  );
};

export default Profile;
