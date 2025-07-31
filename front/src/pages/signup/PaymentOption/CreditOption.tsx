import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';
import NavbarSignup from '../../../components/NavbarSignupSecond';
import visaLogo from '../../../assets/Visa.webp';
import mastercardLogo from '../../../assets/MasterCard.webp';
import amexLogo from '../../../assets/amex.webp';
import Notification from '../../../components/Notificator';

interface PlanInfo {
  name: string;
  resolution: string;
  price: string;
}

const CardPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const selected = localStorage.getItem('selectedPlan') || 'Premium';
    const allPlans: Record<string, PlanInfo> = {
      'Básico': { name: 'Básico', resolution: '720p (HD)', price: '$18.900' },
      'Estándar': { name: 'Estándar', resolution: '1080p (Full HD)', price: '$29.900' },
      'Premium': { name: 'Premium', resolution: '4K + HDR', price: '$44.900' }
    };
    setPlan(allPlans[selected]);
  }, []);

  const handleStartMembership = () => {
    setShowNotification(true);
    
    // Redirigir después de 1 segundo
    setTimeout(() => {
      navigate("/profiles");
    }, 1100);
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
          message="¡Pago realizado con éxito!"
          type="success"
          onClose={() => setShowNotification(false)}
          duration={5000}
        />
      )}

      <main className="flex-grow px-6 py-16 mt-36 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Agrega una tarjeta para comenzar
        </h1>

        <p className="text-gray-400 text-center mb-8 max-w-xl text-sm leading-relaxed">
          Aceptamos tarjetas de crédito y débito Visa, Mastercard y American Express. Puedes cambiar tu forma de pago cuando quieras.
        </p>

        <div className="flex gap-4 justify-center mb-6">
          <img src={visaLogo} alt="Visa" className="h-8" />
          <img src={mastercardLogo} alt="Mastercard" className="h-8" />
          <img src={amexLogo} alt="Amex" className="h-8" />
        </div>

        <div className="w-full max-w-lg space-y-6 bg-gray-900 text-white p-8 rounded-xl shadow-lg">
          {plan && (
            <div className="bg-gray-800 p-4 rounded-md text-sm text-gray-300">
              <p><strong>Plan:</strong> {plan.name}</p>
              <p><strong>Resolución:</strong> {plan.resolution}</p>
              <p><strong>Precio mensual:</strong> {plan.price}</p>
            </div>
          )}

          <label className="block">
            <span className="block text-sm font-medium text-gray-300 mb-1">Número de tarjeta</span>
            <input
              type="text"
              placeholder="•••• •••• •••• ••••"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <div className="flex justify-between gap-4">
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-300 mb-1">Fecha de vencimiento</span>
              <input
                type="text"
                placeholder="MM/AA"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-300 mb-1">CVV</span>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <button
            onClick={handleChangePlan}
            className="text-blue-400 text-sm underline hover:text-blue-300 cursor-pointer"
          >
            Cambiar plan
          </button>

          <button
            onClick={handleStartMembership}
            className="w-full mt-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-xl text-lg font-semibold tracking-wide transition-all transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Iniciar membresía
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center mt-16 max-w-xl">
          Tu información está encriptada de forma segura. Puedes cancelar en cualquier momento.
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CardPaymentPage;