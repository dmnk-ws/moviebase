import { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';

import { Movies, Shows } from './';
import TMDB from '../services/TMDB';
import { Movie, Show } from '../services/MediaClient';

const mediaService = new TMDB();

const Feed = () => {
  //const [category, setCategory] = useState(trending)
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    mediaService.getPopularMovies().then((movies) => setMovies(movies));

    mediaService.getPopularShows().then((shows) => setShows(shows));
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
