import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products'; // Certifique-se de usar o caminho correto
import 'tailwindcss/tailwind.css'; // Importa o Tailwind CSS global

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} /> {/* Adicione o caminho correto para Products */}
            {/* Outras rotas */}
          </Routes>
        </main>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

// Componente condicional do Footer para não aparecer na tela de registros e login
function ConditionalFooter() {
  const location = useLocation();

  // Define as rotas que não exibirão o footer
  const noFooterRoutes = ['/login', '/register', '/profile'];

  return !noFooterRoutes.includes(location.pathname) ? <Footer /> : null;
}

export default App;
