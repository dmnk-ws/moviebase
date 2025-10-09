import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './slices/movieSlice';
import showSlice from './slices/showSlice';
import genreSlice from './slices/genreSlice';
import logger from 'redux-logger';

const isDevelopment = import.meta.env.MODE === 'development';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    shows: showSlice,
    genres: genreSlice,
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
