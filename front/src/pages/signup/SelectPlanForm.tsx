import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavbarSignup from '../../components/NavbarSignupSecond';

const plans = [
  {
    name: 'Básico',
    resolution: '720p (HD)',
    price: '$ 18.900',
    quality: 'Buena',
    devices: 'TV, computadora, teléfono, tablet',
    simultaneous: '1',
    downloads: '1',
    color: 'text-blue-400',
    borderColor: 'border-blue-500',
    bgColor: 'bg-gradient-to-br from-blue-900/30 to-blue-800/20',
    popular: false
  },
  {
    name: 'Estándar',
    resolution: '1080p (Full HD)',
    price: '$ 29.900',
    quality: 'Excelente',
    devices: 'TV, computadora, teléfono, tablet',
    simultaneous: '2',
    downloads: '2',
    color: 'text-purple-400',
    borderColor: 'border-purple-500',
    bgColor: 'bg-gradient-to-br from-purple-900/30 to-purple-800/20',
    popular: false
  },
  {
    name: 'Premium',
    resolution: '4K (Ultra HD) + HDR',
    price: '$ 44.900',
    quality: 'Óptima',
    audio: 'Incluido',
    devices: 'TV, computadora, teléfono, tablet',
    simultaneous: '4',
    downloads: '5',
    color: 'text-red-400',
    borderColor: 'border-red-500',
    bgColor: 'bg-gradient-to-br from-red-900/30 to-red-800/20',
    popular: true
  }
];

const PlanOptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  const handleNext = () => {
    localStorage.setItem('selectedPlan', selectedPlan);
    navigate('/PaymentPicker');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex flex-col">
      <NavbarSignup />

      <main className="flex-grow px-6 py-12 mt-16 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Selecciona el plan ideal para ti
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl">
          Todos los planes incluyen acceso completo al catálogo de FilmPeak. Cancela cuando quieras.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {plans.map(plan => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative rounded-xl px-6 py-8 min-h-[460px] border-2 cursor-pointer transition-all
                ${selectedPlan === plan.name 
                  ? `${plan.borderColor} scale-[1.02] shadow-lg ${plan.color.replace('text', 'shadow')}` 
                  : 'border-gray-700'} 
                hover:${plan.borderColor.replace('border', 'hover:border')}
                ${plan.bgColor}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold py-2 px-4 rounded-t-xl text-center">
                  MÁS POPULAR
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 mt-2 ${plan.color}`}>{plan.name}</h3>
              <p className="text-xl font-semibold mb-1">{plan.price}</p>
              <p className="text-gray-400 text-sm mb-6">por mes</p>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>

              <div className="text-base space-y-3">
                <p className="flex items-start">
                  <span className={`${plan.color} mr-2 font-bold`}>✓</span>
                  <span><strong>Resolución:</strong> {plan.resolution}</span>
                </p>
                <p className="flex items-start">
                  <span className={`${plan.color} mr-2 font-bold`}>✓</span>
                  <span><strong>Calidad:</strong> {plan.quality}</span>
                </p>
                {plan.audio && (
                  <p className="flex items-start">
                    <span className={`${plan.color} mr-2 font-bold`}>✓</span>
                    <span><strong>Audio espacial:</strong> {plan.audio}</span>
                  </p>
                )}
                <p className="flex items-start">
                  <span className={`${plan.color} mr-2 font-bold`}>✓</span>
                  <span><strong>Dispositivos:</strong> {plan.devices}</span>
                </p>
                <p className="flex items-start">
                  <span className={`${plan.color} mr-2 font-bold`}>✓</span>
                  <span><strong>Simultáneos:</strong> {plan.simultaneous}</span>
                </p>
                <p className="flex items-start">
                  <span className={`${plan.color} mr-2 font-bold`}>✓</span>
                  <span><strong>Descargas:</strong> {plan.downloads}</span>
                </p>
              </div>

              {selectedPlan === plan.name && (
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full ${plan.bgColor.replace('bg', 'bg')} border-2 ${plan.borderColor} flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${plan.color.replace('text', 'bg')}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg"
        >
          Continuar
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default PlanOptionsPage;