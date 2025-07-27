import React, { useState } from 'react';
import logo from '../assets/logo.webp';
import { useNavigate } from 'react-router-dom'; 

const FilmPeakLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    // Validación de email
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

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí normalmente haríamos una petición a la API para autenticar
      // Pero por ahora simularemos una autenticación exitosa
      
      // Guardar estado de autenticación (en un caso real usaríamos context, Redux o localStorage)
      sessionStorage.setItem('isAuthenticated', 'true');
      
      // Redirigir a la página de selección de perfiles
      navigate('/profiles');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="px-4 md:px-16 py-5 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="FilmPeak" 
            className="h-50 md:h-46" 
          />
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-black bg-opacity-80 p-8 rounded-md w-full max-w-md border border-gray-800">
          <h1 className="text-3xl font-bold mb-8">Iniciar sesión</h1>
          
          <div className="mb-6">
            <div className="flex flex-col space-y-1 mb-4">
              <div className="text-gray-400 text-sm">Correo electrónico:</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 bg-gray-900 border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-600`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div className="flex flex-col space-y-1">
              <div className="text-gray-400 text-sm">Contraseña:</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 bg-gray-900 border ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                } rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-600`}
                placeholder="**********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-700 py-3 rounded font-bold text-lg transition duration-200 mb-6"
          >
            Iniciar sesión
          </button>
          
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-400">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2 accent-blue-600" />
                <span>Recuérdame</span>
              </div>
            </div>
            <a href="#" className="text-gray-300 hover:underline text-sm">
              ¿Necesitas ayuda?
            </a>
          </div>
          
          <div className="text-center mb-8">
            <div className="text-gray-500 text-lg mb-1">
              ¿Primera vez en FilmPeak? 
              <a href="#" className="text-white hover:underline ml-1">Suscríbete ya.</a>
            </div>
            <div className="text-xs text-gray-600">
              Este sitio está protegido por Google reCAPTCHA para comprobar que no eres un robot.
            </div>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-90 px-4 md:px-16 py-6 text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="text-gray-500 mb-4">¿Preguntas? Llama al 01 800 917 1564</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <a href="#" className="hover:underline">Preguntas frecuentes</a>
              <a href="#" className="hover:underline">Centro de ayuda</a>
              <a href="#" className="hover:underline">Términos de uso</a>
              <a href="#" className="hover:underline">Privacidad</a>
              <a href="#" className="hover:underline">Preferencias de cookies</a>
              <a href="#" className="hover:underline">Información corporativa</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4 text-center">
            © 2025 FilmPeak, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FilmPeakLoginPage;