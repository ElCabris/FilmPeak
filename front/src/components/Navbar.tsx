// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp'; 

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-black to-transparent z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-10">
            <img 
              src={logo} 
              alt="NETELLY Logo" 
              className="h-10 object-contain" // Ajusta la altura según tu logo
            />
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {['Inicio', 'Serie', 'Periodas', 'Juegos', 'Novedades populares', 'MI Rita', 'Explora por idiomas'].map((item) => (
              <Link 
                key={item} 
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/login" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm"
          >
            Iniciar sesión
          </Link>
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-xs">JR</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;