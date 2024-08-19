export interface ImageData {
  id: string;
  img: string;
  title: string;
  author: string;
}

export interface GalleryProps {
  galleryData: ImageData[];
  isFetching: boolean;
  error: string | null;
  getGalleryData: (params: { limit: number; offset: number }) => void;
}

export interface thumbnailGalleryState {
  galleryData: ImageData[];
  isFetching: boolean;
  error: string | null;
}

export interface FetchError {
  errors: string;
}

export interface FormValues {
  title: string;
  author: string;
  image: File | null;
}
