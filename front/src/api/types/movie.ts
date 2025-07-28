export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  duration: number; 
  genres: string[];
  director: string;
  cast: string[];
  rating: number;
  posterUrl: string;
  backdropUrl: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MovieListResponse {
  movies: Movie[];
  total: number;
  page: number;
  perPage: number;
}