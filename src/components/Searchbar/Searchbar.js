import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  Header,
  StyledForm,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const schema = yup.object({
  request: yup.string(),
});

const initialValues = {
  request: '',
};

const FormError = ({ name }) => {
  return (
    <ErrorMessage name={name} render={message => toast.error(`${message}`)} />
  );
};

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ request }, actions) => {
    if (request.trim() === '') {
      return toast.error('Please, enter a request');
    }

    onSubmit(request.trim());
  };
  return (
    <Header>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <StyledForm>
          <Button type="submit">
            <AiOutlineSearch style={{ width: 25, height: 25 }} />
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            name="request"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <FormError name="request" />
        </StyledForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
