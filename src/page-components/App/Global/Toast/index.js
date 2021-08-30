import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ToastContainer, cssTransition } from 'react-toastify';
import CloseIcon from 'components/Icons/close.svg';
import screen from 'styles/helpers/media';

const Button = styled.button`
  margin-top: 1px;
  padding: 0;
  height: 22px;
  border: 0;
  background: none;
  appearance: none;
  outline: none;
  color: inherit;
  cursor: pointer;

  ${screen.md} {
    margin-top: 4px;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  width: 12px;
  height: 12px;
  fill: ${props => props.theme.whiteColor};
`;

const CloseButton = ({ closeToast }) => (
  <Button onClick={closeToast} type="button">
    <StyledCloseIcon />
  </Button>
);

CloseButton.propTypes = {
  closeToast: PropTypes.func,
};

CloseButton.defaultProps = {
  closeToast: null,
};

const Slide = cssTransition({
  enter: 'slideIn',
  exit: 'slideOut',
  duration: 300,
});

function Toast() {
  return (
    <ToastContainer
      transition={Slide}
      hideProgressBar
      autoClose={4000}
      closeButton={<CloseButton />}
    />
  );
}

export default Toast;
