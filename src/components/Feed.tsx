import { useEffect } from 'react';
import { Stack, Box } from '@mui/material';

import { Movies, Shows } from './';
import { useAppDispatch } from '../store/hooks';
import { fetchPopularMovies } from '../store/movieSlice';
import { fetchPopularShows } from '../store/showSlice';

const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchPopularShows());
  }, [dispatch]);

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center' },
        alignItems: { xs: 'center' },
      }}
    >
      <Box
        p={{ xs: 0, md: 2 }}
        sx={{
          overflowY: 'auto',
          height: '90vh',
          flex: 2,
          width: { md: 'auto', sm: '600px', xs: '320px' },
        }}
      >
        <Movies />
        <Shows />
      </Box>
    </Stack>
  );
};

export default Feed;
