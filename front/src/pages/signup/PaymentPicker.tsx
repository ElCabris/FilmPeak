import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavbarSignup from '../../components/NavbarSignupSecond';

// Heroicons
import {
  LockClosedIcon,
  CreditCardIcon,
  GiftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const PaymentMethodPage: React.FC = () => {
  const navigate = useNavigate();

const handleSelect = (method: string) => {
  localStorage.setItem('paymentMethod', method);
  if (method === 'card') {
    navigate('/payment/card');
  } else if (method === 'gift') {
    navigate('/payment/gift');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex flex-col">
      <NavbarSignup />

      <main className="flex-grow px-6 py-16 mt-32 flex flex-col items-center">
        {/* Ícono grande y centrado */}
        <div className="flex flex-col items-center gap-2 text-red-500 mb-6">
          <LockClosedIcon className="w-10 h-10" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Elige cómo quieres pagar
        </h1>

        <p className="text-gray-400 text-center mb-10 max-w-xl text-sm leading-relaxed">
          Tu forma de pago está encriptada y puedes cambiarla cuando quieras. <br />
          <span className="font-semibold text-white">Transacciones seguras y confiables.</span> Cancela fácilmente online.
        </p>

        {/* Opciones de pago */}
        <div className="w-full max-w-xl space-y-5 text-black">
          {/* Tarjeta */}
          <button
            onClick={() => handleSelect('card')}
            className="w-full flex justify-between items-center bg-white rounded-lg px-6 py-5 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <CreditCardIcon className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-black">Tarjeta de crédito o débito</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
          </button>

          {/* Código de regalo */}
          <button
            onClick={() => handleSelect('gift')}
            className="w-full flex justify-between items-center bg-white rounded-lg px-6 py-5 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <GiftIcon className="w-6 h-6 text-red-500" />
              <span className="font-semibold text-black">Código de regalo</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center mt-16 max-w-xl">
          Encriptado de extremo a extremo 🔒 <br />
          Puedes cambiar tu método de pago en cualquier momento desde tu cuenta.
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentMethodPage;
