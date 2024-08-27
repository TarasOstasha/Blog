import axios from 'axios';
import queryString from 'query-string';
import { ImageData } from '../interfaces';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Define a function to get carousel data with limit and offset
export const getCarouselData = (limit: number, offset: number) => {
  const query = queryString.stringify({ limit, offset });
  return axiosInstance.get(`/carouselItems/?${query}`);
  // return axiosInstance.get('/carouselItems/', {
  //   params: {
  //     limit,
  //     offset,
  //   },
  // });
};

// For login action
export const loginUser = (email: string, password: string) => {
  const query = queryString.stringify({ email, password });
  return axiosInstance.post(`/auth/login/?${query}`);
};

// For signup action
export const signupUser = (name: string, email: string, password: string) => {
  const data = { name, email, password };
  console.log(data, '<< signup data');
  return axiosInstance.post('/auth/signup', data);
};

export const uploadGalley = (formData: FormData) =>
  axiosInstance.post('/upload', formData);

export const getThumbnailGalleryData = (limit?: number, offset?: number) => {
  //return axiosInstance.get('/galleryItems', { params: { limit, offset } });
  return axiosInstance.get('/upload', { params: { limit, offset } });
};

export const deleteThumbnailGalleryItemById = (id: number) =>
  axiosInstance.delete(`/upload/${id}`);

export interface ImageData1 {
  id: number;
  fileName: string;
  title: string;
  author: string;
}
export const updateThumbnailGalleryItem = (
  id: number,
  data: Partial<ImageData>
) => axiosInstance.patch(`/upload/${id}`, data);

export default axiosInstance;

// Add this line to make the file a module
export {};
