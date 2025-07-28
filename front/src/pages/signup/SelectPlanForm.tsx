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
    color: 'text-blue-600',
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
    color: 'text-purple-600',
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
    color: 'text-red-600',
    popular: true
  }
];

const PlanOptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  const handleNext = () => {
    localStorage.setItem('selectedPlan', selectedPlan);
    navigate('/finish-signup');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavbarSignup />

      <main className="flex-grow px-6 py-12 mt-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-12">Selecciona el plan ideal para ti</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
          {plans.map(plan => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative bg-white text-black rounded-xl px-8 py-10 min-h-[460px] border-2 cursor-pointer transition-all
                ${selectedPlan === plan.name ? 'border-blue-600 scale-105' : 'border-gray-200'} 
                hover:border-blue-400`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs font-semibold py-1 rounded-t-xl text-center">
                  Más popular
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 mt-5 ${plan.color}`}>{plan.name}</h3>
              <p className="text-base text-gray-600 mb-6">{plan.resolution}</p>

              <div className="text-base text-gray-800 space-y-3">
                <p><strong>Precio mensual:</strong> {plan.price}</p>
                <p><strong>Calidad de audio y video:</strong> {plan.quality}</p>
                <p><strong>Resolución:</strong> {plan.resolution}</p>
                {plan.audio && <p><strong>Audio espacial:</strong> {plan.audio}</p>}
                <p><strong>Dispositivos compatibles:</strong> {plan.devices}</p>
                <p><strong>Dispositivos simultáneos:</strong> {plan.simultaneous}</p>
                <p><strong>Dispositivos de descarga:</strong> {plan.downloads}</p>
              </div>

              {selectedPlan === plan.name && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-14 bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded text-lg font-bold transition"
        >
          Siguiente
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default PlanOptionsPage;
