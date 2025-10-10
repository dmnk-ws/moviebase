import { createSelector } from '@reduxjs/toolkit';
import { selectMovieVideosById, selectShowVideosById } from '../slices/videosSlice';
import { RootState } from '../store';

export const selectShowTrailer = createSelector(
  [(state: RootState, id: number) => selectShowVideosById(state, id)],
  (videos) =>
    videos?.results.find(
      (video) =>
        video.type === 'Trailer' && video.name.toLowerCase().includes('trailer')
    )
);

export const selectMovieTrailer = createSelector(
  [(state: RootState, id: number) => selectMovieVideosById(state, id)],
  (videos) =>
    videos?.results.find(
      (video) =>
        video.type === 'Trailer' && video.name.toLowerCase().includes('trailer')
    )
);
