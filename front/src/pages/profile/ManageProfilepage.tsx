import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

// Avatares
import mateoImage from '../../assets/BoyIcon.webp';
import andreImage from '../../assets/BoyIcon.webp';
import alejandraImage from '../../assets/GirlIcon.webp';

interface Profile {
  name: string;
  avatar: string;
}

const ManageProfilesScreen = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');

      if (!userEmail) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/user/profiles/${userEmail}`);
        if (!response.ok) throw new Error('Error al obtener perfiles');

        const data = await response.json();

        const avatarMap: Record<string, string> = {
          Mateo: mateoImage,
          Andre: andreImage,
          Alejandra: alejandraImage,
        };

        setProfiles(
          data.profiles.map((name: string) => ({
            name,
            avatar: avatarMap[name] || mateoImage,
          }))
        );
      } catch (error) {
        console.error(error);
        showNotification('error', 'No se pudieron cargar los perfiles.');
      }
    };

    fetchProfiles();
  }, [navigate]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleProfileClick = (profile: Profile) => {
    navigate(`/settings-profiles/${encodeURIComponent(profile.name)}`, { state: { profile } });
  };

  const handleDeleteProfile = async (profileName: string) => {
    if (!confirm(`¿Eliminar el perfil "${profileName}"?`)) return;

    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    if (!userEmail) return;

    try {
      setLoadingDelete(profileName);

      const response = await fetch(
        `http://127.0.0.1:8000/user/profiles/${userEmail}/${encodeURIComponent(profileName)}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Error al eliminar el perfil');

      setProfiles((prev) => prev.filter((p) => p.name !== profileName));
      showNotification('success', `Perfil "${profileName}" eliminado correctamente`);
    } catch (error) {
      console.error(error);
      showNotification('error', `No se pudo eliminar el perfil "${profileName}".`);
    } finally {
      setLoadingDelete(null);
    }
  };

  const handleDone = () => {
    navigate('/profiles');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-32 pb-12 px-4 relative">
      {/* Notificación */}
      {notification && (
        <div
          className={`fixed top-8 right-8 flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg text-white text-lg animate-slide-in 
          ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {notification.type === 'success' ? (
            <CheckCircleIcon className="w-6 h-6 text-white" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-white" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <h1 className="text-white text-4xl md:text-5xl font-semibold mb-16">
        Administrar perfiles
      </h1>

      <div className="flex flex-wrap justify-center gap-12 max-w-4xl">
        {profiles.map((profile) => (
          <div key={profile.name} className="flex flex-col items-center group">
            {/* Avatar y edición */}
            <div
              onClick={() => handleProfileClick(profile)}
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-4 border-4 border-transparent group-hover:border-blue-500 transition-all cursor-pointer"
            >
              <img
                src={profile.avatar}
                alt={`Perfil de ${profile.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-blue-600 p-2 md:p-3 rounded-full border-2 border-white shadow-lg">
                  <PencilIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </div>
            </div>

            <span className="text-lg md:text-xl text-gray-300 group-hover:text-white transition-colors">
              {profile.name}
            </span>

            {/* Botón eliminar */}
            <button
              onClick={() => handleDeleteProfile(profile.name)}
              className="mt-2 flex items-center gap-2 px-4 py-2 text-sm text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
              disabled={loadingDelete === profile.name}
            >
              <TrashIcon className="w-5 h-5" />
              {loadingDelete === profile.name ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        ))}
      </div>

      {/* Botón listo */}
      <button
        onClick={handleDone}
        className="mt-16 px-8 py-3 bg-blue-600 text-white text-lg md:text-xl font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Listo
      </button>

      {/* Animación */}
      <style>{`
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ManageProfilesScreen;
