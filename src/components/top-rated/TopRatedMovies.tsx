import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Layout, Loading } from '../index';
import MediaCard from './MediaCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTopRatedMovies,
  resetAllMovies,
  selectMovies,
} from '../../store/slices/movieSlice';
import LoadMore from '../LoadMore';

const TopRatedMovies = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => selectMovies(state));
  const loading = useAppSelector((state) => state.movies.loading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(resetAllMovies());
    dispatch(fetchTopRatedMovies({ page: 1 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchTopRatedMovies({ page: nextPage }));
  };

  if (movies.length === 0) return <Loading />;

  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ color: 'white', marginBottom: 3 }}>
        Top Rated Movies
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 200px)"
        gap={3}
        marginBottom={4}
        justifyContent="center"
      >
        {movies.map((movie) => (
          <MediaCard
            key={movie.id}
            to={`/movies/${movie.id}`}
            name={movie.title}
            imagePath={movie.imagePath}
            rating={movie.voteAverage}
            date={movie.releaseDate}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <LoadMore onClick={handleLoadMore} loading={loading} />
      </Box>
    </Layout>
  );
};

export default TopRatedMovies;
