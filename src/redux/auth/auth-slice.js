import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.register.fulfilled, (state, { payload }) => {
        state.user = payload.data.user;
        state.token = payload.data.token;
        state.isLoggedIn = true;
      })
      .addCase(authOperations.logIn.fulfilled, (state, { payload }) => {
        state.user = payload.userData;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.fetchCurrentUser.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      });
  },
});


export default authSlice.reducer;
