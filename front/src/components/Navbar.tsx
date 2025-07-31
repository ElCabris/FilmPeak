import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import ConfirmationModal from './ConfirmationModal';

const Navbar: React.FC = () => {
  const storedProfileName = sessionStorage.getItem('selectedProfileName');
  const profileName = storedProfileName && storedProfileName !== "null" ? storedProfileName : 'Perfil';
  const initial = profileName.charAt(0).toUpperCase();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

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
    <nav className="fixed top-0 w-full left-0 bg-gradient-to-b from-black/90 via-black/80 to-black/50 z-50 px-2 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <img 
              src={logo} 
              alt="FilmPeak Logo" 
              className="h-20 md:h-24 object-contain"
            />
          </Link>
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
            <div className="absolute right-0 mt-2 w-52 bg-gray-800 text-white rounded-lg shadow-lg z-50">
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
                  setShowLogoutModal(true);
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
