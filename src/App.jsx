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
import { useState, useEffect } from 'react';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(null); // Estado para o usuário

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log(`Produto ${product.name} adicionado ao carrinho.`);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter(item => item.id !== productId);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log(`Produto com ID ${productId} removido do carrinho.`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleLogout = () => {
    setCartItems([]); // Limpa o carrinho ao fazer logout
    setUser(null); // Define o usuário como null
    localStorage.removeItem('cartItems'); // Remove o carrinho do localStorage
  };

  // Lógica para buscar o carrinho do usuário no banco de dados ao fazer login
  useEffect(() => {
    const fetchUserCart = async () => {
      if (user) {
        const userCart = await getUserCartFromDatabase(user.id); // Substitua pela sua lógica de recuperação de carrinho
        setCartItems(userCart);
      }
    };
    fetchUserCart();
  }, [user]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
              />
            } />
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
