import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from './slices/carouselSlice';
import imgThumbnailReducer from './slices/thumbnailGallerySlice';
import authUser from './slices/authSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    imgThumbnail: imgThumbnailReducer,
    auth: authUser,
    usersList: usersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
