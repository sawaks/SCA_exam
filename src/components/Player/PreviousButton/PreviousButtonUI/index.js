import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import rgba from 'styles/helpers/rgba';
import PreviousButtonIcon from 'components/Icons/previous-button.svg';

const PreviousTrack = styled.button`
  appearance: none;
  background: none;
  border: none;
  width: 30px;
  cursor: pointer;
  & path {
    fill: ${props => (props.enable ? props.theme.light : rgba(props.theme.light, 0.3))};
  }
  &:focus {
    outline: none;
  }
`;

function PreviousUI({ onClick, enable }) {
  return (
    <PreviousTrack onClick={onClick} enable={enable} title="Previous track">
      <PreviousButtonIcon />
    </PreviousTrack>
  );
}

PreviousUI.propTypes = {
  onClick: PropTypes.func.isRequired,
  enable: PropTypes.bool,
};

PreviousUI.defaultProps = {
  enable: false,
};

export default PreviousUI;
