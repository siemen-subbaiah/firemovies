import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authReducer';
import likedMoviesReducer from '../features/likedmovies/likedMoviesReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    liked: likedMoviesReducer,
  },
});
