// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot de 'react-dom/client'
import App from './App';
import './styles/global.css'; // Importa os estilos globais (Tailwind)
// import { UserProvider } from './contexts/UserContext'; // Ajuste o caminho conforme necessário

// Crie o root usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderize o aplicativo com createRoot
root.render(
  <React.StrictMode>
    {/* <UserProvider> */}
      <App />
    {/* </UserProvider> */}
  </React.StrictMode>
);
