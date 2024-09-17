import React, { useEffect, useState } from 'react';
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { ref, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase/firebase'; // Certifique-se de importar o storage
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirecionamento
import { authenticate } from '../firebase/auth';

export default function Profile () {
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const [user, setUser] = useState({});
  const [showData, setShowData] = useState(false);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState(''); // Para o novo password
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false); // Para controlar a exibição do campo de nova senha
  const navigate = useNavigate(); // Hook de navegação

  useEffect(() => {
    const authUser = async () => {
      const data = await authenticate();
      if (data.email) {
        setUser(data);
        setShowData(true);
      }
      else navigate('/login');
    }
    authUser();
    // const auth = getAuth();
    // const currentUser = auth.currentUser;

    // if (currentUser) {
    //   setUser(currentUser);
    //   if (currentUser.photoURL) {
    //     // Se o usuário tiver uma foto de perfil, obtenha a URL
    //     setProfilePhotoURL(currentUser.photoURL);
    //   } else {
        // Se não, obtenha a URL da foto de perfil armazenada
        // const photoRef = ref(storage, `imgProfile/${currentUser.uid}`);
        // getDownloadURL(photoRef)
        //   .then((url) => setProfilePhotoURL(url))
        //   .catch((err) => setError('Falha ao carregar foto de perfil'));
    //   }
    // }
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Faz o logout
      navigate('/login'); // Redireciona para a página de login
    } catch (error) {
      setError('Erro ao fazer logout');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await updatePassword(currentUser, newPassword);
        setNewPassword('');
        setPasswordError('');
        setError('Senha alterada com sucesso!');
        setShowPasswordChange(false); // Ocultar o campo de nova senha após a alteração
      } catch (error) {
        setPasswordError('Erro ao alterar senha. Verifique a nova senha.');
        setError('');
      }
    }
  };

  if (!user.name) return <p>Carregando...</p>;
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        { showData ?
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <div className="flex flex-col items-center">
              <img
                src={user.imageProfile}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h2 className="text-2xl font-semibold mb-2">{user.name || 'Nome não definido'}</h2>
              <p className="text-gray-600">{user.email}</p>
              {/* Formulário para alteração de senha */}
              {showPasswordChange ? (
                <form onSubmit={handlePasswordChange} className="mt-6 w-full">
                  <div>
                    <label className="block text-sm font-medium">Nova Senha</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Alterar Senha
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Alterar Senha
                </button>
              )}
              {/* Botão de Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          : <div>Carregando</div>
        }
      </div>
  );
};
