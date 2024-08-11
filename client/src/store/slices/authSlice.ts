import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as API from '../../api';
import { FetchError } from '../../interfaces';

const AUTH_SLICE_NAME = 'auth';

export interface AuthData {
    id: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface AuthState {
    authData: AuthData | null; // AuthData if logged in, null if not
    isFetching: boolean;
    error: string | null;
}


const defaultAuthData: AuthData = 
    {
      id: '1', //uuidv4(),
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '111111',
      confirmPassword: '111111'
    };

// Initial state
const initialState: AuthState = {
    authData: defaultAuthData, // Set this to null if no user should be logged in initially
    isFetching: false,
    error: null,
};


export const getAuthDataThunk = createAsyncThunk<
  AuthData, // Return type of the payload creator
  string, // Argument to the payload creator, which is the user ID
  { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
>(
  `${AUTH_SLICE_NAME}/getById`,
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.getUserById(id); // Call the API with the user ID
      console.log(data, '<< data');
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ errors: err.response.data });
      }
      return rejectWithValue({ errors: 'An unknown error occurred' });
    }
  }
);
export const loginUserThunk = createAsyncThunk<
  AuthData, // The type returned by the payload creator
  { email: string; password: string }, // Arguments passed to the payload creator
  { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
>(
  `${AUTH_SLICE_NAME}/login`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.loginUser(email, password); // Assuming this returns AuthData
      console.log(data, '<<< login user data auth slice');
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ errors: err.response.data });
      }
      return rejectWithValue({ errors: 'An unknown error occurred' });
    }
  }
);

export const signupUserThunk = createAsyncThunk<
  AuthData, // The type returned by the payload creator
  { name: string; email: string; password: string }, // Arguments passed to the payload creator
  { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
>(
  `${AUTH_SLICE_NAME}/signup`,
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.signupUser(name, email, password); // Assuming this returns AuthData
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
        logout: (state) => {
            state.authData = null; // Clear user data on logout
        },
        login: (state, { payload }: PayloadAction<AuthData>) => {
            state.authData = payload; // Set user data on login
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAuthDataThunk.pending, (state) => {
            state.isFetching = true;
          })
          .addCase(getAuthDataThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.authData = payload;
          })
          .addCase(getAuthDataThunk.rejected, (state, { payload }: PayloadAction<FetchError | undefined>) => {
            state.isFetching = false;
            state.error = payload?.errors || 'Failed to fetch data';
          })
          // Handling login
          .addCase(loginUserThunk.pending, (state) => {
            state.isFetching = true;
          })
          .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.authData = payload;
          })
          .addCase(loginUserThunk.rejected, (state, { payload }: PayloadAction<FetchError | undefined>) => {
            state.isFetching = false;
            state.error = payload?.errors || 'Failed to log in';
          })

          // Handling signup
          .addCase(signupUserThunk.pending, (state) => {
            state.isFetching = true;
          })
          .addCase(signupUserThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.authData = payload;
          })
          .addCase(signupUserThunk.rejected, (state, { payload }: PayloadAction<FetchError | undefined>) => {
            state.isFetching = false;
            state.error = payload?.errors || 'Failed to sign up';
          });
      },
});




const { reducer, actions } = authUserSlice;

export const { logout, login } = actions;

export default reducer;

