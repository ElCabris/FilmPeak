import React from 'react';
import RatingStars from './RatingStars';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  rating: number;
  featured?: boolean;
}

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  items: ContentItem[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, subtitle, items }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-gray-400 mb-6">{subtitle}</p>}
      
      <div className={`grid ${items.length > 1 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''} gap-6`}>
        {items.map((item) => (
          <div 
            key={item.id}
            className={`bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105 ${item.featured ? 'md:col-span-2' : ''}`}
          >
            {/* Placeholder para la imagen */}
            <div className={`${item.featured ? 'h-64' : 'h-48'} bg-gradient-to-r from-purple-900 to-blue-800 relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-center px-2">{item.title}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 truncate">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
              <RatingStars rating={item.rating} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentSection;