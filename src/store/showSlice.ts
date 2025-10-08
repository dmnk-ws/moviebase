import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Show } from '../services/MediaClient';
import { MediaService } from '../services/MediaService';
import { RootState } from './store';

const showAdapter = createEntityAdapter<Show>({
  sortComparer: (a, b) => a.id - b.id,
});

export const fetchPopularShows = createAsyncThunk('shows/fetchPopular', async () => {
  return await MediaService.getPopularShows();
});

interface ShowState {
  loading: boolean;
}

const initialState = showAdapter.getInitialState<ShowState>({
  loading: false,
});

const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchPopularShows, {
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

export default showSlice.reducer;
