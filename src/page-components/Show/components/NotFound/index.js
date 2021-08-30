import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '../../../../components/Grid';
import screen from '../../../../styles/helpers/media';
import Header from '../../../../components/Typography/Header';
import ErrorIcon from '../../../../components/Icons/no-podcast-copy.svg';

const StyledText = styled(Flex)`
  color: rgba(${props => props.theme.secondary}, 0.7);
`;

const Content = styled(Flex)`
  min-height: calc(100vh - 400px);
  ${screen.md} {
    min-height: calc(100vh - 300px);
  }
`;

const NotFound = () => (
  <Content flexDirection="column" alignItems="center" justifyContent="center">
    <Box>
      <ErrorIcon />
    </Box>
    <Box>
      <StyledText flexDirection="column" alignItems="center">
        <Header as="h4" text="This content is no longer available" style={{ textAlign: 'center', width: '80%', padding: '20px 0 50px' }} />
      </StyledText>
    </Box>
  </Content>
);

export default NotFound;
