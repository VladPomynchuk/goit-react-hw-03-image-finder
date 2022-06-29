import { GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ data, openModal }) => {
  const handleClick = () => {
    openModal(data.largeImageURL);
  };

  return (
    <GalleryItem onClick={handleClick}>
      <img src={data.webformatURL} alt={data.tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
