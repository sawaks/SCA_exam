import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import { Box, Flex } from 'components/Grid';
import screen from 'styles/helpers/media';
import ExplicitIcon from 'components/Icons/explicitTag.svg';
import spacing from 'styles/helpers/spacing';
import Artwork from '../Artwork';

const StyledIcon = styled.div`
  padding-top: ${spacing.xs};
  margin-right:${spacing.m};
`;

const StyledShowInfo = styled(Box)`
  margin:${spacing.m} 0 ${spacing.l};
  ${screen.md} {
      margin:${spacing.l} 0;
  }

`;

const StyledDescription = styled.div`
  display: none;
   ${screen.md} {
    display: block;
  }
`;

function ShowInfo({ podcastName, showTitle, description, isExplicit, season, episodeNumber, isMobile }) {
  return (
    <StyledShowInfo>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column" justifyContent="flex-end">
          <Paragraph as="span" variant="m" text={podcastName} mb={isMobile ? 'xs' : 's'} />
          <Header variant="l" as="h1" text={showTitle} mb={isMobile ? 's' : 'm'} linesToShow={isMobile ? 1 : 2} />
          <StyledDescription>
            <Paragraph as="span" variant="m" text={description} mb="l" transparent linesToShow={3} />
          </StyledDescription>
          <Flex justifyContent="flex-start">
            {isExplicit && (
              <StyledIcon>
                <ExplicitIcon />
              </StyledIcon>
            )}
            {season && (
              <Paragraph as="span" variant="m" text={`S${season}`} />
            )}
            {episodeNumber && (
              <Paragraph as="span" variant="m" ml="s" text={`- EP${episodeNumber}`} />
            )}
          </Flex>
        </Flex>
        <Box>
          <Artwork />
        </Box>
      </Flex>
    </StyledShowInfo>
  );
}

ShowInfo.propTypes = {
  podcastName: PropTypes.string,
  showTitle: PropTypes.string,
  description: PropTypes.string,
  isExplicit: PropTypes.bool,
  season: PropTypes.number,
  episodeNumber: PropTypes.number,
  isMobile: PropTypes.bool,
};

ShowInfo.defaultProps = {
  podcastName: '',
  showTitle: '',
  description: '',
  isExplicit: true,
  season: 1,
  episodeNumber: 5,
  isMobile: false,
};

function mapStateToProps({ episode, device }) {
  return {
    showTitle: episode?.title,
    podcastName: episode?.show?.name,
    episodeNumber: episode?.episode,
    isExplicit: episode?.contentRating === 'Explicit',
    description: episode?.description,
    isMobile: device?.browser?.mobile,
  };
}

export default connect(mapStateToProps)(ShowInfo);
