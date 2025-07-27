import React from 'react';

const ProfileSelectionScreen = () => {
  return (
<div className="min-h-screen bg-gray-900 flex flex-col items-center pt-64 pb-12 px-4">
      {/* Título principal */}
      <h1 className="text-white text-3xl font-medium mb-32">
        ¿Quién está viendo ahora?
      </h1>

      {/* Contenedor de perfiles */}
      <div className="flex flex-wrap justify-center gap-12 max-w-4xl">
        {/* Perfil Mateo */}
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-transparent group-hover:border-white transition-all mb-4" />
          <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
            Mateo
          </span>
        </div>

        {/* Perfil Andre */}
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-transparent group-hover:border-white transition-all mb-4" />
          <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
            Andre
          </span>
        </div>

        {/* Perfil Alejandra */}
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-transparent group-hover:border-white transition-all mb-4" />
          <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
            Alejandra
          </span>
        </div>

        {/* Perfil Sebas */}
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-transparent group-hover:border-white transition-all mb-4" />
          <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
            Sebas
          </span>
        </div>

        {/* Agregar perfil */}
        <div className="flex flex-col items-center cursor-pointer group">
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
      <button className="px-8 py-3 border-2 border-gray-700 text-gray-400 text-lg font-medium hover:border-white hover:text-white transition-colors">
        Administrar perfiles
      </button>
    </div>
  );
};

export default ProfileSelectionScreen;