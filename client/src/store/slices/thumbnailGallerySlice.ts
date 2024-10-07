// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
// import * as API from '../../api';
// import { ImageData, thumbnailGalleryState } from '../../interfaces';

// // const itemData: ImageData[] = [
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 1',
// //     author: 'author 1',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 2',
// //     author: 'author 2',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 3',
// //     author: 'author 3',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// //   {
// //     id: uuidv4(),
// //     img: 'https://via.placeholder.com/200',
// //     title: 'Image 4',
// //     author: 'author 4',
// //   },
// // ];

// export interface FetchError {
//   errors: string;
// }
// const IMG_SLICE_NAME = 'imgGallery';

// const initialState: thumbnailGalleryState = {
//   //galleryData: itemData,
//   galleryData: [],
//   isFetching: false,
//   error: null,
// };

// export const getThumbnailGalleryThunk = createAsyncThunk<
//   ImageData[], // Return type of the payload creator
//   { limit: number; offset: number }, // Argument to the payload creator
//   { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
// >(`${IMG_SLICE_NAME}/get`, async ({ limit, offset }, { rejectWithValue }) => {
//   try {
//     console.log(limit, offset);
//     const {
//       data: { data },
//     } = await API.getThumbnailGalleryData(limit, offset);
//     console.log(data, '<< data');
//     return data;
//   } catch (err) {
//     if (axios.isAxiosError(err) && err.response) {
//       return rejectWithValue({ errors: err.response.data });
//     }
//     return rejectWithValue({ errors: 'An unknown error occurred' });
//   }
// });

// export const uploadGalleryThunk = createAsyncThunk<
//   ImageData,
//   FormData,
//   { rejectValue: FetchError }
// >(`${IMG_SLICE_NAME}/upload`, async (payload, { rejectWithValue }) => {
//   try {
//     const { data } = await API.uploadGalley(payload);
//     console.log(data, '<< data');
//     return data;
//   } catch (err) {
//     if (axios.isAxiosError(err) && err.response) {
//       return rejectWithValue({ errors: err.response.data });
//     }
//     return rejectWithValue({ errors: 'An unknown error occurred' });
//   }
// });

// const thumbnailGallerySlice = createSlice({
//   initialState,
//   name: IMG_SLICE_NAME,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getThumbnailGalleryThunk.pending, (state) => {
//         state.isFetching = true;
//       })
//       .addCase(getThumbnailGalleryThunk.fulfilled, (state, { payload }) => {
//         console.log(payload);
//         state.isFetching = false;
//         state.galleryData = [...payload];
//       })
//       .addCase(
//         getThumbnailGalleryThunk.rejected,
//         (state, action: PayloadAction<FetchError | undefined>) => {
//           state.isFetching = false;
//           state.error = action.payload?.errors || 'Failed to fetch data';
//         }
//       )
//       .addCase(uploadGalleryThunk.pending, (state) => {
//         state.isFetching = true;
//       })
//       .addCase(uploadGalleryThunk.fulfilled, (state, { payload }) => {
//         state.isFetching = false;
//         state.galleryData.push(payload);
//       })
//       .addCase(
//         uploadGalleryThunk.rejected,
//         (state, action: PayloadAction<FetchError | undefined>) => {
//           state.isFetching = false;
//           state.error = action.payload?.errors || 'Failed to fetch data';
//         }
//       );
//   },
// });

// const { reducer, actions } = thumbnailGallerySlice;

// export default reducer;

// //console.log(' << initialState', initialState);

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import * as API from '../../api';
import { ImageData, thumbnailGalleryState } from '../../interfaces';

export interface FetchError {
  errors: string;
}

const IMG_SLICE_NAME = 'imgGallery';

const initialState: thumbnailGalleryState = {
  galleryData: [],
  selectedItem: null,
  isFetching: false,
  error: null,
};

// get all data
export const getThumbnailGalleryThunk = createAsyncThunk<
  ImageData[], // Return type of the payload creator
  { limit: number; offset: number }, // Argument to the payload creator
  { rejectValue: FetchError } // Types for thunkAPI rejectWithValue
>(`${IMG_SLICE_NAME}/get`, async ({ limit, offset }, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    } = await API.getThumbnailGalleryData(limit, offset);
    //console.log(data, '<< data');
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({ errors: err.response.data });
    }
    return rejectWithValue({ errors: 'An unknown error occurred' });
  }
});
// get single item
export const getThumbnailGalleryItemThunk = createAsyncThunk<
  ImageData, // Return type is the fetched item's data
  number, // Argument is the ID of the item to fetch
  { rejectValue: FetchError }
