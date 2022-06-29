import { StyledButton } from './ButtonLoadMore.styled';
import PropTypes from 'prop-types';

const ButtonLoadMore = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      Load more
    </StyledButton>
  );
};

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonLoadMore;
