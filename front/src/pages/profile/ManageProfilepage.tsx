import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import mateoImage from '../../assets/BoyIcon.webp';
import andreImage from '../../assets/BoyIcon.webp';
import alejandraImage from '../../assets/GirlIcon.webp';

interface Profile {
  name: string;
  avatar: string;
  isKidsProfile: boolean;
}

const ManageProfilesScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profiles, setProfiles] = useState<Profile[]>(location.state?.profiles || [
    { name: 'Mateo', avatar: mateoImage, isKidsProfile: false },
    { name: 'Andre', avatar: andreImage, isKidsProfile: false },
    { name: 'Alejandra', avatar: alejandraImage, isKidsProfile: false }
  ]);

  const handleDeleteProfile = async (profileName: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    if (!userEmail) {
      alert('No se encontró el correo del usuario');
      return;
    }

    const confirmDelete = window.confirm(`¿Seguro que deseas eliminar el perfil "${profileName}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/user/profiles?email=${encodeURIComponent(userEmail)}&profile=${encodeURIComponent(profileName)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error al eliminar perfil: ${response.status} - ${errorText}`);
        alert('No se pudo eliminar el perfil');
        return;
      }

      alert(`Perfil "${profileName}" eliminado correctamente`);

      // Filtra el perfil eliminado y actualiza el estado
      const updatedProfiles = profiles.filter(p => p.name !== profileName);
      setProfiles(updatedProfiles);

      // Si no quedan perfiles, redirige inmediatamente
      if (updatedProfiles.length === 0) {
        navigate('/profiles');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('Ocurrió un error al intentar eliminar el perfil');
    }
  };

  const handleDone = () => {
    navigate('/profiles');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-32 pb-12 px-4">
      <h1 className="text-white text-5xl font-medium mb-16">
        Administrar perfiles
      </h1>

      <div className="flex flex-wrap justify-center gap-16 max-w-4xl">
        {profiles.map((profile) => (
          <div 
            key={profile.name}
            className="flex flex-col items-center"
          >
            <div className="relative w-48 h-48 rounded-full mb-4 overflow-hidden">
              <img 
                src={profile.avatar} 
                alt={`Perfil de ${profile.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <span className="text-2xl text-gray-300 font-medium mb-4">
              {profile.name}
            </span>
            
            <button
              className="flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              onClick={(e) => handleDeleteProfile(profile.name, e)}
            >
              <FaTrash className="text-white" />
              <span>Borrar</span>
            </button>
          </div>
        ))}
      </div>

      <button 
        className="mt-20 px-12 py-4 bg-blue-600 text-white text-xl font-medium hover:bg-blue-700 transition-colors rounded-lg"
        onClick={handleDone}
      >
        Listo
      </button>
    </div>
  );
};

export default ManageProfilesScreen;
