import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@rebass/grid';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import Card from 'components/Card';
import ClockIcon from 'components/Icons/clock.svg';
import { EpisodeWrapper } from '../index';

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
  height: ${props => (props.height ? props.height : '12px')};
  width: ${props => (props.mobileWidth ? props.mobileWidth : '50%')};
  background-color: ${props => props.theme.backgroundPale};
  margin-bottom: ${spacing.s};
  margin-right: ${props => (props.marginRight ? props.marginRight : 0)};
  ${screen.md} {
    width: ${props => (props.width ? props.width : '177px')};
  }
`;

const Loading = () => (
  <Card noBackgroundColor noBorder>
    <EpisodeWrapper variant="long">
      <Flex justifyContent="flex-start" width="100%">
        <StyledBox />
        <Flex flexDirection="column" justifyContent="space-between" mr={spacing.m} width="90%">
          <Box width="inherit" mb={spacing.s}>
            <StyledBar width="496px" mobileWidth="90%" height="16px" />
          </Box>
          <Box width="inherit" mb={spacing.m}>
            <StyledBar width="549px" mobileWidth="100%" />
            <StyledBar width="267px" mobileWidth="50%" />
          </Box>
          <Box width="inherit" mb={spacing.m}>
            <Flex>
              <Box mr={spacing.s}>
                <ClockIcon />
              </Box>
              <StyledBar width="100px" mobileWidth="15%" marginRight={`${spacing.s}`} />
              <StyledBar width="100px" mobileWidth="15%" />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </EpisodeWrapper>
  </Card>
);

function EpisodesLoading({ count }) {
  return (
    <Flex justifyContent="flex-start" flexDirection="column">
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
