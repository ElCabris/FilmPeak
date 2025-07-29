import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

const NavbarLogin: React.FC = () => {
  
  return (
    <nav className="fixed top-0 w-full left-0 bg-gradient-to-b from-black/90 via-black/80 to-black/50 z-50 px-2 py-3">
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
      </div>
    </nav>
  );
};

export default NavbarLogin;