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
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Estándar',
    resolution: '1080p (Full HD)',
    price: '$ 29.900',
    quality: 'Excelente',
    devices: 'TV, computadora, teléfono, tablet',
    simultaneous: '2',
    downloads: '2',
    gradient: 'from-purple-600 to-pink-500',
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
    gradient: 'from-red-600 to-blue-800',
    mostPopular: true,
  }
];

const PlanOptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  const handleNext = () => {
    localStorage.setItem('selectedPlan', selectedPlan);
    navigate('/finish-signup'); // Cambia esta ruta según tu flujo
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavbarSignup />

      <main className="flex-grow px-4 py-12 mt-16 flex flex-col items-center">
        <h2 className="text-center text-xl text-gray-400 mb-2">Paso 3 de 4</h2>
        <h1 className="text-3xl font-bold text-center mb-10">Selecciona el plan ideal para ti</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {plans.map(plan => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`rounded-lg p-6 cursor-pointer border-2 transition-all 
                ${selectedPlan === plan.name ? 'border-blue-500 scale-105' : 'border-gray-700'} 
                bg-gradient-to-br ${plan.gradient} shadow-md`}
            >
              {plan.mostPopular && (
                <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full w-fit mb-2">
                  Más popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm mb-4">{plan.resolution}</p>

              <div className="text-sm space-y-2 text-white/90">
                <p><strong>Precio mensual:</strong> {plan.price}</p>
                <p><strong>Calidad de audio y video:</strong> {plan.quality}</p>
                <p><strong>Resolución:</strong> {plan.resolution}</p>
                {plan.audio && <p><strong>Audio especial:</strong> {plan.audio}</p>}
                <p><strong>Dispositivos compatibles:</strong> {plan.devices}</p>
                <p><strong>Dispositivos simultáneos:</strong> {plan.simultaneous}</p>
                <p><strong>Dispositivos de descarga:</strong> {plan.downloads}</p>
              </div>
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
