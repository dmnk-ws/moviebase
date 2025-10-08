import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../services/MediaClient';
import { MediaService } from '../services/MediaService';
import { RootState } from './store';

const movieAdapter = createEntityAdapter<Movie>({
  sortComparer: (a, b) => a.id - b.id,
});

export const fetchPopularMovies = createAsyncThunk('movies/fetchPopular', async () => {
  return await MediaService.getPopularMovies();
});

interface MovieState {
  loading: boolean;
}

const initialState = movieAdapter.getInitialState<MovieState>({
  loading: false,
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchPopularMovies, {
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

export default movieSlice.reducer;
