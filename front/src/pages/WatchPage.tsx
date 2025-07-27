// src/pages/WatchPage.tsx
import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { useNavigate, useParams } from 'react-router-dom';

// Datos simulados de contenido
const mockContent = {
  id: '123',
  title: 'El Gran Escape',
  subtitle: 'Una aventura épica en el corazón de la selva',
  description: 'Un grupo de exploradores se adentra en la selva en busca de una ciudad perdida, enfrentando peligros y descubriendo secretos ancestrales en su camino.',
  year: 2023,
  duration: '2h 15m',
  genres: ['Aventura', 'Acción', 'Drama'],
  cast: ['John Smith', 'Emma Johnson', 'Michael Brown'],
  director: 'Sarah Williams',
  rating: 4.8,
  seasons: 3,
  episodes: 24
};

const WatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Funciones para cambiar de episodio
  const nextEpisode = () => {
    console.log('Siguiente episodio');
    // Lógica para cargar el siguiente episodio
  };
  
  const prevEpisode = () => {
    console.log('Episodio anterior');
    // Lógica para cargar el episodio anterior
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <VideoPlayer 
        title={mockContent.title}
        subtitle={mockContent.subtitle}
        nextEpisode={nextEpisode}
        prevEpisode={prevEpisode}
      />
      
      {/* Información del contenido */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-green-500 font-semibold">98% para ti</span>
              <span>{mockContent.year}</span>
              <span className="border border-gray-600 px-2 py-1 text-sm">HD</span>
              <span className="border border-gray-600 px-2 py-1 text-sm">5.1</span>
              <span>{mockContent.duration}</span>
            </div>
            
            <p className="text-gray-300 mb-6">{mockContent.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-gray-500 mb-2">Reparto:</h3>
                <p>{mockContent.cast.join(', ')}</p>
              </div>
              <div>
                <h3 className="text-gray-500 mb-2">Géneros:</h3>
                <div className="flex flex-wrap gap-2">
                  {mockContent.genres.map(genre => (
                    <span 
                      key={genre} 
                      className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Episodios</h3>
                <span>Temporada 1</span>
              </div>
              
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="flex items-center space-x-3 p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded cursor-pointer transition-colors"
                    onClick={() => navigate(`/watch/${id}?episode=${i+1}`)}
                  >
                    <div className="bg-gray-700 w-16 h-16 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium">Episodio {i+1}</h4>
                      <p className="text-sm text-gray-400">45 min</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;