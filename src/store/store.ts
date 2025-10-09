import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movieSlice';
import showSlice from './showSlice';
import logger from 'redux-logger';

const isDevelopment = import.meta.env.MODE === 'development';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    shows: showSlice,
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
