import GlobalStyles from './GlobalStyle';
import ImageFinder from './ImageFinder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <ImageFinder />
      <ToastContainer theme="colored" />
    </>
  );
};
