import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Layout, Loading } from '../index';
import MediaCard from './MediaCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTopRatedShows,
  resetAllShows,
  selectShows,
} from '../../store/slices/showSlice';
import LoadMore from '../LoadMore';

const TopRatedShows = () => {
  const dispatch = useAppDispatch();
  const shows = useAppSelector((state) => selectShows(state));
  const loading = useAppSelector((state) => state.shows.loading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(resetAllShows());
    dispatch(fetchTopRatedShows({ page: 1 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchTopRatedShows({ page: nextPage }));
  };

  if (shows.length === 0) return <Loading />;

  return (
    <Layout>
      <Typography component="h1" variant="h4" sx={{ color: 'white', marginBottom: 3 }}>
        Top Rated Shows
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 200px)"
        gap={3}
        marginBottom={4}
        justifyContent="center"
      >
        {shows.map((show) => (
          <MediaCard
            key={show.id}
            to={`/shows/${show.id}`}
            name={show.name}
            imagePath={show.imagePath}
            rating={show.voteAverage}
            date={show.firstAirDate}
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginBottom={4}>
        <LoadMore onClick={handleLoadMore} loading={loading} />
      </Box>
    </Layout>
  );
};

export default TopRatedShows;
