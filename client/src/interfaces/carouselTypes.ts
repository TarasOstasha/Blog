export interface CarouselData {
    id: number,
    img: string;
    title: string;
    description: string;
  }


export interface CarouselState {
    carouselData: CarouselData[];
    isFetching: boolean
    error: string | null;
}

export interface FetchError {
    errors: string;
}