import { useState, useEffect } from 'react';
import TMDB from '../services/TMDB';

export const useRandomBackdrop = (): string | null => {
  const [backdropUrl, setBackdropUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomBackdrop = async () => {
      try {
        const tmdb = TMDB.getInstance();

        // Fetch both trending movies and shows in parallel
        const [movies, shows] = await Promise.all([
          tmdb.getTrendingMovies({ timeWindow: 'week' }),
          tmdb.getTrendingShows({ timeWindow: 'week' }),
        ]);

        // Combine all backdrops that are not null
        const allBackdrops = [
          ...movies.map((movie) => movie.backdropPath),
          ...shows.map((show) => show.backdropPath),
        ].filter((backdrop): backdrop is string => backdrop !== null);

        // Select a random backdrop
        if (allBackdrops.length > 0) {
          const randomIndex = Math.floor(Math.random() * allBackdrops.length);
          setBackdropUrl(allBackdrops[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching random backdrop:', error);
      }
    };

    fetchRandomBackdrop();
  }, []); // Empty dependency array means this runs once on mount

  return backdropUrl;
};
