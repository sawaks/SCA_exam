import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from 'components/Icons/close.svg';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';

const StyledCloseIcon = styled(CloseIcon)`
  width: 11.88px;
  height: 10px;

  cursor: pointer;
  margin-right: ${spacing.m};

  ${screen.md} {
     display: none;
  }
  
  & path {
    fill: ${props => props.theme.light};
  }
`;

function ClosePlayerUI({ onClick }) {
  return <StyledCloseIcon onClick={onClick} />;
}

ClosePlayerUI.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ClosePlayerUI;

