import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mateoImage from '../assets/BoyIcon.webp';
import andreImage from '../assets/BoyIcon.webp';
import alejandraImage from '../assets/GirlIcon.webp';

interface Profile {
  name: string;
  avatar: string;
  isKidsProfile: boolean;
}

const ProfileSelectionScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profiles, setProfiles] = useState<Profile[]>([
    { name: 'Mateo', avatar: mateoImage, isKidsProfile: false },
    { name: 'Andre', avatar: andreImage, isKidsProfile: false },
    { name: 'Alejandra', avatar: alejandraImage, isKidsProfile: false }
  ]);

  const MAX_PROFILES = 5;

  // Efecto para manejar nuevos perfiles creados
  useEffect(() => {
    const fetchProfiles = async () => {
      const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');

      if (!userEmail) {
        console.error('Email de usuario no encontrado');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/user/profiles/${userEmail}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error al obtener perfiles: ${response.status} - ${errorText}`);
          alert('No se pudieron cargar los perfiles');
          return;
        }

        const data = await response.json();
        const fetchedProfiles = data.profiles;

        const defaultAvatar = mateoImage; // Imagen por defecto si no hay imagen

        const updatedProfiles: Profile[] = fetchedProfiles.map((p: any) => ({
          name: p.profile_name,
          avatar: p.image ?? defaultAvatar,
          isKidsProfile: false,
        }));

        setProfiles(updatedProfiles);
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        alert('Ocurrió un error al cargar los perfiles.');
      }
    };

    fetchProfiles();
  }, [navigate]);


  const handleProfileSelect = (profileName: string) => {
    console.log(`Perfil seleccionado: ${profileName}`);
    navigate('/SelectMovie');
  };

  const handleAddProfile = () => {
    if (profiles.length >= MAX_PROFILES) {
      alert(`No puedes tener más de ${MAX_PROFILES} perfiles`);
      return;
    }
    navigate('/EditProfile');
  };

  const handleManageProfiles = () => {
    navigate('/admin-profiles');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-64 pb-12 px-4">
      <h1 className="text-white text-5xl font-medium mb-32">
        ¿Quién está viendo ahora?
      </h1>

      <div className="flex flex-wrap justify-center gap-12 max-w-4xl">
        {profiles.map((profile) => (
          <div
            key={profile.name}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleProfileSelect(profile.name)}
          >
            <div className="w-32 h-32 rounded-full border-4 border-transparent group-hover:border-white transition-all mb-4 overflow-hidden">
              <img
                src={profile.avatar}
                alt={`Perfil de ${profile.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl text-gray-300 group-hover:text-white transition-colors">
              {profile.name}
            </span>
          </div>
        ))}

        {profiles.length < MAX_PROFILES && (
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
        )}
      </div>

      <div className="w-full max-w-md border-t border-gray-700 my-12"></div>

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
