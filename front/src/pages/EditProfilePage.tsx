import React, { useState } from 'react';

const AddProfileScreen = () => {
  const [name, setName] = useState('');
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  // Avatares disponibles
  const avatars = [
    "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
    "M12 14l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
  ];

  const handleAvatarSelect = (avatarPath: string) => {
    setSelectedAvatar(avatarPath);
    // Animación de selección
    setShowAvatarPicker(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Contenedor principal con recuadro */}
      <div className="relative bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-700">
        {/* Botón de cerrar (X) */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={() => console.log('Cerrar pantalla')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Título principal */}
        <h1 className="text-3xl font-bold mb-2 text-center">Agrega un perfil</h1>
        
        {/* Descripción */}
        <p className="text-gray-400 text-center mb-8">
          Agrega un perfil para otra persona que ve Netflix.
        </p>
        
        {/* Selector de avatar */}
        <div className="flex justify-center mb-6">
          <div 
            className="relative w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer group"
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
          >
            {selectedAvatar ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={selectedAvatar} />
              </svg>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="absolute bottom-0 right-0 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </>
            )}
          </div>
        </div>
        
        {/* Campo de nombre */}
        <div className="mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full bg-gray-800 py-3 px-4 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>
        
        {/* Separador */}
        <div className="h-px bg-gray-800 w-full my-8"></div>
        
        {/* Perfil de niños */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-bold text-lg">Perfil de niños</h2>
            <p className="text-gray-400 text-sm">Ver solo contenido infantil</p>
          </div>
          
          {/* Toggle Switch */}
          <div 
            onClick={() => setIsKidsProfile(!isKidsProfile)}
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              isKidsProfile ? 'bg-blue-600' : 'bg-gray-600'
            }`}
          >
            <div 
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                isKidsProfile ? 'translate-x-7' : ''
              }`}
            ></div>
          </div>
        </div>
        
        {/* Botones */}
        <div className="flex space-x-4">
          <button className="bg-white text-black font-medium py-3 px-6 rounded flex-1 hover:bg-opacity-90 transition hover:scale-[1.02]">
            Guardar
          </button>
          <button className="bg-transparent border border-gray-600 text-gray-300 font-medium py-3 px-6 rounded flex-1 hover:bg-gray-800 transition hover:border-gray-400 hover:text-white">
            Cancelar
          </button>
        </div>
      </div>
      
      {/* Selector de avatares (aparece al hacer clic en el avatar) */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-xs animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Elige un avatar</h2>
              <button 
                onClick={() => setShowAvatarPicker(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {avatars.map((avatar, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer flex items-center justify-center transition-all ${
                    selectedAvatar === avatar 
                      ? 'bg-blue-600 scale-105' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={avatar} />
                  </svg>
                </div>
              ))}
            </div>
            
            <button 
              className="mt-6 w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              onClick={() => {
                setSelectedAvatar(null);
                setShowAvatarPicker(false);
              }}
            >
              Quitar avatar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProfileScreen;