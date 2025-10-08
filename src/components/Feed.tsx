import { useEffect } from 'react';
import { Stack } from '@mui/material';

import { PopularMovies, PopularShows } from './';
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
      <Stack spacing={10} maxWidth="90%" marginTop={5}>
        <PopularShows />
        <PopularMovies />
      </Stack>
    </Stack>
  );
};

export default Feed;
