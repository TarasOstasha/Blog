import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as API from '../../api';
import { FetchError, AuthData, UserData } from '../../interfaces';
import { RegisterData } from '../../interfaces/authTypes';
import { MyToken } from '../../interfaces/registerTypes';

const AUTH_SLICE_NAME = 'auth';

// interface AuthState {
//   authData: UserData[] | null;
//   isFetching: boolean;
//   error: string | null;
// }

interface AuthState {
  authData: UserData | null;
  isFetching: boolean;
  error: string | null;
}

interface LoginData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const defaultAuthData: UserData[] = [
  //AuthData[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '111111',
    //confirmPassword: '111111',
  },
  {
    id: uuidv4(),
    name: 'John Doe1',
    email: 'johndoe1@gmail.com',
    password: '111111',
    //confirmPassword: '111111',
  },
];

// Initial state
const initialState: any = {
  authData: null,
  isFetching: false,
  error: null,
};

export const loginUserThunk = createAsyncThunk<
  LoginData,
  { email: string; password: string },
  { rejectValue: FetchError }
>(
  `${AUTH_SLICE_NAME}/login`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.loginUser(email, password);
      localStorage.setItem('authToken', data.token);

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

export const signupUserThunk = createAsyncThunk<
  RegisterData,
  { name: string; email: string; password: string },
  { rejectValue: FetchError }
>(
  `${AUTH_SLICE_NAME}/signup`,
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.signupUser(name, email, password);
      //console.log(data.token, '<< token signupUserThunk');
      localStorage.setItem('authToken', data.token);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ errors: err.response.data });
      }
      return rejectWithValue({ errors: 'An unknown error occurred' });
    }
  }
);

const authUserSlice = createSlice({
  initialState,
  name: AUTH_SLICE_NAME,
  reducers: {
    setAuthData: (state, action: PayloadAction<MyToken>) => {
      state.authData = action.payload;
    },
    logout: (state) => {
      state.authData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, { payload: { user, token } }) => {
          state.isFetching = false;
          state.authData = user;
          //state.token = token;
          //localStorage.setItem('authToken', token);
        }
      )
      .addCase(
        loginUserThunk.rejected,
        (state, { payload }: PayloadAction<FetchError | undefined>) => {
          state.isFetching = false;
          state.error = payload?.errors || 'Failed to log in';
          state.authData = null;
          state.token = null;
        }
      )
      .addCase(signupUserThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(signupUserThunk.fulfilled, (state, { payload: { data } }) => {
        state.isFetching = false;
        state.authData = data;
      })
      .addCase(
        signupUserThunk.rejected,
        (state, { payload }: PayloadAction<FetchError | undefined>) => {
          state.isFetching = false;
          state.error = payload?.errors || 'Failed to sign up';
        }
      );
  },
});

const { reducer, actions } = authUserSlice;

export const { logout, setAuthData } = actions;

export default reducer;

//console.log(initialState, 'initialState auth');
