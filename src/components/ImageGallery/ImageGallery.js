import ImageGalleryItem from 'components/ImageGalleryItem';
import { Component } from 'react';
import { GalleryList } from './ImageGallery.styled';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    showModal: false,
    imageForModal: '',
  };

  modalToggle = () => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  openModal = image => {
    this.modalToggle();
    this.setState({ imageForModal: image });
  };

  render() {
    const { imageForModal, showModal } = this.state;
    const { images } = this.props;
    return (
      <GalleryList>
        {images.map(el => (
          <ImageGalleryItem key={el.id} data={el} openModal={this.openModal} />
        ))}
        {showModal && (
          <Modal onClose={this.modalToggle}>
            <img src={imageForModal} alt="requestImage" />
          </Modal>
        )}
      </GalleryList>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
