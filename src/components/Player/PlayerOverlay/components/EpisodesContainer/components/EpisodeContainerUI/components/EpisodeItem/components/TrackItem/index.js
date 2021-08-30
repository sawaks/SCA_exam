import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import { Box, Flex } from 'components/Grid';
import Paragraph from 'components/Typography/Paragraph';
import screen from 'styles/helpers/media';
import { formatSecondsToTime } from 'utilities/helpers/dateTime';
import Header from 'components/Typography/Header';
import EpisodeTags from '../EpisodeTags';

function TrackItem({ item, imgName, background, podcastName, isEpisodeNew }) {
  const imageUrl = get(item, 'show.images.square.url', null) || item.imageUrl;
  return (
    <StyledItem flexDirection="row">
      <StyledImage background={background}>
        <img
          src={imageUrl}
          alt={imgName}
          width={46}
          height={46}
        />
      </StyledImage>
      <Box>
        <StyledText flexDirection="column">
          <Header variant="s" as="h5" mb="xs" text={item.title} linesToShow={2} marginBottom="s" />
          <Flex justifyContent="flex-start" alignItems="center" flexWrap="wrap">
            <Flex justifyContent="flex-start" alignItems="flex-end" width="inherit">
              <EpisodeTags isEpisodeNew={isEpisodeNew} isExplicitContent={item.contentRating === 'Explicit'} />
              {podcastName && <Paragraph variant="m" as="p" mr="xs" transparent text={`${podcastName} - ${formatSecondsToTime(item.durationSeconds)}`} />}
            </Flex>
          </Flex>
        </StyledText>
      </Box>
    </StyledItem>
  );
}

const StyledText = styled(Flex)`
  color: ${props => props.theme.LEGACY_secondary};

  ${screen.md} {
    margin-right: 6px;
  }
`;

const StyledImage = styled(Box)`
  flex-shrink: 0;
  border-radius: 4px;
  margin-right: ${spacing.m};
  overflow: hidden;
  width: 46px;
  height: 46px;
`;

const StyledItem = styled(Flex)`
  width: inherit;
  cursor: pointer;
  text-decoration: none;
  page-break-inside: avoid;
  appearance: none;
  background: transparent;
  border: 0;
  text-align: left;
  padding: ${spacing.m};
`;

TrackItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    publishedUtc: PropTypes.string,
    contentRating: PropTypes.string,
    durationSeconds: PropTypes.number,
    item: PropTypes.number,
    season: PropTypes.number,
    info: PropTypes.string,
    publishedDate: PropTypes.string,
    playlistDate: PropTypes.string,
    playlistEp: PropTypes.string,
    comment: PropTypes.string,
    commentator: PropTypes.string,
    show: PropTypes.shape({
      images: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
  background: PropTypes.string,
  imgName: PropTypes.string,
  isEpisodeNew: PropTypes.bool,
  podcastName: PropTypes.string,
};

TrackItem.defaultProps = {
  background: null,
  imgName: '',
  isEpisodeNew: false,
  podcastName: null,
};

export default TrackItem;
