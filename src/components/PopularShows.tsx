import { MediaCard, Carousel } from './';
import { useAppSelector } from '../store/hooks';
import { selectShows } from '../store/showSlice';
import { Stack, Typography } from '@mui/material';

const PopularShows = () => {
  const shows = useAppSelector((state) => selectShows(state));

  if (!shows) return 'Loading...';

  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="white">
        Popular Series
      </Typography>
      <Carousel>
        {shows.map((show) => (
          <MediaCard key={show.id} alt={show.name} imagePath={show.imagePath} />
        ))}
      </Carousel>
    </Stack>
  );
};

export default PopularShows;
