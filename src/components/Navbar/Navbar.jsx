import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../../firebase/firebase'; 
import newLogo from '../../assets/novalogo.png'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe(); 
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
      style={{
        backgroundColor: '#B871CE',
        backgroundImage: `url(${newLogo})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: isShrunk ? '150px' : '250px', 
      }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left Side (Icons) */}
        <div className="flex space-x-6">
          <a href="#" aria-label="Pesquisar" onClick={toggleSearch} className="text-[#FACC15] hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-search"></i>
          </a>
          <a href="#" aria-label="Perfil" onClick={handleProfileClick} className="text-[#FACC15] hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-user"></i>
          </a>
          <a href="#" aria-label="Carrinho" className="text-[#FACC15] hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </div>

         {/* Right Side (Links) */}
         <ul className={`flex space-x-6 ${isShrunk ? 'text-sm' : 'text-base'}`}>
          <li><Link to="/" className="text-[#FACC15] hover:text-gray-200 transition-colors duration-300">Início</Link></li>
          <li><Link to="/products" className="text-[#FACC15] hover:text-gray-200 transition-colors duration-300">Produtos</Link></li>
          <li><Link to="/contato" className="text-[#FACC15] hover:text-gray-200 transition-colors duration-300">Contato</Link></li>
        </ul>

        {/* Search Overlay */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-pink-200 transform ${searchOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 shadow-lg z-40 p-4 flex flex-col`}>
          <button className="self-end text-2xl text-gray-800" onClick={toggleSearch}>X</button>
          <input type="text" placeholder="Buscar..." className="border-none p-2 mb-4 rounded-lg text-lg" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