>(`${IMG_SLICE_NAME}/getById`, async (id, { rejectWithValue }) => {
  try {
    const response = await API.getThumbnailGalleryItemById(id);
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({ errors: err.response.data });
    }
    return rejectWithValue({ errors: 'An unknown error occurred' });
  }
});
// upload new data
export const uploadGalleryThunk = createAsyncThunk<
  ImageData,
  FormData,
  { rejectValue: FetchError }
>(`${IMG_SLICE_NAME}/upload`, async (payload, { rejectWithValue }) => {
  try {
    const { data } = await API.uploadGalley(payload);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({ errors: err.response.data });
    }
    return rejectWithValue({ errors: 'An unknown error occurred' });
  }
});
// remove 1 item with id
export const deleteThumbnailGalleryItemThunk = createAsyncThunk<
  number, // Return type is the ID of the deleted item
  number, // Argument is the ID of the item to delete
  { rejectValue: FetchError }
>(`${IMG_SLICE_NAME}/delete`, async (id, { rejectWithValue }) => {
  console.log(id, '<< id slice');
  try {
    await API.deleteThumbnailGalleryItemById(id);
    return id; // Return the deleted item's ID
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({ errors: err.response.data });
    }
    return rejectWithValue({ errors: 'An unknown error occurred' });
  }
});
// update
export const updateThumbnailGalleryItemThunk = createAsyncThunk<
  ImageData,
  { id: number; data: Partial<ImageData> },
  { rejectValue: FetchError }
>(`${IMG_SLICE_NAME}/update`, async ({ id, data }, { rejectWithValue }) => {
  console.log(id, data);
  try {
    const { data: responseData } = await API.updateThumbnailGalleryItem(
      id,
      data
    );
    return responseData.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue({ errors: err.response.data });
    }
    return rejectWithValue({ errors: 'An unknown error occurred' });
  }
});

const thumbnailGallerySlice = createSlice({
  initialState,
  name: IMG_SLICE_NAME,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all items
      .addCase(getThumbnailGalleryThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getThumbnailGalleryThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.galleryData = [...payload];
      })
      .addCase(
        getThumbnailGalleryThunk.rejected,
        (state, action: PayloadAction<FetchError | undefined>) => {
          state.isFetching = false;
          state.error = action.payload?.errors || 'Failed to fetch data';
        }
      )
      // get single item
      .addCase(getThumbnailGalleryItemThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getThumbnailGalleryItemThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.selectedItem = payload;
      })
      .addCase(
        getThumbnailGalleryItemThunk.rejected,
        (state, action: PayloadAction<FetchError | undefined>) => {
          state.isFetching = false;
          state.error = action.payload?.errors || 'Failed to fetch data';
        }
      )
      // upload item
      .addCase(uploadGalleryThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(uploadGalleryThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.galleryData = [...state.galleryData, payload]; // Ensure immutability
      })
      .addCase(
        uploadGalleryThunk.rejected,
        (state, action: PayloadAction<FetchError | undefined>) => {
          state.isFetching = false;
          state.error = action.payload?.errors || 'Failed to upload data';
        }
      )
      // delete item
      .addCase(deleteThumbnailGalleryItemThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        deleteThumbnailGalleryItemThunk.fulfilled,
        (state, { payload: id }) => {
          state.isFetching = false;
          state.galleryData = state.galleryData.filter(
            (item) => +item.id !== id
          );
        }
      )
      .addCase(
        deleteThumbnailGalleryItemThunk.rejected,
        (state, action: PayloadAction<FetchError | undefined>) => {
          state.isFetching = false;
          state.error = action.payload?.errors || 'Failed to delete item';
        }
      )
      // update item
      .addCase(updateThumbnailGalleryItemThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        updateThumbnailGalleryItemThunk.fulfilled,
        (state, { payload }) => {
          state.isFetching = false;
          state.galleryData = state.galleryData.map((item) =>
            item.id === payload.id ? { ...item, ...payload } : item
          );
        }
      )
      .addCase(
        updateThumbnailGalleryItemThunk.rejected,
        (state, action: PayloadAction<FetchError | undefined>) => {
          state.isFetching = false;
          state.error = action.payload?.errors || 'Failed to update data';
        }
      );
  },
});

const { reducer } = thumbnailGallerySlice;

export default reducer;
