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
export const loginUser = (email: string, password: string) =>
  axiosInstance.post('/auth/login', { email, password });

// For signup action
export const signupUser = (name: string, email: string, password: string) => {
  const data = { name, email, password };
  //console.log(data, '<< signup data');
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

export const updateThumbnailGalleryItem = (
  id: number,
  data: Partial<ImageData>
) => axiosInstance.patch(`/upload/${id}`, data);

// USERS

//export const createUser = data => axiosInstance.post('/users', data)

export const getUsers = (limit: number, offset: number) => {
  const query = queryString.stringify({ limit, offset });
  return axiosInstance.get(`/users/?${query}`);
};
//axiosInstance.get('/users');

export const updateUserRole = (id: string, role: string) =>
  axiosInstance.patch(`/users/${id}`, { role });

export const deleteUserById = (id: string) =>
  axiosInstance.delete(`/users/${id}`);

export default axiosInstance;

// Add this line to make the file a module
export {};
