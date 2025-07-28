import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavbarSignup from '../../components/NavbarSignupFirst';

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
    downloads: '6',
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

      <main className="flex-grow px-4 py-12 mt-16 flex flex-col items-center">
        <h2 className="text-center text-lg text-gray-400 mb-2">Paso 3 de 4</h2>
        <h1 className="text-3xl font-bold text-center mb-10">Selecciona el plan ideal para ti</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {plans.map(plan => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative bg-white text-black rounded-xl p-6 border-2 cursor-pointer transition-all
                ${selectedPlan === plan.name ? 'border-blue-600' : 'border-gray-200'} 
                hover:border-blue-400`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs font-semibold py-1 rounded-t-xl text-center">
                  Más popular
                </div>
              )}

              <h3 className={`text-xl font-bold mb-1 mt-4 ${plan.color}`}>{plan.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{plan.resolution}</p>

              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Precio mensual:</strong> {plan.price}</p>
                <p><strong>Calidad de audio y video:</strong> {plan.quality}</p>
                <p><strong>Resolución:</strong> {plan.resolution}</p>
                {plan.audio && <p><strong>Audio espacial:</strong> {plan.audio}</p>}
                <p><strong>Dispositivos compatibles:</strong> {plan.devices}</p>
                <p><strong>Dispositivos simultáneos:</strong> {plan.simultaneous}</p>
                <p><strong>Dispositivos de descarga:</strong> {plan.downloads}</p>
              </div>

              {selectedPlan === plan.name && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-12 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded text-lg font-bold transition"
        >
          Siguiente
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default PlanOptionsPage;
