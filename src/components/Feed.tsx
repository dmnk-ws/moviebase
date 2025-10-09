import { Stack } from '@mui/material';
import { TrendingMovies, TrendingShows } from './index';

const Feed = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center' },
        alignItems: { xs: 'center' },
        paddingX: 2,
      }}
    >
      <Stack
        spacing={{ xs: 2, md: 10 }}
        sx={{
          mx: { xs: 0, md: 25, '2xl': 'auto' },
          maxWidth: '1280px',
          mt: { xs: 2, md: 10 },
          width: '100%',
        }}
      >
        <TrendingMovies />
        <TrendingShows />
      </Stack>
    </Stack>
  );
};

export default Feed;
