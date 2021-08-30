import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@rebass/grid';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';

const StyledBox = styled.div`
  border-radius: 8px;
  height: 46px;
  width: 46px;
  background-color: ${props => props.theme.primary};
  margin-right: ${spacing.m};

  ${screen.md} {
    height: 52px;
    width: 52px;
  }
`;

const StyledBar = styled.div`
  height: ${props => (props.height ? props.height : '14px')};
  width: ${props => (props.mobileWidth ? props.mobileWidth : '50%')};
  background-color: ${props => props.theme.backgroundPale};
  margin-bottom: ${spacing.s};
  margin-right: ${props => (props.marginRight ? props.marginRight : 0)};
  ${screen.md} {
    width: ${props => (props.width ? props.width : '177px')};
  }
`;

const Loading = () => (
  <Flex justifyContent="flex-start" width="100%" mb={spacing.m}>
    <StyledBox />
    <Flex flexDirection="column" justifyContent="space-between" mr={spacing.m} width="90%">
      <Box width="inherit" mt={spacing.s}>
        <StyledBar width="431px" mobileWidth="90%" height="16px" />
      </Box>
      <Box width="inherit">
        <StyledBar width="177px" mobileWidth="30%" />
      </Box>
    </Flex>
  </Flex>
);

function EpisodesLoading({ count }) {
  return (
    <Flex justifyContent="flex-start" flexDirection="column" mx={spacing.l}>
      {[...Array(count)].map(item => (
        <Loading key={`${item}-${Math.random()}`} />
      ))}
    </Flex>
  );
}

EpisodesLoading.propTypes = {
  count: PropTypes.number,
};

EpisodesLoading.defaultProps = {
  count: 1,
};

export default EpisodesLoading;
