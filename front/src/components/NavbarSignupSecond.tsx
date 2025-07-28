import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { useNavigate } from 'react-router-dom';

const NavbarSignup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-black/90 via-black/85 to-black/75 z-50 px-2 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <img 
              src={logo} 
              alt="FilmPeak Logo" 
              className="h-20 md:h-24 object-contain"
            />
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold transition hover:bg-blue-700 hover:shadow-lg hover:shadow-black-500/50 cursor-pointer"
          onClick={() => navigate('/login')} >
          Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSignup;