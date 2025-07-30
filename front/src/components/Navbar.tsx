import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import ConfirmationModal from './ConfirmationModal';

const Navbar: React.FC = () => {
  const profileName = sessionStorage.getItem('selectedProfileName') || 'Usuario';
  const initial = profileName.charAt(0).toUpperCase();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleChangeProfile = () => {
    navigate('/profiles');
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-black to-transparent z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-10">
            <img src={logo} alt="FilmPeak Logo" className="h-20 object-contain" />
          </Link>

          <div className="hidden md:flex space-x-8">
            {['Inicio', 'Clasicos', 'Categorias', 'Novedades populares', 'Explora por idiomas'].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Dropdown perfil */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:bg-blue-700 transition-all"
            onClick={toggleDropdown}
            title={profileName}
          >
            {initial}
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 text-sm border-b border-gray-700">
                Perfil: <strong>{profileName}</strong>
              </div>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleChangeProfile();
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
              >
                Cambiar perfil
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setShowLogoutModal(true); // Mostrar modal
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-red-400"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {showLogoutModal && (
        <ConfirmationModal
          message="¿Estás seguro de que deseas cerrar sesión?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
