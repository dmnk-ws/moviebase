import { RootState } from '../store';
import { Movie } from '../../entities/Movie';
import { createSelector } from '@reduxjs/toolkit';

export const selectMoviesByGenreId = createSelector(
  [
    (state: RootState) => state.movies.entities,
    (state: RootState) => state.movies.moviesByGenre,
    (_state: RootState, genreId: number) => genreId,
  ],
  (entities, moviesByGenre, genreId): Movie[] => {
    const movieIds = moviesByGenre[genreId] || [];
    return movieIds
      .map((id) => entities[id])
      .filter((movie): movie is Movie => movie !== undefined);
  }
);