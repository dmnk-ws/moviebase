import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { QueryParams } from '../../services/MediaClient';
import { MediaService } from '../../services/MediaService';
import { RootState } from '../store';
import { Show } from '../../entities/Show';

const showAdapter = createEntityAdapter<Show>({});

export const fetchTrendingShows = createAsyncThunk(
  'shows/fetchTrending',
  async (params?: QueryParams) => {
    return await MediaService.getTrendingShows(params);
  }
);

export const fetchShowsByGenreId = createAsyncThunk(
  'shows/fetchByGenreId',
  async (genre: number) => {
    const shows = await MediaService.getShowsByGenreId({ genre });
    return { genre, shows };
  }
);

interface ShowState {
  loading: boolean;
  showsByGenre: Record<number, number[]>;
}

const initialState = showAdapter.getInitialState<ShowState>({
  loading: false,
  showsByGenre: {},
});

const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    resetAllShows: (state) => showAdapter.removeAll(state),
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchTrendingShows, {
      pending(state) {
        state.loading = true;
      },
      fulfilled(state, action) {
        const shows = action.payload;

        if (shows) showAdapter.upsertMany(state, shows);
      },
      settled(state) {
        state.loading = false;
      },
    });
    builder.addAsyncThunk(fetchShowsByGenreId, {
      pending(state) {
        state.loading = true;
      },
      fulfilled(state, action) {
        const { genre, shows } = action.payload;

        if (shows) {
          const limitedShows = shows.slice(0, 20);
          showAdapter.upsertMany(state, limitedShows);
          state.showsByGenre[genre] = limitedShows.map((s: Show) => s.id);
        }
      },
      settled(state) {
        state.loading = false;
      },
    });
  },
});

export const { selectAll: selectShows } = showAdapter.getSelectors<RootState>(
  (state) => state.shows
);

export const resetAllShows = showSlice.actions.resetAllShows;

export default showSlice.reducer;
