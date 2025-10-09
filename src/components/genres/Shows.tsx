import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { Layout, Header, ShowGenre, Loading } from '../index';
import { fetchShowGenres } from '../../store/slices/genreSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectShowGenres } from '../../store/selectors/genreSelector';

const Shows = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => selectShowGenres(state));
  const loading = useAppSelector((state) => state.genres.loading);

  useEffect(() => {
    dispatch(fetchShowGenres());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <Layout>
      {genres.map((genre) => (
        <Stack key={genre.id} spacing={2}>
          <Header text={genre.name} />
          <ShowGenre genre={genre.id} />
        </Stack>
      ))}
    </Layout>
  );
};

export default Shows;
