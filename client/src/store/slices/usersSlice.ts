import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import * as API from '../../api';

export interface FetchError {
  errors: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const USERS_SLICE_NAME = 'users';

interface UsersState {
  users: User[];
  isFetching: boolean;
  error: FetchError | null;
}

const initialState: UsersState = {
  users: [],
  isFetching: false,
  error: null,
};

export const getUsersThunk = createAsyncThunk<
  User[], // Expecting an array of User objects
  void, // No payload is expected if not used
  { rejectValue: FetchError }
>(`${USERS_SLICE_NAME}/getUsers`, async (_, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    } = await API.getUsers();
    console.log(data, 'data getUsersThunk');
    return data; // Returning the array of users
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({
        errors: err.response.data.message || 'Login failed',
      });
    }
    return rejectWithValue({ errors: 'An unknown error occurred' });
  }
});

const usersSlice = createSlice({
  initialState,
  name: USERS_SLICE_NAME,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.users = payload; // payload is now an array of users
    });
    builder.addCase(getUsersThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload || { errors: 'Failed to fetch users' };
    });
  },
});

const { reducer } = usersSlice;

export default reducer;
