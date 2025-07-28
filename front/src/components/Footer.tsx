import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-4 md:px-16 py-8 text-gray-400">
      <div className="max-w-6xl mx-auto">
        <p className="text-center mb-4">
          ¿Preguntas? Llama al 01 800 917 1564
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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