import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Avatares
import mateoImage from '../assets/BoyIcon.webp';
import andreImage from '../assets/BoyIcon.webp';
import alejandraImage from '../assets/GirlIcon.webp';

interface Profile {
  name: string;
  avatar: string;
}

const ProfileSelectionScreen = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const MAX_PROFILES = 5;

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
          'Mateo': mateoImage,
          'Andre': andreImage,
          'Alejandra': alejandraImage,
        };

        const updatedProfiles: Profile[] = data.profiles.map((name: string) => ({
          name,
          avatar: avatarMap[name] || mateoImage,
        }));

        setProfiles(updatedProfiles);
      } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los perfiles.');
      }
    };

    fetchProfiles();
  }, [navigate]);

  const handleProfileSelect = (profileName: string) => {
    navigate('/SelectMovie');
  };

  const handleAddProfile = () => {
    if (profiles.length >= MAX_PROFILES) {
      alert(`Máximo ${MAX_PROFILES} perfiles`);
      return;
    }
    navigate('/EditProfile');
  };

  const handleManageProfiles = () => {
    navigate('/admin-profiles');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-40 pb-12 px-4">
      <h1 className="text-white text-4xl md:text-5xl font-semibold mb-20">
        ¿Quién está viendo ahora?
      </h1>

      {/* Lista de Perfiles */}
      <div className="flex flex-wrap justify-center gap-10 max-w-4xl">
        {profiles.map((profile) => (
          <div
            key={profile.name}
            onClick={() => handleProfileSelect(profile.name)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-transparent group-hover:border-white transition-all mb-4">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-lg md:text-xl text-gray-300 group-hover:text-white transition-colors">
              {profile.name}
            </span>
          </div>
        ))}

        {/* Agregar perfil */}
        {profiles.length < MAX_PROFILES && (
          <div
            onClick={handleAddProfile}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-800 flex items-center justify-center border-4 border-transparent group-hover:border-gray-600 transition-all mb-4">
              <span className="text-5xl md:text-6xl text-gray-500 group-hover:text-gray-400">+</span>
            </div>
            <span className="text-lg md:text-xl text-gray-500 group-hover:text-gray-400">
              Agregar perfil
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full max-w-md border-t border-gray-700 my-12"></div>

      {/* Botón administrar */}
      <button
        onClick={handleManageProfiles}
        className="px-6 py-2 border-2 border-gray-700 text-gray-400 text-lg hover:border-white hover:text-white transition-colors"
      >
        Administrar perfiles
      </button>
    </div>
  );
};

export default ProfileSelectionScreen;