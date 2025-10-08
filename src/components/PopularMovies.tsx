import { MediaCard, Carousel } from './index';
import { useAppSelector } from '../store/hooks';
import { selectMovies } from '../store/movieSlice';
import { Stack, Typography } from '@mui/material';

const PopularMovies = () => {
  const movies = useAppSelector((state) => selectMovies(state));

  if (!movies) return 'Loading...';

  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="white">
        Popular Movies
      </Typography>
      <Carousel>
        {movies.map((movie) => (
          <MediaCard key={movie.id} alt={movie.title} imagePath={movie.imagePath} />
        ))}
      </Carousel>
    </Stack>
  );
};

export default PopularMovies;
