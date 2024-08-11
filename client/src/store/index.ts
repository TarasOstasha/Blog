import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from './slices/carouselSlice';
import imgThumbnailReducer from './slices/thumbnailGallerySlice';
import authUser from './slices/authSlice';

export const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    imgThumnail: imgThumbnailReducer,
    auth: authUser
  },
});





export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;