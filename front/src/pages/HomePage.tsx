// src/pages/FilmPeakLandingPage.tsx
import React, { useState } from 'react';
import logo from '../assets/logo.webp';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; // Importamos el componente Footer

const FilmPeakLandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email enviado:", email);

  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <header className="px-4 md:px-16 py-5 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="FilmPeak" 
            className="h-40 md:h-35" // Altura ajustada para mejor proporción
          />
        </div>
        
        <button 
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold transition duration-300"
          onClick={() => navigate('/login')} 
        >
          Iniciar sesión
        </button>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Películas de todo tipo, con su propia valoración y mucho más
          </h2>
          
          <p className="text-xl mb-4">
            A partir de $ 21.900, Cancela cuando quieras.
          </p>
          
          <p className="text-lg mb-8">
            ¿Quieres ver FilmPeak ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía.
          </p>
          
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="flex-grow px-4 py-3 bg-gray-900 bg-opacity-70 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded font-bold flex items-center justify-center transition duration-300"
            >
              Comenzar
              <span className="ml-2 text-xl">&gt;</span>
            </button>
          </form>
        </div>
      </main>

      {/* Separador */}
      <div className="h-px bg-gray-800 my-8 mx-4 md:mx-16"></div>

      {/* Usamos el componente Footer aquí */}
      <Footer />
    </div>
  );
};

export default FilmPeakLandingPage;