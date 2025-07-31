import React from 'react';
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
  
  // Perfiles base
  const [profiles] = React.useState<Profile[]>(location.state?.profiles || [
    { name: 'Mateo', avatar: mateoImage, isKidsProfile: false },
    { name: 'Andre', avatar: andreImage, isKidsProfile: false },
    { name: 'Alejandra', avatar: alejandraImage, isKidsProfile: false }
  ]);

  const handleDeleteProfile = (profileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Eliminar perfil: ${profileName}`);
    // Aquí iría la lógica para eliminar el perfil de la base de datos
    // alert(`Perfil "${profileName}" eliminado`);
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