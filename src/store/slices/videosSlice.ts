import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Videos } from '../../entities/Videos';
import { MediaService } from '../../services/MediaService';

const movieVideosAdapter = createEntityAdapter<Videos>();
const showVideosAdapter = createEntityAdapter<Videos>();

export const fetchMovieVideos = createAsyncThunk(
  'videos/fetchByMovieId',
  async (id: number) => {
    return MediaService.getMovieVideosById(id);
  }
);

export const fetchShowVideos = createAsyncThunk(
  'videos/fetchByShowId',
  async (id: number) => {
    return MediaService.getShowVideosById(id);
  }
);

interface VideosState {
  loading: boolean;
  movie: ReturnType<typeof movieVideosAdapter.getInitialState>;
  show: ReturnType<typeof showVideosAdapter.getInitialState>;
}

const initialState: VideosState = {
  loading: false,
  movie: movieVideosAdapter.getInitialState(),
  show: showVideosAdapter.getInitialState(),
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addAsyncThunk(fetchMovieVideos, {
        pending(state) {
          state.loading = true;
        },
        fulfilled(state, action) {
          const videos = action.payload;

          if (videos) movieVideosAdapter.upsertOne(state.movie, videos);
        },
        settled(state) {
          state.loading = false;
        },
      })
      .addAsyncThunk(fetchShowVideos, {
        pending(state) {
          state.loading = true;
        },
        fulfilled(state, action) {
          const videos = action.payload;

          if (videos) showVideosAdapter.upsertOne(state.show, videos);
        },
        settled(state) {
          state.loading = false;
        },
      });
  },
});

export const { selectById: selectMovieVideosById } = movieVideosAdapter.getSelectors(
  (state: { videos: VideosState }) => state.videos.movie
);

export const { selectById: selectShowVideosById } = showVideosAdapter.getSelectors(
  (state: { videos: VideosState }) => state.videos.show
);

export default videosSlice.reducer;
