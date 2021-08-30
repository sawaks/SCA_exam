import React from 'react';
import styled from 'styled-components';
import { Flex } from 'components/Grid';
import GoogleIcon from './assets/google_signin.svg';

function ButtonGoogle(props) {
  return (
    <StyledButton {...props}>
      <Flex css={{ height: 'inherit' }}>
        <Flex alignItems="center"><GoogleIcon /></Flex>
      </Flex>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.whiteColor};
  border: 1px solid ${props => props.theme.whiteColor};
  border-radius: 2px;
  padding: 0;
  color: ${props => props.theme.blackColor};
  cursor: pointer;
  svg {
    height: 48px;
    width: 48px;
  }
`;

export default ButtonGoogle;
