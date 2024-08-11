import axios from 'axios';
import queryString from 'query-string';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
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

export const getThumnailGalleryData = (limit: number, offset: number) => {
  const query = queryString.stringify({ limit, offset });
  return axiosInstance.get(`/galleryItems/?${query}`);
}

// AUTH section
export const getUserById = (id: string) => {
  return axiosInstance.get(`/auth/${id}`);
}
// For login action
export const loginUser = (email: string, password: string) => {
  const query = queryString.stringify({ email, password });
  console.log(query, '<< query');
  return axiosInstance.post(`/auth/login/?${query}`);
};

// For signup action
export const signupUser = (name: string, email: string, password: string) => {
  const query = queryString.stringify({ name, email, password });
  return axiosInstance.post(`/auth/signup/?${query}`);
};


export default axiosInstance;

// Add this line to make the file a module
export {};