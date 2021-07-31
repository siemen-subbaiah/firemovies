const { createSlice } = require('@reduxjs/toolkit');
const initialState = {
  movies: [],
};

const likedMoviesReducer = createSlice({
  name: 'likedMovies',
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { addMovies } = likedMoviesReducer.actions;
export default likedMoviesReducer.reducer;
