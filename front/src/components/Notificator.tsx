import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 3000 
}) => {
  const [visible, setVisible] = useState(false);

 // Efecto para mostrar/ocultar la notificación
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); 
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

// Colores según el resultado
  const typeColors = {
    success: 'bg-gradient-to-r from-green-600 to-emerald-700',
    error: 'bg-gradient-to-r from-red-600 to-rose-700',
    info: 'bg-gradient-to-r from-blue-600 to-purple-700'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ease-out ${
      visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`${typeColors[type]} text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700 flex items-start max-w-sm`}>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 text-gray-300 hover:text-white focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;