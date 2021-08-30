import { Box, Flex } from '@rebass/grid';
import { Content } from 'components/Grid';
import SlideUpOverlay from 'components/Layout/SlideUpOverlay';
import PodcastPlayer from 'components/Player/PodcastPlayer';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import EpisodesContainer from '../../EpisodesContainer';

const StyledContainer = styled(Flex)`
  max-width: 823px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  ${screen.md} {
    padding-top: ${spacing.m};
    height: 100vh;
  }
`;

const StyledContent = styled(Content)`
  background-color: ${props => props.theme.background};
  flex-grow: 1;
`;

function PlayerOverlayUI({ visible, podcastSlug, podcastId, podcastTitle, episodeOrigin, playlistSlug }) {
  return (
    <SlideUpOverlay visible={visible}>
      <StyledContainer flexDirection="column">
        <PodcastPlayer />
        <StyledContent>
          { podcastSlug && (
            <>
              <Flex>
                <Box width={1}>
                  <EpisodesContainer
                    slug={podcastSlug}
                    podcastId={podcastId}
                    name={podcastTitle}
                    dropdownButtonId="filter-episode-desktop"
                    episodesOrigin={episodeOrigin}
                    playlistSlug={playlistSlug}
                  />
                </Box>
              </Flex>
            </>
          )}
        </StyledContent>
      </StyledContainer>
    </SlideUpOverlay>
  );
}

PlayerOverlayUI.propTypes = {
  visible: PropTypes.bool.isRequired,
  episodeOrigin: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  episodeSlug: PropTypes.string.isRequired,
  playlistSlug: PropTypes.string,
  podcastSlug: PropTypes.string.isRequired,
  podcastId: PropTypes.string.isRequired,
  podcastTitle: PropTypes.string.isRequired,
};

PlayerOverlayUI.defaultProps = {
  playlistSlug: '',
};

function areEqual(props, nextProps) {
  const overlayVisibilityUpdate = props.visible === nextProps.visible;
  const episodeSlugUpdate = props.episodeSlug === nextProps.episodeSlug;
  return episodeSlugUpdate && overlayVisibilityUpdate;
}

export default React.memo(PlayerOverlayUI, areEqual);
