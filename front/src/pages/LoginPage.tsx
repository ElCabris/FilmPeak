import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLogin from '../components/NavbarLogin';
import Footer from '../components/Footer';
import { FingerPrintIcon } from '@heroicons/react/24/solid';

const FilmPeakLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  // Redirección a suscripción
  const handleStartSubscription = () => {
    navigate('/');
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'El correo es requerido';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    // Validación de contraseña
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrors({ password: 'Correo o contraseña incorrectos' });
        } else {
          const errorText = await response.text();
          console.error(`Login error: ${response.status}: ${errorText}`);
          alert('Error al iniciar sesión. Intenta nuevamente.');
        }
        return;
      }

      const data = await response.json();
      const { access_token, token_type } = data;

      // Guardar token (puedes usar sessionStorage, localStorage o context)
      sessionStorage.setItem('accessToken', access_token);
      sessionStorage.setItem('tokenType', token_type);

      // Marcar como autenticado y redirigir
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/profiles');

    } catch (err) {
      console.error('Error de red:', err);
      alert('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/95 to-black/90 text-white flex flex-col">
      {/* Navbar */}
      <NavbarLogin />

      {/* Contenido principal */}
      <main className="flex-grow flex items-start justify-center px-4 pt-32 md:pt-40 pb-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-900 bg-opacity-95 rounded-xl p-8 shadow-lg border border-gray-800"
        >
          {/* Icono */}
          <div className="flex justify-center mb-4">
            <FingerPrintIcon className="w-12 h-12 text-blue-400" />
          </div>

          <h1 className="text-3xl font-bold text-center mb-8">Iniciar sesión</h1>

          {/* Campo email */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600`}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Campo password */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600`}
              placeholder="**********"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Botón login */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-xl font-semibold text-lg tracking-wide transition-all transform hover:scale-105 shadow-lg mb-6 cursor-pointer flex items-center justify-center"
          >
            Iniciar sesión
          </button>

          {/* Recordarme y ayuda */}
          <div className="flex justify-between items-center text-sm text-gray-400 mb-8">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600 cursor-pointer" />
              <span>Recuérdame</span>
            </label>
            <a href="#" className="hover:underline">¿Necesitas ayuda?</a>
          </div>

          {/* Suscripción */}
          <div className="text-center mb-6 text-gray-400 text-sm">
            ¿Primera vez en FilmPeak?
            <button
              type="button"
              onClick={handleStartSubscription}
              className="text-white hover:underline ml-1 cursor-pointer"
            >
              Suscríbete ya.
            </button>
          </div>

          {/* Recaptcha */}
          <p className="text-xs text-gray-500 text-center">
            Este sitio está protegido por Google reCAPTCHA para comprobar que no eres un robot.
          </p>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FilmPeakLoginPage;
