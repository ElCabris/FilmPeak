import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

interface Movie {
  id: number;
  name: string;
  description: string | null;
  year: number | null;
  duration_minutes: number;
  score: number;
  genre: string;
}

const WatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie as Movie | undefined;

  if (!movie) {
    return <div className="text-white text-center mt-32">No se encontró la información de la película.</div>;
  }

  const nextEpisode = () => {
    console.log('Siguiente episodio');
  };

  const prevEpisode = () => {
    console.log('Episodio anterior');
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <VideoPlayer
        title={movie.name}
        videoSrc={`http://127.0.0.1:8000/movie/watch/${movie.id}`}
        subtitle={movie.genre}
        nextEpisode={nextEpisode}
        prevEpisode={prevEpisode}
      />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-green-500 font-semibold">★ {movie.score}</span>
              <span>{movie.year || 'Año desconocido'}</span>
              <span className="border border-gray-600 px-2 py-1 text-sm">HD</span>
              <span className="border border-gray-600 px-2 py-1 text-sm">5.1</span>
              <span>{movie.duration_minutes} min</span>
            </div>

            <p className="text-gray-300 mb-6">{movie.description || 'Sin descripción disponible.'}</p>

            <div>
              <h3 className="text-gray-500 mb-2">Género:</h3>
              <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                {movie.genre}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
