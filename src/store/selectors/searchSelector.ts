import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectSearch = (state: RootState) => state.search;

export const selectMoviePagination = createSelector([selectSearch], (search) => ({
  page: search.movies.page,
  totalPages: search.movies.totalPages,
  totalResults: search.movies.totalResults,
  loading: search.movies.loading,
}));

export const selectShowPagination = createSelector([selectSearch], (search) => ({
  page: search.shows.page,
  totalPages: search.shows.totalPages,
  totalResults: search.shows.totalResults,
  loading: search.shows.loading,
}));

export const selectKeywordPagination = createSelector([selectSearch], (search) => ({
  page: search.keywords.page,
  totalPages: search.keywords.totalPages,
  totalResults: search.keywords.totalResults,
  loading: search.keywords.loading,
}));
