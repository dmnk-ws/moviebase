import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { Layout, Header, MovieGenre } from '../index';
import { fetchMovieGenres } from '../../store/slices/genreSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectMovieGenres } from '../../store/selectors/genreSelector';

const Movies = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => selectMovieGenres(state));

  useEffect(() => {
    dispatch(fetchMovieGenres());
  }, [dispatch]);

  return (
    <Layout>
      {genres.map((genre) => (
        <Stack key={genre.id} spacing={2}>
          <Header text={genre.name} />
          <MovieGenre genre={genre.id} />
        </Stack>
      ))}
    </Layout>
  );
};

export default Movies;
