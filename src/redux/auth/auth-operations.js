import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { axiosInstance } from '../../js/backendAPI';

const token = {
  set(token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axiosInstance.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const axiosResponse = await axiosInstance.post(
        '/auth/signup',
        credentials
      );
      dispatch(
        logIn({ email: credentials.email, password: credentials.password })
      );

      toast.success('Congratulations! You have successfully registered!');
      return axiosResponse.data;
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue(toast.error('Bad Request'));
      }
      if (error.response.status === 409) {
        return rejectWithValue(
          toast.error('Email already in use')
        );
      }
      if (error.response.status === 500) {
        return rejectWithValue(toast.error('Internal Server Error'));
      }
    }
  }
);

const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const axiosResponse = await axiosInstance.post(
        '/auth/login',
        credentials
      );

      token.set(axiosResponse.data.data.token);
      return axiosResponse.data.data;
    } catch (error) {
      if (error.response.status === 403) {
        return rejectWithValue(
          toast.error('Incorrect email or password')
        );
      }
      if (error.response.status === 400) {
        return rejectWithValue(toast.error('Bad Request'));
      }
      if (error.response.status === 404) {
        return rejectWithValue(toast.error('Not Found'));
      }
      if (error.response.status === 500) {
        return rejectWithValue(toast.error('Internal Server Error'));
      }
    }
  }
);

const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/auth/logout');
    token.unset();
    return {}; 
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Logout failed');
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const axiosResponse = await axiosInstance.get('/users/current');
      return axiosResponse.data.data;
    } catch (error) {}
  }
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};

export default operations;