import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionamento
// import { entrarComGoogle } from '../firebase/firebase.js'; // Importa a função para login com Google

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Para controlar a tela de carregamento
  const [modalOpen, setModalOpen] = useState(false); // Para controlar a visibilidade do modal
  const [resetEmail, setResetEmail] = useState(''); // Para o email de recuperação de senha
  const [message, setMessage] = useState(''); // Para mensagens de sucesso ou erro

  const navigate = useNavigate();

  // Função para login
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido');
      setLoading(false);
      // Redirecionar para a página inicial
      navigate('/');
    } catch (error) {
      setError('Falha ao fazer login, verifique suas credenciais');
      setLoading(false);
    }
  };

  // Função para enviar o e-mail de redefinição de senha
  const handlePasswordReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setMessage('E-mail para redefinição de senha enviado!');
      setModalOpen(false); // Fechar o modal após o envio
      setResetEmail(''); // Limpar o campo de e-mail
      setError('');
    } catch (error) {
      setError('Falha ao enviar e-mail de redefinição. Verifique o e-mail digitado.');
      setMessage('');
    }
  };

  // Função para login com Google
  const handleGoogleLogin = async () => {
    try {
      // await entrarComGoogle();
      // Redirecionar para a página de registro após login com Google
      navigate('/register');
    } catch (error) {
      setError('Falha ao fazer login com Google');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Tela de carregamento */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="loader">Carregando...</div>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Entrar com Google
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          <button
            type="button"
            onClick={() => setModalOpen(true)} // Abrir modal para redefinição de senha
            className="text-purple-600 hover:underline"
          >
            Esqueci minha senha
          </button>
        </p>

        <p className="mt-4 text-center text-gray-600">
          Não tem uma conta? <a href="/register" className="text-purple-600 hover:underline">Registrar-se</a>
        </p>
      </div>

      {/* Modal para redefinição de senha */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Recuperar Senha</h3>
            <label className="block text-sm font-medium">Digite seu e-mail</label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePasswordReset}
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors mr-2"
              >
                Enviar
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
