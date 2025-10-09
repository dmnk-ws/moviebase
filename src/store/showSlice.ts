import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { QueryParams, Show } from '../services/MediaClient';
import { MediaService } from '../services/MediaService';
import { RootState } from './store';

const showAdapter = createEntityAdapter<Show>({});

export const fetchTrendingShows = createAsyncThunk(
  'shows/fetchTrending',
  async (params?: QueryParams) => {
    return await MediaService.getTrendingShows(params);
  }
);

interface ShowState {
  loading: boolean;
}

const initialState = showAdapter.getInitialState<ShowState>({
  loading: false,
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
  },
});

export const { selectAll: selectShows } = showAdapter.getSelectors<RootState>(
  (state) => state.shows
);

export const resetAllShows = showSlice.actions.resetAllShows;

export default showSlice.reducer;
