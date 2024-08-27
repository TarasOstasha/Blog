export interface ImageData {
  id: number;
  fileName: string;
  title: string;
  author: string;
}

export interface GalleryProps {
  galleryData: ImageData[];
  isFetching: boolean;
  error: string | null;
  getGalleryData: (params: { limit: number; offset: number }) => void;
  deleteItem: (id: number) => void;
  //updateItem: (id: number, data: Partial<ImageData>) => Promise<void>;
  updateItem: any;
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
