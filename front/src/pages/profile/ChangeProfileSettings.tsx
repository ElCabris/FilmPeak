import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Profile {
  id?: string;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProfiles = async () => {
      const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
      
      if (!userEmail) {
        console.error('Email de usuario no encontrado');
        navigate('/login');
        return;
      }

      const decodedProfileName = profileName ? decodeURIComponent(profileName) : '';
      
      try {
        setIsLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/user/profiles/${userEmail}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error al obtener perfiles: ${response.status} - ${errorText}`);
          setError('No se pudieron cargar los perfiles');
          return;
        }

        const data = await response.json();
        const fetchedProfiles = data.profiles;

        // Buscar el perfil específico por nombre
        const foundProfile = fetchedProfiles.find((p: any) => p.profile_name === decodedProfileName);
        
        if (foundProfile) {
          setCurrentProfile({
            name: foundProfile.profile_name,
            avatar: foundProfile.image || '',
            isKidsProfile: false // Por ahora hardcodeado, se puede extender después
          });
        } else if (location.state?.profile) {
          // Si viene del estado de navegación
          setCurrentProfile(location.state.profile);
        } else {
          // Si no se encuentra, redirigir
          setError('Perfil no encontrado');
          navigate('/profiles');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        setError('Ocurrió un error al cargar el perfil.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [profileName, location.state, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveChanges = async () => {
    if (!currentProfile) return;
    
    // Por ahora solo guardamos localmente, se puede extender para enviar al backend
    console.log('Cambios guardados para:', currentProfile.name);
    navigate('/profiles');
  };

  const handleDeleteProfile = async () => {
    if (!currentProfile) return;

    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    
    if (!userEmail) {
      setError('No se encontró el correo del usuario');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/user/profiles?email=${encodeURIComponent(userEmail)}&profile=${encodeURIComponent(currentProfile.name)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error al eliminar perfil: ${response.status} - ${errorText}`);
        setError('No se pudo eliminar el perfil');
        return;
      }

      const result = await response.json();
      console.log('Perfil eliminado:', result.message);
      
      // Redirigir a la página de perfiles después de eliminar
      navigate('/profiles');
    } catch (error) {
      console.error('Error en la conexión:', error);
      setError('Ocurrió un error al intentar eliminar el perfil');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-lg">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button 
            onClick={() => navigate('/profiles')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Volver a perfiles
          </button>
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-4">Perfil no encontrado</div>
          <button 
            onClick={() => navigate('/profiles')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Volver a perfiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white">
      {/* Header */}
      <div className="flex items-center p-6 border-b border-gray-800">
        <button 
          onClick={handleBack}
          className="mr-4 p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Editar perfil</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Navegación de pestañas */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'profile' 
                ? 'text-white border-b-2 border-blue-600' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('parental')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'parental' 
                ? 'text-white border-b-2 border-blue-600' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Control parental
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
              <h2 className="text-xl font-semibold mb-6">Avatar del perfil</h2>
              
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  {currentProfile.avatar ? (
                    <img src={currentProfile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    currentProfile.name.charAt(0).toUpperCase()
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">{currentProfile.name}</h3>
                  <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors">
                    Cambiar avatar
                  </button>
                </div>
              </div>
            </div>

            {/* Configuraciones adicionales */}
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6">Configuraciones adicionales</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Perfil para niños</h3>
                    <p className="text-gray-400 text-sm">Mostrar solo contenido apropiado para menores</p>
                  </div>
                  <div
                    onClick={() => setCurrentProfile({
                      ...currentProfile,
                      isKidsProfile: !currentProfile.isKidsProfile
                    })}
                    className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      currentProfile.isKidsProfile ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                        currentProfile.isKidsProfile ? 'translate-x-7' : ''
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zona de peligro */}
            <div className="bg-red-900 bg-opacity-20 rounded-xl p-6 border border-red-800">
              <h2 className="text-xl font-semibold mb-6 text-red-400">Zona de peligro</h2>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-400">Eliminar perfil</h3>
                  <p className="text-gray-400 text-sm">Esta acción no se puede deshacer</p>
                </div>
                <button 
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de pestaña de Control Parental */}
        {activeTab === 'parental' && (
          <div className="space-y-8">
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6">Control parental</h2>
              <p className="text-gray-400 mb-6">
                Configura restricciones de contenido para este perfil
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Contenido para adultos</h3>
                    <p className="text-gray-400 text-sm">Permitir contenido clasificado para mayores de 18 años</p>
                  </div>
                  <div className="w-14 h-7 flex items-center bg-gray-600 rounded-full p-1 cursor-pointer">
                    <div className="bg-white w-5 h-5 rounded-full shadow-md"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Restricción por clasificación</h3>
                    <p className="text-gray-400 text-sm">Limitar contenido según clasificación de edad</p>
                  </div>
                  <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2">
                    <option>Todo público</option>
                    <option>13+</option>
                    <option>16+</option>
                    <option>18+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrashIcon className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-xl font-bold mb-2">¿Eliminar perfil?</h2>
              <p className="text-gray-400 mb-6">
                ¿Estás seguro de que quieres eliminar el perfil "{currentProfile.name}"? 
                Esta acción no se puede deshacer.
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirmation(false);
                    handleDeleteProfile();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 px-4 rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage;