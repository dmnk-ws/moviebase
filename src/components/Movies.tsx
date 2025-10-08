import { Stack } from '@mui/material';

import { MovieCard } from './index';
import { useAppSelector } from '../store/hooks';
import { selectMovies } from '../store/movieSlice';

const Movies = () => {
  const movies = useAppSelector((state) => selectMovies(state));

  if (!movies) return 'Loading...';

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
        <MovieCard key={movie.id} title={movie.title} imagePath={movie.imagePath} />
      ))}
    </Stack>
  );
};

export default Movies;
