import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bottom-0 left-0 px-4 bg-gradient-to-b from-black/10 via-black/30 to-black/90 md:px-16 py-3 z-50 text-gray-400">
      <div className="max-w-5xl mx-auto">
        <p className="text-center mb-4">
          ¿Preguntas? Llama al 01 800 917 1564
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-7">
          {[
            'Preguntas frecuentes',
            'Centro de ayuda',
            'Términos de uso',
            'Privacidad',
            'Preferencias de cookies',
            'Información corporativa'
          ].map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="hover:underline hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="text-center text-sm">
          © 2025 FilmPeak, Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;