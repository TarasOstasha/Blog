import axios from 'axios';
import queryString from 'query-string';

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

// export const getThumnailGalleryData = (limit: number, offset: number) => {
//   const query = queryString.stringify({ limit, offset });
//   return axiosInstance.get(`/galleryItems/?${query}`);
// };

export const getThumnailGalleryData = (limit?: number, offset?: number) => {
  return axiosInstance.get('/galleryItems', { params: { limit, offset } });
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

export const uploadGalley = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post('/upload', formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data.message || 'An error occurred during the upload'
      );
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export default axiosInstance;

// Add this line to make the file a module
export {};
