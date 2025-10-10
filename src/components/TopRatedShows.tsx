import React from 'react';
import { Typography } from '@mui/material';
import { Layout } from './index';

const TopRatedShows = () => {
  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ color: 'white' }}>
        Top Rated Shows
      </Typography>
    </Layout>
  );
};

export default TopRatedShows;
