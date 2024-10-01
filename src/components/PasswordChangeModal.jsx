import React, { useState } from 'react';

const PasswordChangeModal = ({ onClose, onConfirm }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (newPassword !== confirmPassword) {
      setError('As senhas não correspondem.');
      return;
    }
    onConfirm(newPassword); // Chama a função com a nova senha
    onClose(); // Fecha o modal após a confirmação
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-sm">Nova Senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded-md w-full px-3 py-2 mb-4"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-md w-full px-3 py-2 mb-4"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
