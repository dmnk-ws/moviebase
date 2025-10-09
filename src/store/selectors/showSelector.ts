import { RootState } from '../store';
import { Show } from '../../entities/Show';
import { createSelector } from '@reduxjs/toolkit';

export const selectShowsByGenreId = createSelector(
  [
    (state: RootState) => state.shows.entities,
    (state: RootState) => state.shows.showsByGenre,
    (_state: RootState, genreId: number) => genreId,
  ],
  (entities, showsByGenre, genreId): Show[] => {
    const showIds = showsByGenre[genreId] || [];
    return showIds
      .map((id) => entities[id])
      .filter((show): show is Show => show !== undefined);
  }
);