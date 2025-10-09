import React from 'react';
import { Stack } from '@mui/material';
import { TrendingShows } from './index';

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
        <TrendingShows />
      </Stack>
    </Stack>
  );
};

export default Shows;
