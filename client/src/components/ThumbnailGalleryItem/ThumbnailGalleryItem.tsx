import React, { useEffect } from 'react';
import { RootState, AppDispatch } from '../../store';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getThumbnailGalleryItemThunk,
  deleteThumbnailGalleryItemThunk,
  updateThumbnailGalleryItemThunk,
} from '../../store/slices/thumbnailGallerySlice';
import { ImageData } from '../../interfaces';
import { URL } from '../../utils/constants';

interface ThumbnailGalleryItemProps {
  getGalleryDataItem: (id: number) => void;
  selectedItem: ImageData | null;
  isFetching: boolean;
  error: string | null;
}

const ThumbnailGalleryItem: React.FC<ThumbnailGalleryItemProps> = ({
  getGalleryDataItem,
  selectedItem,
  isFetching,
  error,
}) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getGalleryDataItem(Number(id));
    }
  }, [getGalleryDataItem, id]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedItem) {
    return <div>No item found.</div>;
  }

  return (
    <div>
      <h1>{selectedItem.title}</h1>
      <img src={`${URL}${selectedItem.fileName}`} alt={selectedItem.title} />
      {/* Add more item details as needed */}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  selectedItem: state.imgThumbnail.selectedItem,
  isFetching: state.imgThumbnail.isFetching,
  error: state.imgThumbnail.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getGalleryDataItem: (id: number) =>
    dispatch(getThumbnailGalleryItemThunk(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThumbnailGalleryItem);
