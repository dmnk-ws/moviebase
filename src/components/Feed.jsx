import { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';

import { Movies, Shows } from './';
import { fetchFromApi } from '../assets/js/fetchFromApi';

const Feed = () => {
  //const [category, setCategory] = useState(trending)
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchFromApi('titles', 'most_pop_movies').then((data) => setMovies(data.results));

    fetchFromApi('titles', 'most_pop_series').then((data) => setShows(data.results));
  }, []);

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
        <Movies movies={movies} />
        <Shows shows={shows} />
      </Box>
    </Stack>
  );
};

export default Feed;
