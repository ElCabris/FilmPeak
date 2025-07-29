import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavbarSignup from '../../components/NavbarSignupFirst';
import { EyeIcon, EyeSlashIcon, DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

const FilmPeakAccountSetup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; username?: string; password?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; username?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Ingresa un correo válido';
    }

    if (!username) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (username.length < 3) {
      newErrors.username = 'Debe tener al menos 3 caracteres';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData);
        alert('Error al registrarse: ' + (errorData.detail || 'Intenta de nuevo'));
        return;
      }

      // Guardar en localStorage si es exitoso
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userUsername', username);
      localStorage.setItem('userPassword', password);

      // Navegar a siguiente pantalla
      navigate('/SelectPlan');

    } catch (err) {
      console.error('Error de red o del servidor:', err);
      alert('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/100 via-black/92 to-black/90 text-white flex flex-col">
      <NavbarSignup />

      <main className="flex-grow flex items-center justify-center px-4 py-8 mt-24">
        <div className="p-8 w-full max-w-md">

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

            {/* Campo de nombre de usuario */}
            <div className="mb-6">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full p-4 border ${errors.username ? 'border-blue-500' : 'border-gray-300'
                  } rounded text-white bg-black/50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600`}
                placeholder="Nombre de usuario"
              />
              {errors.username && (
                <p className="text-blue-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Campo de email */}
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-4 border ${errors.email ? 'border-blue-500' : 'border-gray-300'
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
                className={`w-full p-4 pr-12 border ${errors.password ? 'border-blue-500' : 'border-gray-300'
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
