import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Cart from './pages/Cart';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]); // Adiciona o produto ao array de itens do carrinho
    console.log(`Produto ${product.name} adicionado ao carrinho.`);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar cartCount={cartItems.length} /> {/* Passa o número de itens ao Navbar */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} /> {/* Passa a função para Products */}
            <Route path="/cart" element={<Cart cartItems={cartItems} />} /> {/* Adiciona a rota da página de carrinho */}
          </Routes>
        </main>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

function ConditionalFooter() {
  const location = useLocation();

  const noFooterRoutes = ['/login', '/register', '/profile'];

  return !noFooterRoutes.includes(location.pathname) ? <Footer /> : null;
}

export default App;