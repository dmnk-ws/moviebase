import { Stack } from '@mui/material';

import { ShowCard } from './';
import { useAppSelector } from '../store/hooks';
import { selectShows } from '../store/showSlice';

const Shows = () => {
  const shows = useAppSelector((state) => selectShows(state));

  if (!shows) return 'Loading...';

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
      {shows.map((show) => (
        <ShowCard key={show.id} name={show.name} imagePath={show.imagePath} />
      ))}
    </Stack>
  );
};

export default Shows;
