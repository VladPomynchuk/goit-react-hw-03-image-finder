import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
import { getImages } from '../../service/api';
import { StyledFinder, Spinner } from './ImageFinder.styled';
import ButtonLoadMore from 'components/ButtonLoadMore';
import { TailSpin } from 'react-loader-spinner';

class ImageFinder extends Component {
  state = {
    request: '',
    images: [],
    page: 1,
    loading: false,
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      this.loadingToggle();
      await getImages(
        this.state.request,
        this.state.page,
        this.updateImages,
        this.updateHits
      );
      this.loadingToggle();
    }
  }

  loadingToggle = () => {
    this.setState(({ loading }) => {
      return { loading: !loading };
    });
  };

  onSubmit = value => {
    if (value !== this.state.request) {
      this.setState({
        request: value,
        images: [],
        page: 1,
      });
    }
  };

  updateImages = newImages => {
    this.setState(({ images }) => {
      return { images: [...images, ...newImages] };
    });
  };

  incrementPage = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  updateHits = hits => {
    if (hits !== this.state.totalHits) {
      this.setState({ totalHits: hits });
    }
  };

  render() {
    const { images, loading, totalHits } = this.state;
    return (
      <StyledFinder>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && (
          <>
            <ImageGallery images={images} />
            {!loading && images.length !== totalHits && (
              <ButtonLoadMore onClick={this.incrementPage} />
            )}
          </>
        )}
        {loading && (
          <Spinner>
            <TailSpin
              color="#16aee0"
              height="50"
              width="50"
              ariaLabel="loading"
            />
          </Spinner>
        )}
      </StyledFinder>
    );
  }
}

export default ImageFinder;
