import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import {
  UserIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface ProfileDropdownProps {
  userInitials: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userInitials,
  userName,
  userEmail,
  userAvatar,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('selectedProfile');
    localStorage.removeItem('userEmail');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('selectedProfileName');
    navigate('/login');
  };

  const handleManageProfiles = () => {
    setIsOpen(false);
    navigate('/admin-profiles'); // Cambia si usas otra ruta
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full overflow-hidden border border-gray-600 flex items-center justify-center bg-gray-700 text-white text-sm font-semibold hover:border-white transition-all"
        title={userName}
      >
        {userAvatar ? (
          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
        ) : (
          userInitials
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-white font-medium">{userName}</p>
            <p className="text-gray-400 text-sm">{userEmail}</p>
          </div>

          <div className="py-1">
            <Link
              to="/account"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition"
            >
              <UserIcon className="w-5 h-5" /> Cuenta
            </Link>

            <Link
              to="/help"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition"
            >
              <QuestionMarkCircleIcon className="w-5 h-5" /> Centro de ayuda
            </Link>

            <button
              onClick={handleManageProfiles}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition"
            >
              <UsersIcon className="w-5 h-5" /> Administrar perfiles
            </button>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <ConfirmationModal
          message="¿Estás seguro de que quieres cerrar sesión en FilmPeak?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileDropdown;
