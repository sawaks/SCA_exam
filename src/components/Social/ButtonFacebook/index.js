import React from 'react';
import styled from 'styled-components';
import { Flex } from 'components/Grid';
import FaceBookIcon from './assets/facebook-icon.svg';

function ButtonFacebook(props) {
  return (
    <StyledButton {...props}>
      <Flex css={{ height: 'inherit' }}>
        <Flex alignItems="center"><FaceBookIcon /></Flex>
      </Flex>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 2px;
  padding: 0;
  border: none;
  color: ${props => props.theme.whiteColor};
  cursor: pointer;
  svg {
    height: 43px;
    width: 53px;
  }
`;

export default ButtonFacebook;
