import React, { useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectShowById } from '../../store/slices/showSlice';
import MediaBackdrop from './MediaBackdrop';
import MediaPoster from './MediaPoster';
import MediaGenres from './MediaGenres';
import MediaRating from './MediaRating';
import MediaOverview from './MediaOverview';
import MediaTitle from './MediaTitle';
import MediaYear from './MediaYear';
import Trailer from './Trailer';
import { selectShowTrailer } from '../../store/selectors/videosSelector';
import { fetchShowVideos } from '../../store/slices/videosSlice';

interface ShowProps {
  id: number;
}

const Show = ({ id }: ShowProps) => {
  const show = useAppSelector((state) => selectShowById(state, id));
  const dispatch = useAppDispatch();
  const trailerLoading = useAppSelector((state) => state.videos.loading);
  const trailer = useAppSelector((state) => selectShowTrailer(state, id));

  useEffect(() => {
    dispatch(fetchShowVideos(id));
  }, [dispatch, id]);

  return (
    <Box position="relative" color="white" bgcolor="#000">
      <MediaBackdrop backdropPath={show.backdropPath} />
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
        <MediaPoster imagePath={show.imagePath} alt={show.name} />
        <Box flex={1} paddingTop={{ xs: 0, md: 2 }}>
          <MediaTitle title={show.name} />
          {show.firstAirDate && <MediaYear date={show.firstAirDate} />}
          <MediaGenres genres={show.genres} />
          {(show.numberOfSeasons || show.numberOfEpisodes || show.voteAverage) && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={3} marginBottom={3} alignItems="center">
                {show.numberOfSeasons && (
                  <Typography variant="body1" fontWeight="bold">
                    {show.numberOfSeasons} Season
                    {show.numberOfSeasons !== 1 ? 's' : ''}
                  </Typography>
                )}
                {show.numberOfEpisodes && (
                  <Typography variant="body1" fontWeight="bold">
                    {show.numberOfEpisodes} Episode
                    {show.numberOfEpisodes !== 1 ? 's' : ''}
                  </Typography>
                )}
                <Trailer loading={trailerLoading} trailer={trailer} />
              </Stack>
              <MediaRating voteAverage={show.voteAverage} />
            </Stack>
          )}
          <MediaOverview overview={show.overview} />
          {show.createdBy && show.createdBy.length > 0 && (
            <Box>
              <Typography variant="h6" fontWeight="bold" marginBottom={1}>
                Created by
              </Typography>
              <Typography variant="body1">
                {show.createdBy.map((creator) => creator.name).join(', ')}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Show;
