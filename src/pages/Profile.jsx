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
  const [cartItems, setCartItems] = useState([]);

  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('perfil');
  // Estados para informações de endereço
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      try {
        const data = await authenticate();
        if (data.email) {
          setUser(data);
          setShowData(true);
          setAddressLine1(data.addressLine1 || '');
          setAddressLine2(data.addressLine2 || '');
          setCity(data.city || '');
          setState(data.state || '');
          setPostalCode(data.postalCode || '');
          setCountry(data.country || '');

          if (data.imageProfile) {
            setProfilePhotoURL(data.imageProfile); // Usa diretamente a URL da imagem
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
      navigate('/login'); // Redireciona para a tela de login
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

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    // Aqui você deve chamar uma função que envie as atualizações para o backend
    console.log("Endereço enviado:", {
      addressLine1, addressLine2, city, state, postalCode, country
    });
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100 mt-80">
      {/* Barra lateral */}
      <div className="w-1/4 bg-white p-4 shadow-md">
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'perfil' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('perfil')}
            >
              Perfil
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'endereco' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('endereco')}
            >
              Endereço
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left py-2 px-4 rounded-md ${activeTab === 'historico' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('historico')}
            >
              Histórico de Pedidos
            </button>
          </li>
        </ul>
      </div>

      {/* Conteúdo da aba selecionada */}
      <div className="w-3/4 p-8">
        {activeTab === 'perfil' && (
          <div>
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
              <div className="flex flex-col items-center space-y-4 mt-80">
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="w-40 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Alterar Senha
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-40 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>


            </div>
          </div>
        )}

        {activeTab === 'endereco' && (
          <div>
            <form onSubmit={handleAddressSubmit} className="w-full mt-4">
              <label>Endereço:</label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-full border mb-2 p-2 rounded"
              />
              <label>Complemento:</label>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full border mb-2 p-2 rounded"
              />
              <label>Cidade:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border mb-2 p-2 rounded"
              />
              <label>Estado:</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border mb-2 p-2 rounded"
              />
              <label>CEP:</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full border mb-2 p-2 rounded"
              />
              <label>País:</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border mb-2 p-2 rounded"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Atualizar Endereço
              </button>
            </form>
          </div>
        )}

        {activeTab === 'historico' && (
          <div>
            {/* Aqui você pode adicionar o componente de histórico de pedidos no futuro */}
            <p>Histórico de pedidos em breve...</p>
          </div>
        )}
      </div>

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
