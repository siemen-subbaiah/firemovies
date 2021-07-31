import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userIsTrue: (state, action) => {
      state.user = action.payload;
    },
    userIsFalse: (state) => {
      state.user = null;
    },
  },
});

export const { userIsTrue, userIsFalse } = authReducer.actions;
export default authReducer.reducer;
