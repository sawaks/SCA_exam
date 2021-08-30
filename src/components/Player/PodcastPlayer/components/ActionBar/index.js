import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import { Box, Flex } from 'components/Grid';
import Button from 'components/Button';
import get from 'lodash/get';
import SocialShareButton from '../../../../Social/SocialShareButton';
import PlaybackRate from '../PlaybackRateButton';

const Root = styled(Flex)`
  width: 100%;
  z-index: 1;
  position: relative;
  color: ${props => props.theme.whiteColor};

`;

const StyleUpNext = styled.div`
  flex-grow: 2;
  width: 100%;
  margin-right: ${spacing.m};
`;

const StyledShareButton = styled.div`
  height: 40px;
  margin-right: ${spacing.m};
`;

function ActionBar() {
  const ref = useRef(null);

  const handleClick = () => ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const [showUpNextBtn, setShowUpNextBtn] = useState(true);

  const { title, currentPlayingId, playlist } = useSelector(({ episode, activePlaylist }) => ({
    title: get(episode, 'title', null),
    currentPlayingId: get(episode, 'id', null),
    playlist: get(activePlaylist, 'episodesList', null),
  }), shallowEqual);

  useEffect(() => {
    if (playlist.length > 0 && playlist.findIndex(item => item === currentPlayingId) === (playlist.length - 1)) {
      setShowUpNextBtn(false);
    }
  }, [playlist, currentPlayingId]);

  return (
    <Root justifyContent="space-between">
      <Flex justifyContent={showUpNextBtn ? 'space-between' : 'flex-end'} alignItems="center" width="100%" ref={ref}>
        {showUpNextBtn && (
        <StyleUpNext>
          <Button
            variant="tertiary"
            text="Up Next"
            minWidthDesktop="228px"
            maxWidthDesktop="none"
            onClick={handleClick}
          />
        </StyleUpNext>
        )}
        <StyledShareButton>
          <SocialShareButton episodeTitle={title} shareItem="episode" location="show-details" isEpisode btnType="tertiary" />
        </StyledShareButton>
        <Box>
          <PlaybackRate />
        </Box>
      </Flex>
    </Root>
  );
}

export default ActionBar;
