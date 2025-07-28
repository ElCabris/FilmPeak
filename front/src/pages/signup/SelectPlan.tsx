import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavbarSignup from '../../components/NavbarSignupFirst';

const SelectPlanPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/plan-options');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavbarSignup />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 mt-20">
        {/* Paso y check */}
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="mx-auto mb-4 w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mt-2">Elige tu plan</h1>
          </div>

          <ul className="text-left mb-8 space-y-3 text-base">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              Sin compromisos; cancela cuando quieras.
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              Todo FilmPeak a un bajo costo.
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              Disfruta sin límites en todos tus dispositivos.
            </li>
          </ul>

          <button
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded text-lg transition duration-200 cursor-pointer flex items-center justify-center"
          >
            Siguiente
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SelectPlanPage;
