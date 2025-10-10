import React from 'react';
import { Typography } from '@mui/material';
import { Layout } from './index';

const TopRatedMovies = () => {
  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ color: 'white' }}>
        Top Rated Movies
      </Typography>
    </Layout>
  );
};

export default TopRatedMovies;
