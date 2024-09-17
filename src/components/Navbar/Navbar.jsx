import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import newLogo from '../../assets/novalogo.png';
import blackLogo from '../../assets/blackLogo.png'; // Certifique-se de que este arquivo exista
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser); 
    // });

    // return () => unsubscribe(); 
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
    <>
      {/* Faixa preta no topo */}
      <div className="fixed top-0 left-0 w-full bg-[#180E03] text-white py-1 z-50 flex justify-between items-center px-4">
        {/* Links no topo */}
        <ul className="flex space-x-6 text-base ml-10">
          <li><Link to="/" className="hover:text-gray-200 transition-colors duration-300">Início</Link></li>
          <li><Link to="/products" className="hover:text-gray-200 transition-colors duration-300">Produtos</Link></li>
          <li><Link to="/contato" className="hover:text-gray-200 transition-colors duration-300">Contato</Link></li>
        </ul>

        {/* Ícones no topo */}
        <div className="flex space-x-8 mr-10">
          <a href="#" aria-label="Pesquisar" onClick={toggleSearch} className="text-[#ffffff] hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-search" style={{ fontSize: '20px' }}></i>
          </a>
          <a href="#" aria-label="Perfil" onClick={handleProfileClick} className="text-[#ffffff] hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-user" style={{ fontSize: '20px' }}></i>
          </a>
          <a href="#" aria-label="Carrinho" className="text-[#ffffff] hover:text-gray-200 transition-colors duration-300">
            <i className="fas fa-shopping-cart" style={{ fontSize: '20px' }}></i>
          </a>
        </div>
      </div>

      {/* Navbar com imagem de fundo e logo */}
      <nav
        className={`fixed w-full top-0 left-0 z-40 transition-all duration-700 ease-in-out ${isShrunk ? 'py-2 shadow-md' : 'py-5'}`}
        style={{
          backgroundColor: '#B871CE',
          backgroundImage: `url(${newLogo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: isShrunk ? '150px' : '250px',
        }}
      >

        <div className="container mx-auto flex justify-center items-center relative px-4">
          {/* Logo sobre a imagem de fundo */}
          <img
            src={blackLogo}
            alt="Logo"
            className={`absolute transform transition-all duration-700 ${isShrunk ? 'w-24 mt-16' : 'w-36 mt-28'}`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Search Overlay */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-pink-200 transform ${searchOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 shadow-lg z-40 p-4 flex flex-col`}>
          <button className="self-end text-2xl text-gray-800" onClick={toggleSearch}>X</button>
          <input type="text" placeholder="Buscar..." className="border-none p-2 mb-4 rounded-lg text-lg" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
