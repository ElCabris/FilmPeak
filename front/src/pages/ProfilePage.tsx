import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importa tus imágenes aquí (reemplaza con tus rutas reales)
import mateoImage from '../assets/BoyIcon.webp';
import andreImage from '../assets/BoyIcon.webp';
import alejandraImage from '../assets/GirlIcon.webp';


const ProfileSelectionScreen = () => {
  const navigate = useNavigate();

  // Función para manejar la selección de perfil
  const handleProfileSelect = (profileName: string) => {
    // Aquí iría la lógica para establecer el perfil activo
    console.log(`Perfil seleccionado: ${profileName}`);
    
    // Navegar al inicio principal
    navigate('/SelectMovie');
  };

  // Función para crear nuevo perfil
  const handleAddProfile = () => {
    // Navegar a la pantalla de creación de perfil
    navigate('/crear-perfil');
  };

  // Función para administrar perfiles
  const handleManageProfiles = () => {
    // Navegar a la pantalla de administración
    navigate('/administrar-perfiles');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-64 pb-12 px-4">
      {/* Título principal */}
      <h1 className="text-white text-5xl font-medium mb-32">
        ¿Quién está viendo ahora?
      </h1>

      {/* Contenedor de perfiles */}
      <div className="flex flex-wrap justify-center gap-12 max-w-4xl">
        {/* Perfil Mateo */}
        <div 
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => handleProfileSelect('Mateo')}
        >
          <div className="w-32 h-32 rounded-full border-4 border-transparent group-hover:border-white transition-all mb-4 overflow-hidden">
            {/* ESPACIO PARA IMAGEN DE MATEO */}
            <img 
              src={mateoImage} 
              alt="Perfil de Mateo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
            Mateo
          </span>
        </div>

        {/* Perfil Andre */}
        <div 
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => handleProfileSelect('Andre')}
        >
          <div className="w-32 h-32 rounded-full border-4 border-transparent group-hover:border-white transition-all mb-4 overflow-hidden">
            {/* ESPACIO PARA IMAGEN DE ANDRE */}
            <img 
              src={andreImage} 
              alt="Perfil de Andre" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
            Andre
          </span>
        </div>

        {/* Perfil Alejandra */}
        <div 
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => handleProfileSelect('Alejandra')}
        >
          <div className="w-32 h-32 rounded-full border-4 border-transparent group-hover:border-white transition-all mb-4 overflow-hidden">
            {/* ESPACIO PARA IMAGEN DE ALEJANDRA */}
            <img 
              src={alejandraImage} 
              alt="Perfil de Alejandra" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
            Alejandra
          </span>
        </div>

        {/* Agregar perfil */}
        <div 
          className="flex flex-col items-center cursor-pointer group"
          onClick={handleAddProfile}
        >
          <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-transparent group-hover:border-gray-600 transition-all mb-4 flex items-center justify-center">
            <div className="text-gray-500 text-6xl font-thin leading-none pb-2 group-hover:text-gray-400 transition-colors">
              +
            </div>
          </div>
          <span className="text-xl text-gray-500 group-hover:text-gray-400 transition-colors">
            Agregar perfil
          </span>
        </div>
      </div>

      {/* Separador */}
      <div className="w-full max-w-md border-t border-gray-700 my-12"></div>

      {/* Botón administrar */}
      <button 
        className="px-8 py-3 border-2 border-gray-700 text-gray-400 text-lg font-medium hover:border-white hover:text-white transition-colors"
        onClick={handleManageProfiles}
      >
        Administrar perfiles
      </button>
    </div>
  );
};

export default ProfileSelectionScreen;