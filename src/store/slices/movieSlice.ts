import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { QueryParams } from '../../services/MediaClient';
import { MediaService } from '../../services/MediaService';
import { RootState } from '../store';
import { Movie } from '../../entities/Movie';

const movieAdapter = createEntityAdapter<Movie>({});

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async (params?: QueryParams) => {
    return await MediaService.getTrendingMovies(params);
  }
);

export const fetchMoviesByGenreId = createAsyncThunk(
  'movies/fetchByGenreId',
  async (genre: number) => {
    const movies = await MediaService.getMoviesByGenreId({ genre });
    return { genre, movies };
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchById',
  async (id: number) => {
    return await MediaService.getMovieById(id);
  }
);

interface MovieState {
  loading: boolean;
  moviesByGenre: Record<number, number[]>;
}

const initialState = movieAdapter.getInitialState<MovieState>({
  loading: false,
  moviesByGenre: {},
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
    builder.addAsyncThunk(fetchMoviesByGenreId, {
      pending(state) {
        state.loading = true;
      },
      fulfilled(state, action) {
        const { genre, movies } = action.payload;

        if (movies) {
          const limitedMovies = movies.slice(0, 20);
          movieAdapter.upsertMany(state, limitedMovies);
          state.moviesByGenre[genre] = limitedMovies.map((m) => m.id);
        }
      },
      settled(state) {
        state.loading = false;
      },
    });
    builder.addAsyncThunk(fetchMovieById, {
      pending(state) {
        state.loading = true;
      },
      fulfilled(state, action) {
        const movie = action.payload;

        if (movie) movieAdapter.upsertOne(state, movie);
      },
      settled(state) {
        state.loading = false;
      },
    });
  },
});

export const { selectAll: selectMovies, selectById: selectMovieById } =
  movieAdapter.getSelectors<RootState>((state) => state.movies);

export const resetAllMovies = movieSlice.actions.resetAllMovies;

export default movieSlice.reducer;
