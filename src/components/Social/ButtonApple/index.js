import React from 'react';
import styled from 'styled-components';
import { Flex } from 'components/Grid';
import AppleIcon from './assets/apple-icon.svg';

function ButtonApple(props) {
  return (
    <StyledButton {...props}>
      <Flex css={{ height: 'inherit' }}>
        <Flex alignItems="center"><AppleIcon /></Flex>
      </Flex>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 2px;
  border: none;
  padding: 0;
  color: ${props => props.theme.whiteColor};
  cursor: pointer;
  svg {
    height: 48px;
    width: 48px;
  }
`;

export default ButtonApple;
