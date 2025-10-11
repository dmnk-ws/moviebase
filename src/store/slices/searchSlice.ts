import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { QueryParams } from '../../services/MediaClient';
import { MediaService } from '../../services/MediaService';
import { RootState } from '../store';
import { Movie } from '../../entities/Movie';
import { Show } from '../../entities/Show';
import { Keyword } from '../../entities/Keyword';

const movieAdapter = createEntityAdapter<Movie>({});
const showAdapter = createEntityAdapter<Show>({});
const keywordAdapter = createEntityAdapter<Keyword>({});

export const searchKeyword = createAsyncThunk(
  'search/searchKeyword',
  async (params: QueryParams) => {
    return await MediaService.searchKeyword(params);
  }
);

export const searchMovieByKeyword = createAsyncThunk(
  'search/searchMovieByKeyword',
  async (params: QueryParams) => {
    return await MediaService.searchMovieByKeyword(params);
  }
);

export const searchShowByKeyword = createAsyncThunk(
  'search/searchShowByKeyword',
  async (params: QueryParams) => {
    return await MediaService.searchShowByKeyword(params);
  }
);

interface PaginationState {
  page: number;
  totalPages: number;
  totalResults: number;
  loading: boolean;
}

interface SearchState {
  loading: boolean;
  currentQuery: string;
  movies: ReturnType<typeof movieAdapter.getInitialState> & PaginationState;
  shows: ReturnType<typeof showAdapter.getInitialState> & PaginationState;
  keywords: ReturnType<typeof keywordAdapter.getInitialState> & PaginationState;
}

const initialPaginationState: PaginationState = {
  page: 0,
  totalPages: 0,
  totalResults: 0,
  loading: false,
};

const initialState: SearchState = {
  loading: false,
  currentQuery: '',
  movies: { ...movieAdapter.getInitialState(), ...initialPaginationState },
  shows: { ...showAdapter.getInitialState(), ...initialPaginationState },
  keywords: { ...keywordAdapter.getInitialState(), ...initialPaginationState },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.currentQuery = '';
      state.movies = {
        ...movieAdapter.getInitialState(),
        ...initialPaginationState,
      };
      state.shows = {
        ...showAdapter.getInitialState(),
        ...initialPaginationState,
      };
      state.keywords = {
        ...keywordAdapter.getInitialState(),
        ...initialPaginationState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(searchKeyword, {
      pending(state) {
        state.keywords.loading = true;
      },
      fulfilled(state, action) {
        const { results, page, totalPages, totalResults } = action.payload;

        state.currentQuery = action.meta.arg.query || '';
        state.keywords.page = page;
        state.keywords.totalPages = totalPages;
        state.keywords.totalResults = totalResults;

        if (results) keywordAdapter.upsertMany(state.keywords, results);
      },
      settled(state) {
        state.keywords.loading = false;
      },
    });
    builder.addAsyncThunk(searchMovieByKeyword, {
      pending(state) {
        state.movies.loading = true;
      },
      fulfilled(state, action) {
        const { results, page, totalPages, totalResults } = action.payload;

        state.currentQuery = action.meta.arg.query || '';
        state.movies.page = page;
        state.movies.totalPages = totalPages;
        state.movies.totalResults = totalResults;

        if (results) movieAdapter.upsertMany(state.movies, results);
      },
      settled(state) {
        state.movies.loading = false;
      },
    });
    builder.addAsyncThunk(searchShowByKeyword, {
      pending(state) {
        state.shows.loading = true;
      },
      fulfilled(state, action) {
        const { results, page, totalPages, totalResults } = action.payload;

        state.currentQuery = action.meta.arg.query || '';
        state.shows.page = page;
        state.shows.totalPages = totalPages;
        state.shows.totalResults = totalResults;

        if (results) showAdapter.upsertMany(state.shows, results);
      },
      settled(state) {
        state.shows.loading = false;
      },
    });
  },
});

export const { selectAll: selectSearchKeywords } =
  keywordAdapter.getSelectors<RootState>((state) => state.search.keywords);

export const { selectAll: selectSearchMovies } = movieAdapter.getSelectors<RootState>(
  (state) => state.search.movies
);

export const { selectAll: selectSearchShows } = showAdapter.getSelectors<RootState>(
  (state) => state.search.shows
);

export const { resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
