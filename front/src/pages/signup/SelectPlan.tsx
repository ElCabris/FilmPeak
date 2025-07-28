import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavbarSignup from '../../components/NavbarSignupFirst';

const PlanSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex flex-col">
      <NavbarSignup />

      {/* Contenido principal - Corregido el padding y flex */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="max-w-3xl w-full mt-16 mb-8"> {/* Añadido margen superior */}
          
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Paso 3 de 4</div>
              <div className="flex justify-center gap-1">
                <div className="h-1 w-8 bg-gray-600 rounded-full"></div>
                <div className="h-1 w-8 bg-gray-600 rounded-full"></div>
                <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
                <div className="h-1 w-8 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6">Elige tu plan</h1>

          {/* Plan features */}
          <ul className="text-center mb-8 space-y-2">
            <li className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Sin compromisos; cancela cuando quieras.
            </li>
            <li className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Todo FilmPeak a un bajo costo.
            </li>
            <li className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Disfruta sin límites en todos tus dispositivos.
            </li>
          </ul>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Plan 1 */}
            <div className="border border-gray-700 rounded p-6 hover:border-white transition cursor-pointer">
              <h3 className="font-bold text-xl mb-2">Básico</h3>
              <p className="text-gray-400 mb-4">$21,900/mes</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Calidad HD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dispositivos: 1</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Descargas: 1</span>
                </li>
              </ul>
            </div>

            {/* Plan 2 (Recommended) */}
            <div className="border-2 border-blue-500 rounded p-6 hover:border-blue-400 transition cursor-pointer relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">
                Recomendado
              </div>
              <h3 className="font-bold text-xl mb-2">Estándar</h3>
              <p className="text-gray-400 mb-4">$32,900/mes</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Calidad Full HD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dispositivos: 2</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Descargas: 2</span>
                </li>
              </ul>
            </div>

            {/* Plan 3 */}
            <div className="border border-gray-700 rounded p-6 hover:border-white transition cursor-pointer">
              <h3 className="font-bold text-xl mb-2">Premium</h3>
              <p className="text-gray-400 mb-4">$43,900/mes</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Calidad 4K Ultra HD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dispositivos: 4</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Descargas: 4</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded font-bold text-lg text-white transition duration-200 cursor-pointer mx-auto block"
          >
            Siguiente
          </button>

          {/* Help text */}
          <p className="text-center text-gray-400 text-sm mt-8">
            ¿Preguntas? Llama al 01 800 917 1864 (sin cargo)
          </p>
        </div>
      </main>

      {/* Footer links - ESTE ES EL FOOTER REAL, EL OTRO ESTÁ DE MÁS */}
      <div className="px-4 md:px-16 py-8 border-t border-gray-800 mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 max-w-6xl mx-auto">
          <a href="#" className="hover:underline">Preguntas frecuentes</a>
          <a href="#" className="hover:underline">Términos de uso</a>
          <a href="#" className="hover:underline">Preferencias de cookies</a>
          <a href="#" className="hover:underline">Información corporativa</a>
        </div>
      </div>

      {/* REMOVÍ EL COMPONENTE FOOTER EXTRA */}
    </div>
  );
};

export default PlanSelection;