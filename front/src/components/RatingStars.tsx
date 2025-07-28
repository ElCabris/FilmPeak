import React from 'react';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <svg 
                key={i} 
                className="w-4 h-4 text-yellow-400 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative w-4 h-4">
                <svg 
                  className="w-4 h-4 text-gray-400 fill-current" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                </svg>
                <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                  <svg 
                    className="w-4 h-4 text-yellow-400 fill-current" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                  </svg>
                </div>
              </div>
            );
          } else {
            return (
              <svg 
                key={i} 
                className="w-4 h-4 text-gray-400 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
              </svg>
            );
          }
        })}
      </div>
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;