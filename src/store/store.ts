import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movieSlice';
import showSlice from './showSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    shows: showSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
