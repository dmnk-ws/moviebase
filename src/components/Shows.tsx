import React from 'react';
import { Stack } from '@mui/material';
import PopularShows from './PopularShows';

const Shows = () => {
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
      </Stack>
    </Stack>
  );
};

export default Shows;
