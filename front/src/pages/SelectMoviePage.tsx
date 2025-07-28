import React from 'react';
import Navbar from '../components/Navbar';
import ContentSection from '../components/ContentSection';

const HomePage: React.FC = () => {
  // Datos de ejemplo
  const longTermPlans = [
    { id: '1', title: 'TU PIOXÍTICA', description: 'DÁJECO CÁLCARA', rating: 4.7 },
    { id: '2', title: 'DESCUBRÍAMENTO SALARIA', description: 'DESCUBRÍAMENTO SALARIA', rating: 4.3 },
  ];

  const nextStory = [
    { id: '3', title: 'STRANGER THINGS', description: 'Películas emocionantes', rating: 4.9, featured: true }
  ];

  const popularNews = [
    { id: '4', title: 'DARK', description: 'Suspenso alemán', rating: 4.8 },
    { id: '5', title: 'THE CROWN', description: 'Drama histórico', rating: 4.6 },
    { id: '6', title: 'LUCIFER', description: 'Fantasía criminal', rating: 4.5 },
    { id: '7', title: 'MONEY HEIST', description: 'Acción y suspenso', rating: 4.7 },
  ];

  const games = [
    { id: '8', title: 'CYBERPUNK', description: 'Aventura futurista', rating: 4.2 },
    { id: '9', title: 'THE WITCHER', description: 'Fantasía épica', rating: 4.9 },
    { id: '10', title: 'MINECRAFT', description: 'Sandbox creativo', rating: 4.8 },
  ];

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