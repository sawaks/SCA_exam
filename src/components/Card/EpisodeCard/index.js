import { Box, Flex } from '@rebass/grid';
import Card from 'components/Card';
import { Desktop, Mobile } from 'components/Screen';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { convertDate } from 'utilities/helpers/dateTime';
import { openPlayer } from '../../../store/actions/player-overlay';

import EpisodeInfo from './EpisodeInfo';
import PlayStatus from './PlayStatus';

function EpisodeCard({
  currentTimeSeconds,
  description,
  durationSeconds,
  episode,
  episodeId,
  episodeSlug,
  imageUrl,
  showImageUrl,
  isLocal,
  index,
  isEpisodeNew,
  isEpisodePage,
  isExplicit,
  isPlaylistPage,
  isShowPage,
  isTrendingEpisodes,
  maxWidthDesktop,
  maxWidthMobile,
  onGtmClick,
  origin,
  playlistSlug,
  publishedDate,
  season,
  showId,
  showSlug,
  title,
  variant,
  ...rest }) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    onGtmClick();
    dispatch(openPlayer({
      episodeId,
      episodePlayHeadPosition: currentTimeSeconds,
      episodeDuration: durationSeconds,
      playlistSlug,
      episodeOrigin: origin,
    }));
  };

  return (
    <Card {...rest} noBackgroundColor>
      <EpisodeWrapper variant={variant} maxWidthDesktop={maxWidthDesktop} maxWidthMobile={maxWidthMobile}>
        <Flex flexGrow={1} onClick={handleOnClick} key={episodeId}>
          <Box pr={spacing.m}>
            <StyledImage src={isLocal ? showImageUrl : imageUrl} />
          </Box>
          <Flex flexDirection="column" justifyContent="space-between" mr={spacing.m}>
            <Box>
              <Mobile>
                <Header as="h2" variant="s" text={title} linesToShow={variant === 'normal' ? 1 : 2} lineHeight={1.25} mb="m" />
                <Paragraph variant="m" text={description} linesToShow={3} mb="m" transparent />
              </Mobile>
              <Desktop>
                <Header as="h2" variant="s" text={title} linesToShow={variant === 'long' ? 1 : 2} lineHeight={1.25} mb="m" />
                <Paragraph variant="m" text={description} linesToShow={variant === 'long' ? 2 : 3} mb="m" transparent />
              </Desktop>
            </Box>
            <EpisodeInfo
              durationSeconds={durationSeconds}
              episode={episode}
              isExplicit={isExplicit}
              isNew={isEpisodeNew}
              publishedDate={convertDate(publishedDate)}
              season={season}
              variant={variant}
            />
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <PlayStatus
            currentTimeSeconds={currentTimeSeconds}
            durationSeconds={durationSeconds}
            episodeId={episodeId}
            episodeSeason={season}
            episodeSlug={episodeSlug}
            index={index}
            isEpisodePage={isEpisodePage}
            isShowPage={isShowPage}
            isTrendingEpisodes={isTrendingEpisodes}
            season={season}
            showId={showId}
            showSlug={showSlug}
          />
        </Flex>
      </EpisodeWrapper>
    </Card>
  );
}

const StyledImage = styled.img`
  object-fit: contain;
  border-radius: 8px;
  height: 46px;
  width: 46px;

  ${screen.md} {
    height: ${props => (props.variant === 'long' ? '52px' : '70px')};
    width: ${props => (props.variant === 'long' ? '52px' : '70px')};
  }
`;

export const EpisodeWrapper = styled(Flex)`
  border-radius: ${props => (props.variant === 'long' ? '10px' : '8px')};
  border: solid 1px rgba(255, 255, 255, 0.16);
  background-color: ${props => props.theme.backgroundLight};
  padding: ${spacing.m};
  max-width: ${props => (props.variant === 'long' ? 'none' : props.maxWidthMobile)};
  cursor: pointer;

  ${screen.md} {
    border-radius: 12px;
    height: ${props => (props.variant === 'long' ? '119px' : '157px')};
    max-width: ${props => (props.variant === 'long' ? 'none' : props.maxWidthDesktop)};
  }

  & svg {
    opacity: 1;
  }
`;

EpisodeCard.propTypes = {
  currentTimeSeconds: PropTypes.number,
  description: PropTypes.string,
  durationSeconds: PropTypes.number,
  episode: PropTypes.number,
  episodeId: PropTypes.string.isRequired,
  episodeSlug: PropTypes.string,
  imageUrl: PropTypes.string,
  showImageUrl: PropTypes.string,
  isLocal: PropTypes.bool,
  index: PropTypes.number.isRequired,
  isEpisodeNew: PropTypes.bool,
  isEpisodePage: PropTypes.bool,
  isExplicit: PropTypes.bool,
  isPlaylistPage: PropTypes.bool,
  isShowPage: PropTypes.bool,
  isTrendingEpisodes: PropTypes.bool,
  maxWidthDesktop: PropTypes.string,
  maxWidthMobile: PropTypes.string,
  onGtmClick: PropTypes.func,
  origin: PropTypes.oneOf(['default', 'myPlaylist', 'curatedPlaylist', 'topFeed', 'bottomFeed']),
  playlistSlug: PropTypes.string,
  publishedDate: PropTypes.string,
  season: PropTypes.number,
  showId: PropTypes.string,
  showSlug: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['normal', 'long']),
};

EpisodeCard.defaultProps = {
  currentTimeSeconds: 0,
  description: '',
  durationSeconds: 0,
  episode: null,
  episodeSlug: '',
  imageUrl: '',
  showImageUrl: '',
  isLocal: false,
  isEpisodeNew: false,
  isEpisodePage: false,
  isExplicit: false,
  isPlaylistPage: false,
  isShowPage: false,
  isTrendingEpisodes: false,
  maxWidthDesktop: '100%',
  maxWidthMobile: '100%',
  onGtmClick: () => ({}),
  origin: 'default',
  playlistSlug: '',
  publishedDate: '',
  season: null,
  showId: '',
  showSlug: '',
  title: '',
  variant: 'normal',
};

export default EpisodeCard;
