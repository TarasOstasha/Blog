import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as API from '../../api';
import { ImageData, thumbnailGalleryState, } from "../../interfaces";


const itemData: ImageData[] = [
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 1',
      author: 'author 1',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 2',
      author: 'author 2',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 3',
      author: 'author 3',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    },
    {
      id: uuidv4(),
      img: 'https://via.placeholder.com/200',
      title: 'Image 4',
      author: 'author 4',
    }
];

export interface FetchError {
    errors: string;
}
const IMG_SLICE_NAME = 'imgGallery';

const initialState: thumbnailGalleryState = {
    galleryData: itemData,
    isFetching: false,
    error: null
}

  export const getThumbnailGalleryThunk = createAsyncThunk<
        ImageData[], // Return type of the payload creator
        { limit: number; offset: number }, // Argument to the payload creator
        { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
    >(
    `${IMG_SLICE_NAME}/get`,
    async ({ limit, offset }, { rejectWithValue }) => {
      try {
        const { data: { data } } = await API.getThumnailGalleryData(limit, offset);
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

const thumbnailGallerySlice = createSlice({
    initialState,
    name: IMG_SLICE_NAME,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getThumbnailGalleryThunk.pending, (state) => {
            state.isFetching = true;
          })
          .addCase(getThumbnailGalleryThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.galleryData = [...payload];
          })
          .addCase(getThumbnailGalleryThunk.rejected, (state, action: PayloadAction<FetchError | undefined>) => {
            state.isFetching = false;
            state.error = action.payload?.errors || 'Failed to fetch data';
          });
      },
});


const { reducer, actions } = thumbnailGallerySlice;


export default reducer;

console.log(' << initialState', initialState);