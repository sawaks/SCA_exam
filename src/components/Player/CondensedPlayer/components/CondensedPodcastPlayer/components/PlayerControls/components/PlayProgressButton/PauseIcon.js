import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const Bar = styled.div`
  width: 5px;
  height: 15px;
  background-color: ${props => props.theme.light};
  border-radius: 1.5px;
`;

const Gap = styled.div`
  padding: 1.5px;
`;

function PauseIcon() {
  return (
    <Flex>
      <Bar />
      <Gap />
      <Bar />
    </Flex>
  );
}

export default PauseIcon;
