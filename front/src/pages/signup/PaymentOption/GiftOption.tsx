import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';
import NavbarSignup from '../../../components/NavbarSignupSecond';

const GiftCodePage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleRedeem = () => {
    console.log('Código canjeado:', code);
    navigate('/SelectMovie'); 
  };

  const handleChangePlan = () => {
    navigate("/plan-options"); // Ruta donde eliges los planes
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex flex-col">
      <NavbarSignup />

      <main className="flex-grow px-6 py-16 mt-24 flex flex-col items-center">
        <span className="text-sm text-gray-400 font-semibold mb-2">Paso 3 de 3</span>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Ingresa tu código de regalo
        </h1>

        {/* Formulario */}
        <div className="w-full max-w-md space-y-4 bg-white rounded-lg p-6 text-black shadow-md">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="PIN o código de la tarjeta de regalo"
            className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Plan activo */}
          <div className="flex justify-between items-center text-sm bg-gray-100 rounded px-4 py-3">
            <div>
              <p className="font-medium">$ 44.900 al mes</p>
              <p className="text-gray-600">Premium</p>
            </div>
            <button
              onClick={handleChangePlan}
              className="text-blue-600 font-semibold hover:underline text-sm"
            >
              Cambiar
            </button>
          </div>

          <button
            onClick={handleRedeem}
            disabled={!code.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-all duration-300 shadow-lg hover:shadow-blue-500/50 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Canjear código de regalo
          </button>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GiftCodePage;
