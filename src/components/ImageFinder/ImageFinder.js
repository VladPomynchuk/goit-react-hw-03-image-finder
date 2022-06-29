import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
import { getImages } from '../../service/api';
import { toast } from 'react-toastify';
import { StyledFinder, Spinner } from './ImageFinder.styled';
import ButtonLoadMore from 'components/ButtonLoadMore';
import { TailSpin } from 'react-loader-spinner';

class ImageFinder extends Component {
  state = {
    request: '',
    images: [],
    page: 1,
    loading: false,
  };

  onSubmit = async value => {
    if (value !== this.state.request) {
      await this.setState({
        request: value,
        images: [],
        page: 1,
      });
      await this.fetchApi();
      return;
    }

    return toast.error('Please enter another request');
  };

  fetchApi = async () => {
    const { request, page } = this.state;

    this.setState({ loading: true });
    if (request !== '') {
      const newImages = await getImages(request, page);
      if (Array.isArray(newImages)) {
        this.setState(({ images, page }) => {
          return {
            images: [...images, ...newImages],
            page: (page += 1),
            loading: false,
          };
        });
      }
    }
  };

  render() {
    const { images, loading } = this.state;
    return (
      <StyledFinder>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && (
          <>
            <ImageGallery images={images} />
            {!loading && <ButtonLoadMore onClick={this.fetchApi} />}
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
