import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as API from '../../api';
import { FetchError, AuthData, UserData } from '../../interfaces';
import { RegisterData } from '../../interfaces/authTypes';

const AUTH_SLICE_NAME = 'auth';

interface AuthState {
  authData: UserData[] | null;
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
  authData: null, //defaultAuthData, // Set this to null if no user should be logged in initially
  isFetching: false,
  error: null,
};

// export const getUserDataThunk = createAsyncThunk<
//   any, // Return type of the payload creator
//   any, // Argument to the payload creator, which is the user ID
//   { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
// >(`${AUTH_SLICE_NAME}/getByEmail`, async ({ email }, { rejectWithValue }) => {
//   try {
//     const { data } = await API.getUserByEmail(email); // Call the API with the user email
//     console.log(data, '<< data');
//     return data;
//   } catch (err) {
//     if (axios.isAxiosError(err) && err.response) {
//       return rejectWithValue({ errors: err.response.data });
//     }
//     return rejectWithValue({ errors: 'An unknown error occurred' });
//   }
// });

// export const loginUserThunk = createAsyncThunk<
//   LoginData, // The type returned by the payload creator
//   { email: string; password: string }, // Arguments passed to the payload creator
//   { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
// >(
//   `${AUTH_SLICE_NAME}/login`,
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       // Check if user exists
//       // const userExists = await API.getUserByEmail(email);
//       // if (!userExists) {
//       //   return rejectWithValue({ errors: 'User does not exist' });
//       // }
//       const { data } = await API.loginUser(email, password); // Assuming this returns AuthData
//       console.log(data, '<<< login user data auth slice');
//       return data;
//     } catch (err) {
//       if (axios.isAxiosError(err) && err.response) {
//         return rejectWithValue({ errors: err.response.data });
//       }
//       return rejectWithValue({ errors: 'An unknown error occurred' });
//     }
//   }
// );

export const loginUserThunk = createAsyncThunk<
  LoginData, // The type returned by the payload creator
  { email: string; password: string }, // Arguments passed to the payload creator
  { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
>(
  `${AUTH_SLICE_NAME}/login`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Make the login API call
      const { data } = await API.loginUser(email, password); // Assuming this returns { token, user }

      console.log(data, '<<< login user data auth slice');

      // Return the user data and token to be handled by the slice
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
  RegisterData, // The type returned by the payload creator
  { name: string; email: string; password: string }, // Arguments passed to the payload creator
  { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
>(
  `${AUTH_SLICE_NAME}/signup`,
  async ({ name, email, password }, { rejectWithValue }) => {
    //console.log({ name, email, password });
    try {
      const { data } = await API.signupUser(name, email, password); // Assuming this returns AuthData
      console.log(data.token, '<< token signupUserThunk');
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

interface MyToken {
  id: number;
  name: string;
  email: string;
  exp: number;
  iat: number;
}
const authUserSlice = createSlice({
  initialState,
  name: AUTH_SLICE_NAME,
  reducers: {
    setAuthData: (state, action: PayloadAction<MyToken>) => {
      console.log(state, action);
      state.authData = action.payload;
    },
    logout: (state) => {
      state.authData = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling login
      // .addCase(loginUserThunk.pending, (state) => {
      //   state.isFetching = true;
      // })
      // .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      //   state.isFetching = false;
      //   const existingUserIndex = state.authData.findIndex(
      //     (user: LoginData) => user.email === payload.email
      //   );
      //   if (existingUserIndex !== -1) {
      //     // If the user exists, update the user data
      //     state.authData[existingUserIndex] = payload;
      //   } else {
      //     // If the user does not exist, add the new user
      //     state.authData.push(payload);
      //   }
      // })
      // .addCase(
      //   loginUserThunk.rejected,
      //   (state, { payload }: PayloadAction<FetchError | undefined>) => {
      //     state.isFetching = false;
      //     state.error = payload?.errors || 'Failed to log in';
      //   }
      // )

      .addCase(loginUserThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, { payload: { user, token } }) => {
          state.isFetching = false;
          // Assuming payload contains { token, user }
          state.authData = user;
          state.token = token; // If you’re storing the token in the state
          localStorage.setItem('token', token);
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
        state.error = null; // Reset the error on a new request
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

console.log(initialState, 'initialState auth');
