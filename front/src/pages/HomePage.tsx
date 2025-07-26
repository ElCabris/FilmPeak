import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const FilmPeakLandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Crea la instancia de navigate

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header con logo personalizado y botón de inicio de sesión */}
      <header className="px-4 md:px-16 py-5 flex justify-between items-center">
        {/* Logo personalizado */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="FilmPeak" 
            className="h-50 md:h-46" // Ajusta la altura según tu logo
          />
        </div>
        
        {/* Botón de inicio de sesión con navegación */}
        <button 
          className="bg-blue-500 hover:bg-blue-700 px-2 py-2 rounded font-bold transition duration-300 text-sm md:text-base"
          onClick={() => navigate('login')} // Navegación al hacer clic
        >
          Iniciar sesión
        </button>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Películas de todo tipo,con su propia valoración y mucho más
          </h2>
          
          <p className="text-xl mb-4">
            A partir de $ 21.900, Cancela cuando quieras.
          </p>
          
          <p className="text-lg mb-8">
            ¿Quieres ver FilmPeak ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-grow px-4 py-3 bg-gray-900 bg-opacity-70 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded font-bold flex items-center justify-center transition duration-300">
              Comenzar
              <span className="ml-2 text-xl">&gt;</span>
            </button>
          </div>
        </div>
      </main>

      {/* Separador */}
      <div className="h-px bg-gray-800 my-8 mx-4 md:mx-16"></div>

      {/* Footer */}
      <footer className="px-4 md:px-16 py-8 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <p className="text-center mb-4">
            ¿Preguntas? Llama al 01 800 917 1564
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <a href="#" className="hover:underline">Preguntas frecuentes</a>
            <a href="#" className="hover:underline">Centro de ayuda</a>
            <a href="#" className="hover:underline">Términos de uso</a>
            <a href="#" className="hover:underline">Privacidad</a>
            <a href="#" className="hover:underline">Preferencias de cookies</a>
            <a href="#" className="hover:underline">Información corporativa</a>
          </div>
          <div className="text-center text-sm">
            © 2025 FilmPeak, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FilmPeakLandingPage;