import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContentSection from '../components/ContentSection';

interface Movie {
  id: number;
  name: string;
  description: string | null;
  year: number | null;
  duration_minutes: number;
  score: number;
  genre: string;
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/movie/getall')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar películas:', err);
        setLoading(false);
      });
  }, []);

  const handleMovieClick = (movie: Movie) => {
    navigate(`/watch/${movie.id}`, { state: { movie } });
  };

  const mapMoviesWithClick = (movies: Movie[], count: number, featured = false) => {
    return getRandomItems(movies, count).map(movie => ({
      id: String(movie.id),
      title: movie.name,
      description: movie.description || '',
      rating: movie.score,
      featured,
      onClick: () => handleMovieClick(movie)
    }));
  };

  if (loading) {
    return <div className="text-white text-center mt-32">Cargando contenido...</div>;
  }

  const longTermPlans = mapMoviesWithClick(movies, 2);
  const nextStory = mapMoviesWithClick(movies, 1, true);
  const popularNews = mapMoviesWithClick(movies, 4);
  const games = mapMoviesWithClick(movies, 3);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <ContentSection 
            title="Planes a largo plazo" 
            subtitle="Continuar viendo contenido de Andre"
            items={longTermPlans}
          />
          
          <div className="border-t border-gray-800 my-8"></div>
          
          <ContentSection 
            title="Tu próxima historia" 
            items={nextStory}
          />
          
          <div className="border-t border-gray-800 my-8"></div>
          
          <ContentSection 
            title="Novedades populares" 
            items={popularNews}
          />
          
          <div className="border-t border-gray-800 my-8"></div>
          
          <ContentSection 
            title="Juegos" 
            items={games}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
