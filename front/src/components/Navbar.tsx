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
              alt="FilmPeak Logo" 
              className="h-20 object-contain" // Ajusta la altura
            />
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {['Inicio', 'Clasicos', 'Categorias', 'Novedades populares', 'Explora por idiomas'].map((item) => (
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
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-xs">JR</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;