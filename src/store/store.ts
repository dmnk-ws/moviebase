import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './slices/movieSlice';
import showSlice from './slices/showSlice';
import genreSlice from './slices/genreSlice';
import logger from 'redux-logger';
import videosSlice from './slices/videosSlice';

const isDevelopment = import.meta.env.MODE === 'development';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    shows: showSlice,
    genres: genreSlice,
    videos: videosSlice,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();

    if (isDevelopment) {
      return middleware.concat(logger);
    }

    return middleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
