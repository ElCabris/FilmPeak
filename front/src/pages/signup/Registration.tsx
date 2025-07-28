import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavbarSignup from '../../components/NavbarSignupFirst';
import { EyeIcon, EyeSlashIcon, DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

const FilmPeakAccountSetup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  // Recuperar el correo de localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Validaciones
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Ingresa un correo válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex flex-col">
      <NavbarSignup />

      <main className="flex-grow flex items-center justify-center px-4 py-8 mt-24">
        <div className="p-8 w-full max-w-md">
          
          {/* Ícono de dispositivos */}
          <div className="flex justify-center mb-6">
            <ComputerDesktopIcon className="h-12 w-12 text-blue-500 mr-3" />
            <DevicePhoneMobileIcon className="h-12 w-12 text-blue-500" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Completa la configuración de tu cuenta
            </h1>
            <p className="text-lg mb-6">
              Filmpick está personalizado para ti.<br />
              Ingresa o edita tu correo y crea una contraseña para comenzar a ver Filmpick.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full">
            {/* Campo de email */}
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-4 border ${
                  errors.email ? 'border-blue-500' : 'border-gray-300'
                } rounded text-white bg-black/50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600`}
                placeholder="Correo electrónico"
              />
              {errors.email && (
                <p className="text-blue-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Campo de contraseña */}
            <div className="mb-6 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-4 pr-12 border ${
                  errors.password ? 'border-blue-500' : 'border-gray-300'
                } rounded text-white bg-black/50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600`}
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeIcon className="h-6 w-6" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6" />
                )}
              </button>
              {errors.password && (
                <p className="text-blue-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded font-bold text-lg text-white transition duration-200 cursor-pointer"
            >
              Siguiente
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FilmPeakAccountSetup;