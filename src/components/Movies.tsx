import React from 'react';
import { Stack } from '@mui/material';
import PopularMovies from './PopularMovies';

const Movies = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center' },
        alignItems: { xs: 'center' },
      }}
    >
      <Stack spacing={10} maxWidth="90%" marginTop={5}>
        <PopularMovies />
      </Stack>
    </Stack>
  );
};

export default Movies;
