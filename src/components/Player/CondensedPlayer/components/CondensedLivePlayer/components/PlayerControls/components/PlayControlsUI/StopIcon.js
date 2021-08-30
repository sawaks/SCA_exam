import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import screen from 'styles/helpers/media';

const Square = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${props => props.theme.light};
  border-radius: 1.5px;
  
  ${screen.md} {
    width: 14px;
    height: 14px;
  }
`;
function StopIcon() {
  return (
    <Flex>
      <Square />
    </Flex>
  );
}

export default StopIcon;
