import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importa tus imágenes de avatar
import Avatar1 from '../assets/BoyIcon.webp';
import Avatar2 from '../assets/GirlIcon.webp';

import AddIcon from '../assets/add-icon.webp';

interface AddProfileScreenProps {
  onProfileCreated: (profile: { name: string; avatar: string; isKidsProfile: boolean }) => void;
}

const AddProfileScreen: React.FC<AddProfileScreenProps> = ({ onProfileCreated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  // Avatares disponibles
  const avatars = [
    { id: 1, image: Avatar1 },
    { id: 2, image: Avatar2 }
  ];

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setShowAvatarPicker(false);
  };

  const handleSave = () => {
    if (!name) {
      alert('Por favor ingresa un nombre para el perfil');
      return;
    }

    if (!selectedAvatar) {
      alert('Por favor selecciona un avatar');
      return;
    }

    // Llama a la función para guardar el perfil
    onProfileCreated({
      name,
      avatar: selectedAvatar,
      isKidsProfile
    });

    // Navega de vuelta a la pantalla de perfiles
    navigate('/profiles');
  };

  const handleCancel = () => {
    navigate('/profiles');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Contenedor principal con recuadro */}
      <div className="relative bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-700">
        {/* Botón de cerrar (X) */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={handleCancel}
        >
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
            className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center cursor-pointer group border-2 border-transparent hover:border-blue-600 transition-all"
            onClick={() => setShowAvatarPicker(true)}
          >
            {selectedAvatar ? (
              <img 
                src={selectedAvatar} 
                alt="Avatar seleccionado" 
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img 
                  src={AddIcon} 
                  alt="Añadir avatar" 
                  className="w-12 h-12 opacity-70 group-hover:opacity-100 transition-opacity"
                />

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
          <button 
            className="bg-white text-black font-medium py-3 px-6 rounded flex-1 hover:bg-opacity-90 transition hover:scale-[1.02]"
            onClick={handleSave}
          >
            Guardar
          </button>
          <button 
            className="bg-transparent border border-gray-600 text-gray-300 font-medium py-3 px-6 rounded flex-1 hover:bg-gray-800 transition hover:border-gray-400 hover:text-white"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
      
      {/* Selector de avatares */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-xs">
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
              {avatars.map((avatar) => (
                <div 
                  key={avatar.id}
                  className={`p-4 rounded-lg cursor-pointer flex items-center justify-center transition-all ${
                    selectedAvatar === avatar.image 
                      ? 'bg-blue-400 scale-105 border-2 border-white' 
                      : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                  }`}
                  onClick={() => handleAvatarSelect(avatar.image)}
                >
                  <img 
                    src={avatar.image} 
                    alt={`Avatar ${avatar.id}`} 
                    className="w-16 h-16 object-cover rounded-full"
                  />
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