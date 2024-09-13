// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css'; // Importa os estilos globais (Tailwind)
import { UserProvider } from './contexts/UserContext'; // Ajuste o caminho conforme necessário

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
