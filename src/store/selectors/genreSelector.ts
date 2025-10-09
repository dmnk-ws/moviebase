import { selectAllGenres } from '../slices/genreSlice';
import { createSelector } from '@reduxjs/toolkit';
import { GenreType } from '../../enums/GenreType';

export const selectShowGenres = createSelector([selectAllGenres], (genres) =>
  genres.filter((genre) => genre.type === GenreType.SHOW)
);

export const selectMovieGenres = createSelector([selectAllGenres], (genres) =>
  genres.filter((genre) => genre.type === GenreType.MOVIE)
);
