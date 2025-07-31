import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface Profile {
  name: string;
  avatar: string;
  isKidsProfile: boolean;
}

const ManageProfilesScreen = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    
    if (!userEmail) {
      console.error('Email de usuario no encontrado');
      navigate('/login');
      return;
    }

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

      // Transformar los perfiles del backend al formato del frontend
      const formattedProfiles: Profile[] = fetchedProfiles.map((p: any) => ({
        name: p.profile_name,
        avatar: p.image || '', // Si no hay imagen, usar string vacío
        isKidsProfile: false // Por ahora hardcodeado, se puede extender después
      }));

      setProfiles(formattedProfiles);
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setError('Ocurrió un error al cargar los perfiles.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async (profileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileToDelete(profileName);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteProfile = async () => {
    if (!profileToDelete) return;

    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    if (!userEmail) {
      setError('No se encontró el correo del usuario');
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`http://127.0.0.1:8000/user/profiles?email=${encodeURIComponent(userEmail)}&profile=${encodeURIComponent(profileToDelete)}`, {
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

      // Recargar los perfiles desde el backend
      await fetchProfiles();

      // Cerrar el modal
      setShowDeleteConfirmation(false);
      setProfileToDelete(null);

    } catch (error) {
      console.error('Error en la conexión:', error);
      setError('Ocurrió un error al intentar eliminar el perfil');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditProfile = (profileName: string) => {
    // Navegar a la página de editar perfil
    navigate(`/profile-settings/${encodeURIComponent(profileName)}`);
  };

  const handleBack = () => {
    navigate('/profiles');
  };

  const handleDone = () => {
    navigate('/profiles');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-lg">Cargando perfiles...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <div className="space-y-4">
            <button 
              onClick={fetchProfiles}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors mr-4"
            >
              Reintentar
            </button>
            <button 
              onClick={handleBack}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center p-6 border-b border-gray-800">
        <button 
          onClick={handleBack}
          className="mr-4 p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Administrar perfiles</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {profiles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">No hay perfiles disponibles</div>
            <button 
              onClick={() => navigate('/edit-profile')}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
            >
              Crear primer perfil
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
              {profiles.map((profile) => (
                <div 
                  key={profile.name}
                  className="flex flex-col items-center group"
                >
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                      {profile.avatar ? (
                        <img 
                          src={profile.avatar} 
                          alt={`Perfil de ${profile.name}`} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        profile.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    
                    {/* Overlay con botones de acción */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProfile(profile.name)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                          title="Editar perfil"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteProfile(profile.name, e)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                          title="Eliminar perfil"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-lg text-gray-300 font-medium text-center">
                    {profile.name}
                  </span>
                  
                  {profile.isKidsProfile && (
                    <span className="text-sm text-yellow-400 mt-1">
                      Perfil para niños
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button 
                className="px-8 py-3 bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-colors rounded-lg"
                onClick={handleDone}
              >
                Listo
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirmation && profileToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-white text-2xl" />
              </div>
              
              <h2 className="text-xl font-bold mb-2 text-white">¿Eliminar perfil?</h2>
              <p className="text-gray-400 mb-6">
                ¿Estás seguro de que quieres eliminar el perfil "{profileToDelete}"? 
                Esta acción no se puede deshacer.
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirmation(false);
                    setProfileToDelete(null);
                  }}
                  disabled={isDeleting}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteProfile}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfilesScreen;
