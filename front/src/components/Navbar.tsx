import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-black to-transparent z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-Blue-600 font-bold text-3xl mr-10">FilmPeak</h1>
          <div className="hidden md:flex space-x-6">
            {['Inicio', 'Serie', 'Periodas', 'Juegos', 'Novedades populares', 'MI Rita', 'Explora por idiomas'].map((item) => (
              <a key={item} href="#" className="text-gray-300 hover:text-white transition-colors">
                {item}
              </a>
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