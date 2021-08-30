import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import rgba from 'styles/helpers/rgba';
import NextButtonIcon from 'components/Icons/next-button.svg';

const NextTrack = styled.button`
  background: none;
  appearance: none;
  border: none;
  width: 34px;
  cursor: pointer;
  & path {
    fill: ${props => (props.disable ? rgba(props.theme.light, 0.3) : props.theme.light)};
  }
  & use {
    fill: ${props => (props.disable ? rgba(props.theme.light, 0.3) : props.theme.light)};
  }
  &:focus {
    outline: none;
  }
`;

function NextUI({ onClick, disable }) {
  return (
    <NextTrack onClick={onClick} disable={disable} title="Next track">
      <NextButtonIcon />
    </NextTrack>
  );
}

NextUI.propTypes = {
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool,
};

NextUI.defaultProps = {
  disable: false,
};

export default NextUI;
