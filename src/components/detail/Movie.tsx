import React, { useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMovieById } from '../../store/slices/movieSlice';
import MediaBackdrop from './MediaBackdrop';
import MediaPoster from './MediaPoster';
import MediaGenres from './MediaGenres';
import MediaRating from './MediaRating';
import MediaOverview from './MediaOverview';
import MediaYear from './MediaYear';
import Trailer from './Trailer';
import { fetchMovieVideos } from '../../store/slices/videosSlice';
import { selectMovieTrailer } from '../../store/selectors/videosSelector';

interface MovieProps {
  id: number;
}

const Movie = ({ id }: MovieProps) => {
  const movie = useAppSelector((state) => selectMovieById(state, id));
  const dispatch = useAppDispatch();
  const trailerLoading = useAppSelector((state) => state.videos.loading);
  const trailer = useAppSelector((state) => selectMovieTrailer(state, id));

  useEffect(() => {
    dispatch(fetchMovieVideos(id));
  }, [dispatch, id]);

  return (
    <Box position="relative" color="white" bgcolor="#000">
      <MediaBackdrop backdropPath={movie.backdropPath} />
      <Box
        position="relative"
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={{ xs: 2, md: 4 }}
        padding={{ xs: 2, sm: 3, md: 4 }}
        paddingTop={{ xs: 2, md: 4 }}
        minHeight={{ xs: '300px', md: '500px' }}
        maxWidth="1400px"
        margin="0 auto"
        zIndex={1}
      >
        <MediaPoster imagePath={movie.imagePath} alt={movie.title} />
        <Box flex={1} paddingTop={{ xs: 0, md: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            marginBottom={1}
            fontSize={{ xs: '1.75rem', sm: '2.5rem', md: '3rem' }}
          >
            {movie.title}
          </Typography>
          {movie.releaseDate && <MediaYear date={movie.releaseDate} />}
          <MediaGenres genres={movie.genres} />
          {(movie.runtime || movie.voteAverage || trailer) && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={3} marginBottom={3} alignItems="center">
                {movie.runtime && (
                  <Typography variant="body1" fontWeight="bold">
                    {movie.runtime} minutes
                  </Typography>
                )}
                <Trailer loading={trailerLoading} trailer={trailer} />
              </Stack>
              <MediaRating voteAverage={movie.voteAverage} />
            </Stack>
          )}
          <MediaOverview overview={movie.overview} />
        </Box>
      </Box>
    </Box>
  );
};

export default Movie;
