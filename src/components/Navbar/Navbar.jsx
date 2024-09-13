import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Use Link for navigation
import { onAuthStateChanged } from 'firebase/auth'; // Firebase method to track auth state
import { auth } from '../../firebase/firebase'; // Your Firebase config
import logo from '../../assets/crisblaclogo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null); // Track user state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check if user is logged in or not
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if logged in, null otherwise
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-600 ease-in-out ${isShrunk ? 'py-2 shadow-md' : 'py-5'}`}
      style={{ backgroundColor: isShrunk ? '#B871CE' : '#B871CE' }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between px-4">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className={`transition-all duration-600 ease-in-out ${isShrunk ? 'h-10' : 'h-24'} w-auto`} />
          <ul className={`flex space-x-6 mt-4 ${isShrunk ? 'text-sm' : 'text-base'}`}>
            <li><Link to="/" className="text-white hover:text-gray-200 transition-colors duration-300">Início</Link></li>
            <li><Link to="/products" className="text-white hover:text-gray-200 transition-colors duration-300">Produtos</Link></li>
            <li><Link to="/contato" className="text-white hover:text-gray-200 transition-colors duration-300">Contato</Link></li>
          </ul>
        </div>

        <div className="flex space-x-6 mt-4">
          <a href="#" aria-label="Pesquisar" onClick={toggleSearch} className="text-white hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-search"></i>
          </a>
          <a href="#" aria-label="Perfil" onClick={handleProfileClick} className="text-white hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-user"></i>
          </a>
          <a href="#" aria-label="Carrinho" className="text-white hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </div>

        <div className={`fixed top-0 right-0 h-full w-80 bg-pink-200 transform ${searchOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 shadow-lg z-40 p-4 flex flex-col`}>
          <button className="self-end text-2xl text-gray-800" onClick={toggleSearch}>X</button>
          <input type="text" placeholder="Buscar..." className="border-none p-2 mb-4 rounded-lg text-lg" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
