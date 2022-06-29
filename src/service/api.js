import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://pixabay.com';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

const PER_PAGE = 12;

export const getImages = async (request, page) => {
  const params = {
    params: {
      key: '26934421-228fe3d802be0c8710ae14787',
      q: `${request}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: `${page}`,
      per_page: `${PER_PAGE}`,
    },
  };

  try {
    const fetchImages = await axios.get('/api/', params);
    const imagesArray = await fetchImages.data.hits;

    if (imagesArray.length === 0) {
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    return imagesArray;
  } catch (error) {
    toast.error('Ups... Something went wrong, try letter');
  }
};
