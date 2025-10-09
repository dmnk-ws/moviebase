import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Genre } from '../../entities/Genre';
import { MediaService } from '../../services/MediaService';
import { RootState } from '../store';

const genreAdapter = createEntityAdapter<Genre>({});

export const fetchMovieGenres = createAsyncThunk('genres/fetchMovie', async () => {
  return MediaService.getMovieGenres();
});

export const fetchShowGenres = createAsyncThunk('genres/fetchShow', async () => {
  return MediaService.getShowGenres();
});

interface GenreState {
  loading: boolean;
}

const initialState = genreAdapter.getInitialState<GenreState>({
  loading: false,
});

const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchMovieGenres, {
      pending(state) {
        state.loading = true;
      },
      fulfilled(state, action) {
        const genres = action.payload;

        if (genres) genreAdapter.upsertMany(state, genres);
      },
      settled(state) {
        state.loading = false;
      },
    });
    builder.addAsyncThunk(fetchShowGenres, {
      pending(state) {
        state.loading = true;
      },
      fulfilled(state, action) {
        const genres = action.payload;

        if (genres) genreAdapter.upsertMany(state, genres);
      },
      settled(state) {
        state.loading = false;
      },
    });
  },
});

export const { selectAll: selectAllGenres } = genreAdapter.getSelectors<RootState>(
  (state) => state.genres
);

export default genreSlice.reducer;
