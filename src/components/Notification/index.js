/* eslint-disable react/no-unused-prop-types */
import Header from 'components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import theme from 'styles/theme';

const StyledNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-color: ${theme.formError};
  background-color: ${theme.formError};
  color: ${theme.light};
  position: absolute;
  top: ${props => (props.mobileTopOffset ? props.mobileTopOffset : '5px')};
  right: ${props => (props.mobileRightOffset ? props.mobileRightOffset : '5px')};
  display: flex;
  justify-content: center;
  align-items: center;

  ${screen.md} {
    width: 40px;
    height: 40px;
    top: ${props => (props.desktopTopOffset ? props.desktopTopOffset : '5px')};
    right: ${props => (props.desktopRightOffset ? props.desktopRightOffset : '5px')};
  }
`;

export default function Notification({ count }) {
  return (
    <StyledNumber>
      <Header variant="s" as="span" text={count.toString()} linesToShow={1} />
    </StyledNumber>
  );
}

Notification.propTypes = {
  count: PropTypes.number.isRequired,
  desktopTopOffset: PropTypes.string,
  desktopRightOffset: PropTypes.string,
  mobileTopOffset: PropTypes.string,
  mobileRightOffset: PropTypes.string,
};

Notification.defaultProps = {
  desktopTopOffset: null,
  desktopRightOffset: null,
  mobileTopOffset: null,
  mobileRightOffset: null,
};
