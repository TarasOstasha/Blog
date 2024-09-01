import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as API from '../../api';
import {
  UpdateUserRolePayload,
  User,
  UsersState,
} from '../../interfaces/userTypes';

export interface FetchError {
  errors: string;
}

// interface UpdateUserRolePayload {
//   id: string;
//   role: string;
// }
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }
// interface UsersState {
//   users: User[];
//   isFetching: boolean;
//   error: FetchError | null;
// }

const USERS_SLICE_NAME = 'users';

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

export const updateUserRoleThunk = createAsyncThunk<
  User, // Expecting a single User object in the response
  UpdateUserRolePayload, // The payload passed to the thunk (id and role)
  { rejectValue: FetchError }
>(
  `${USERS_SLICE_NAME}/updateUserRole`,
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.updateUserRole(id, role);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({
          errors: err.response.data.message || 'Login failed',
        });
      }
      return rejectWithValue({ errors: 'An unknown error occurred' });
    }
  }
);

export const deleteUserThunk = createAsyncThunk<
  string, // The fulfilled value type (the ID of the deleted user)
  string, // The argument type (ID of the user to delete)
  { rejectValue: FetchError }
>(`${USERS_SLICE_NAME}/deleteUser`, async (id: string, { rejectWithValue }) => {
  try {
    await API.deleteUserById(id);
    return id;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({
        errors: err.response.data.message || 'User deletion failed',
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
    // GET USERS
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
    // UPDATE USER ROLE
    builder.addCase(updateUserRoleThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(updateUserRoleThunk.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      const foundUserIndex = state.users.findIndex((u) => u.id === payload.id);
      if (foundUserIndex !== -1) {
        state.users[foundUserIndex] = {
          ...state.users[foundUserIndex],
          ...payload,
        };
      }
    });
    builder
      .addCase(updateUserRoleThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload || { errors: 'Failed to update user' };
      })
      // REMOVE USER
      .addCase(deleteUserThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.users = state.users.filter((user) => user.id !== payload);
      })
      .addCase(deleteUserThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload || { errors: 'Failed to remove user' };
      });
  },
});

const { reducer } = usersSlice;

export default reducer;
