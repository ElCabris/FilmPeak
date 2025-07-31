import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CogIcon, UserIcon, TrashIcon, BellIcon } from '@heroicons/react/24/outline';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKidsProfile: boolean;
}

const ProfileSettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileName } = useParams<{ profileName: string }>();
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  
  // Simulación de base de datos de perfiles
  const mockProfiles: Profile[] = [
    { id: '1', name: 'Mateo', avatar: '', isKidsProfile: false },
    { id: '2', name: 'Andre', avatar: '', isKidsProfile: false },
    { id: '3', name: 'Alejandra', avatar: '', isKidsProfile: false }
  ];

  useEffect(() => {
    // Decodificar el nombre del perfil de la URL
    const decodedProfileName = profileName ? decodeURIComponent(profileName) : '';
    
    // Buscar el perfil por nombre
    const foundProfile = mockProfiles.find(profile => profile.name === decodedProfileName);
    
    if (foundProfile) {
      setCurrentProfile(foundProfile);
    } else if (location.state?.profile) {
      // Si viene del estado de navegación
      setCurrentProfile(location.state.profile);
    } else {
      // Si no se encuentra, redirigir
      navigate('/admin-profiles');
    }
  }, [profileName, location.state, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveChanges = () => {
    // Lógica para guardar cambios en el perfil
    console.log('Cambios guardados para:', currentProfile?.name);
    navigate('/profile-selection');
  };

  const handleDeleteProfile = () => {
    // Lógica para eliminar el perfil
    console.log('Perfil eliminado:', currentProfile?.name);
    navigate('/profile-selection');
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex items-center justify-center">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Botón de volver */}
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Volver
        </button>
        
        <h1 className="text-3xl font-bold mb-8">
          Administrar perfil: {currentProfile.name}
        </h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'profile' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('profile')}
          >
            <UserIcon className="w-5 h-5 inline-block mr-2" />
            Perfil
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'preferences' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('preferences')}
          >
            <CogIcon className="w-5 h-5 inline-block mr-2" />
            Preferencias
          </button>
        </div>
        
        {/* Contenido de pestaña de Perfil */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            {/* Información básica */}
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6">Información del perfil</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Nombre del perfil</label>
                  <input
                    type="text"
                    value={currentProfile.name}
                    onChange={(e) => setCurrentProfile({
                      ...currentProfile,
                      name: e.target.value
                    })}
                    className="w-full p-4 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Idioma del perfil</label>
                  <select className="w-full p-4 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>Español</option>
                    <option>Inglés</option>
                    <option>Portugués</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-lg transition-colors"
                    onClick={handleSaveChanges}
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
            
            {/* Avatar */}
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6">Imagen del perfil</h2>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {currentProfile.avatar ? (
                    <img 
                      src={currentProfile.avatar} 
                      alt={`Avatar de ${currentProfile.name}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-white">
                      {currentProfile.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-400 mb-4">
                    Personaliza tu perfil con una imagen única. Formatos recomendados: JPG o PNG (máx. 5MB)
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg transition-colors">
                      Subir imagen
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 py-3 px-6 rounded-lg transition-colors">
                      Elegir de la galería
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Acciones peligrosas */}
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6">Acciones de perfil</h2>
              
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-colors"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  <div className="flex items-center">
                    <TrashIcon className="w-6 h-6 text-red-500 mr-3" />
                    <span>Eliminar perfil</span>
                  </div>
                  <span className="text-gray-400 text-sm">Este perfil se eliminará permanentemente</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Contenido de pestaña de Preferencias */}
        {activeTab === 'preferences' && (
          <div className="space-y-8">
            {/* Preferencias de visualización */}
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6">
                <CogIcon className="w-6 h-6 inline-block mr-3" />
                Preferencias de visualización
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">Modo oscuro</h3>
                    <p className="text-gray-400 text-sm">Activar la interfaz oscura</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">Reproducción automática</h3>
                    <p className="text-gray-400 text-sm">Reproducir siguiente episodio automáticamente</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">Calidad de vídeo</h3>
                    <p className="text-gray-400 text-sm">Selecciona la calidad preferida</p>
                  </div>
                  <select className="p-2 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>Automática</option>
                    <option>Alta (1080p)</option>
                    <option>Media (720p)</option>
                    <option>Baja (480p)</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Notificaciones */}
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6">
                <BellIcon className="w-6 h-6 inline-block mr-3" />
                Preferencias de notificaciones
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">Notificaciones por correo</h3>
                    <p className="text-gray-400 text-sm">Recibir novedades por correo electrónico</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">Notificaciones push</h3>
                    <p className="text-gray-400 text-sm">Recibir notificaciones en el dispositivo</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmación para eliminar perfil */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-700">
              <div className="flex justify-center mb-6">
                <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <TrashIcon className="w-8 h-8 text-red-500" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-4">¿Eliminar perfil?</h2>
              <p className="text-gray-400 text-center mb-8">
                Esta acción eliminará permanentemente tu perfil y todos sus datos asociados. 
                ¿Estás seguro de que deseas continuar?
              </p>
              
              <div className="flex justify-center gap-4">
                <button 
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  onClick={handleDeleteProfile}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileSettingsPage;