import { Stack } from '@mui/material';

import { MovieCard } from './';
import { Movie } from '../services/MediaApi';

interface MoviesProps {
  movies: Movie[];
}

const Movies = ({ movies }: MoviesProps) => {
  if (!movies?.length) return 'Loading...';

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center' },
        alignItems: { xs: 'center' },
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          description={movie.description}
          imagePath={movie.imagePath}
        />
      ))}
    </Stack>
  );
};

export default Movies;
