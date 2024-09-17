import React, { useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../firebase/users';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await registerUser(name, email, password, profilePhoto);
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (error) {
      setError('Falha ao criar conta, verifique suas credenciais');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-20">
        {loading && (
          <div className="flex flex-col items-center">
            <div className="loader"></div> {/* Loader aqui */}
            <p className="text-center mt-4">Carregando...</p>
          </div>
        )}
        {success && <p className="text-green-500 text-center">Registrado com sucesso!</p>}
        {
          !loading && !success &&
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Registrar-se</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Foto de Perfil (Opcional)</label>
                <input
                  type="file"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="button"
                onClick={ handleRegister }
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Registrar-se
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Register;
