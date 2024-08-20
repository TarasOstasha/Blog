import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as API from '../../api';
import { CarouselData, CarouselState, FetchError } from '../../interfaces';

// temporary data while server not available
const defaultCarouselData: CarouselData[] = [
  {
    //id: 1,
    img: 'https://www.kauai.com/images/haena-beach-bali-hai-scaled.jpg',
    title: 'Kaui',
    description: 'dfdsfd hdjshf dshf jdkshf sdhfhsdf',
  },
  {
    // id: 2,
    img: 'https://www.kauai.com/images/haena-beach-bali-hai-scaled.jpg',
    title: 'Kaui 1',
    description: 'dfdsfd hdjshf dshf jdkshf sdhfhsdf',
  },
  {
    // id: 3,
    img: 'https://www.kauai.com/images/haena-beach-bali-hai-scaled.jpg',
    title: 'Kaui 2',
    description: 'dfdsfd hdjshf dshf jdkshf sdhfhsdf',
  },
];

const CAROUSEL_SLICE_NAME = 'carousel';

// Initial state
const initialState: CarouselState = {
  carouselData: defaultCarouselData,
  isFetching: false,
  error: null,
};

//   export const getTypesThunk = createAsyncThunk(
//     `${CAROUSEL_SLICE_NAME}/get/types`,
//     async (payload, { rejectWithValue }) => {
//       try {
//         const {
//           data: { data },
//         } = await API.getTypes();
//         return data;
//       } catch (err) {
//         return rejectWithValue({ errors: err.response.data });
//       }
//     }
//   );

//   export const createPetThunk = createAsyncThunk(
//     `${CAROUSEL_SLICE_NAME}/create`,
//     async (payload, { rejectWithValue }) => {
//       try {
//         const {
//           data: { data },
//         } = await API.createPet(payload);
//         return data;
//       } catch (err) {
//         return rejectWithValue({ errors: err.response.data });
//       }
//     }
//   );

export const getCarouselThunk = createAsyncThunk<
  CarouselData[], // Return type of the payload creator
  { limit: number; offset: number }, // Argument to the payload creator
  { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
>(
  `${CAROUSEL_SLICE_NAME}/get`,
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getCarouselData(limit, offset);
      console.log(data, '>> response from slice');
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ errors: err.response.data });
      }
      return rejectWithValue({ errors: 'An unknown error occurred' });
    }
  }
);

const carouselSlice = createSlice({
  name: CAROUSEL_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarouselThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getCarouselThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.carouselData = [...payload];
      })
      .addCase(
        getCarouselThunk.rejected,
        (state, action: PayloadAction<FetchError | undefined>) => {
          state.isFetching = false;
          state.error = action.payload?.errors || 'Failed to fetch data';
        }
      );
  },
});

const { reducer, actions } = carouselSlice;

//export const { changePetTypeFilter } = actions;

export default reducer;
