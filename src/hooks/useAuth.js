// src/hooks/useAuth.js
import { useState } from 'react';
import { registerUser } from '../firebase/auth';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      await registerUser(email, password, displayName);
      // Manejar sucesso
    } catch (err) {
      setError('Erro ao registrar o usuário.');
    }
    setLoading(false);
  };

  return { register, loading, error };
};

export default useAuth;
