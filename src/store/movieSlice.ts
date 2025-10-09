import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Movie, QueryParams } from '../services/MediaClient';
import { MediaService } from '../services/MediaService';
import { RootState } from './store';

const movieAdapter = createEntityAdapter<Movie>({});

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async (params?: QueryParams) => {
    return await MediaService.getTrendingMovies(params);
  }
);

interface MovieState {
  loading: boolean;
}

const initialState = movieAdapter.getInitialState<MovieState>({
  loading: false,
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetAllMovies: (state) => movieAdapter.removeAll(state),
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchTrendingMovies, {
      pending(state) {
        state.loading = true;
      },
      fulfilled(state, action) {
        const movies = action.payload;

        if (movies) movieAdapter.upsertMany(state, movies);
      },
      settled(state) {
        state.loading = false;
      },
    });
  },
});

export const { selectAll: selectMovies } = movieAdapter.getSelectors<RootState>(
  (state) => state.movies
);

export const resetAllMovies = movieSlice.actions.resetAllMovies;

export default movieSlice.reducer;
