import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiftIcon } from '@heroicons/react/24/solid';
import Footer from '../../../components/Footer';
import NavbarSignup from '../../../components/NavbarSignupSecond';
import Notification from '../../../components/Notificator';

const GiftCodePage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleRedeem = () => {
    console.log('Código canjeado:', code);
    setShowNotification(true);
    
    // Redirigir después de 5 segundos
    setTimeout(() => {
      navigate('/SelectMovie');
    }, 5000);
  };

  const handleChangePlan = () => {
    navigate("/SelectPlanForm");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex flex-col">
      <NavbarSignup />
      
      {/* Notificación */}
      {showNotification && (
        <Notification
          message="¡Código canjeado con éxito!"
          type="success"
          onClose={() => setShowNotification(false)}
          duration={5000}
        />
      )}

      <main className="flex-grow px-6 py-16 mt-28 flex flex-col items-center">
        <GiftIcon className="w-12 h-12 text-blue-400 mb-4" />

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Ingresa tu código de regalo
        </h1>

        <p className="text-gray-400 text-center mb-8 max-w-xl text-sm leading-relaxed">
          Introduce el PIN o código de tu tarjeta de regalo tal como aparece.
        </p>

        <div className="w-full max-w-md space-y-5 bg-gray-900 text-white rounded-xl p-8 shadow-lg">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="PIN o código de la tarjeta de regalo"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between items-center text-sm bg-gray-800 rounded-lg px-4 py-3">
            <div>
              <p className="font-semibold text-white">$ 44.900 al mes</p>
              <p className="text-gray-400">Premium</p>
            </div>
            <button
              onClick={handleChangePlan}
              className="text-blue-400 text-sm font-semibold hover:text-blue-300 cursor-pointer"
            >
              Cambiar
            </button>
          </div>

          <button
            onClick={handleRedeem}
            disabled={!code.trim()}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-xl text-lg font-semibold tracking-wide transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Canjear código de regalo
          </button>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GiftCodePage;