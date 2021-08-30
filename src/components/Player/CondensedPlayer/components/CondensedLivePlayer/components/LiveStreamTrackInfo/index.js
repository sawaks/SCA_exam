import { Box, Flex } from '@rebass/grid';
import Paragraph from 'components/Typography/Paragraph';
import get from 'lodash/get';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';

function LiveStreamTrackInfo() {
  const dispatch = useDispatch();

  const stationName = useSelector(({ station }) => station.name, shallowEqual);
  const callSign = useSelector(({ station }) => get(station, 'audioStreams[0].callSign', '').toLowerCase(), shallowEqual);
  const imageUrl = useSelector(({ nowPlaying }) => nowPlaying[callSign]?.currentTrack?.imageUrl, shallowEqual);
  const currentTrackText = useSelector(({ nowPlaying }) => {
    const artistName = nowPlaying[callSign]?.currentTrack?.artistName;
    const title = nowPlaying[callSign]?.currentTrack?.title;

    if (!(artistName && title)) {
      return '';
    }

    return artistName ? `${artistName} - ${title}` : title;
  }, shallowEqual);

  const handleMaximisePlayerClick = (event) => {
    event.stopPropagation();
    dispatch(playerOverlayUpdateVisible(true));
  };

  return (
    <Box width={1}>
      <NowPlayingInfoWrapper
        flexDirection={['row', 'row', 'row-reverse']}
        justifyContent="start"
        alignItems="center"
        onClick={handleMaximisePlayerClick}
      >
        <StyledImage src={imageUrl} alt="Now playing artwork" />
        <InfoWrapperDesktop justifyContent="space-between" width={1}>
          <Paragraph as="span" fontWeight="bold" lineHeight="1.2" whiteSpace="nowrap">{stationName}</Paragraph>
          <InfoDesktop>
            <StyledShowName>Now Playing</StyledShowName>
            <StyledEpisodeTitle>{currentTrackText && ` - ${currentTrackText}`}</StyledEpisodeTitle>
          </InfoDesktop>
        </InfoWrapperDesktop>
        <InfoMobile flexDirection="column" justifyContent="center" alignItems="start">
          <Paragraph variant="m" linesToShow={1} fontWeight={500} letterSpacing="1px" text={currentTrackText} />
          <Paragraph variant="m" linesToShow={1} text={stationName} letterSpacing="1px" transparent />
        </InfoMobile>
      </NowPlayingInfoWrapper>
    </Box>
  );
}

const NowPlayingInfoWrapper = styled(Flex)`
  height: 100%;
  min-width: 0; /* Preserves flexible truncation. See: https://css-tricks.com/flexbox-truncated-text/ */
  color: ${props => props.theme.light};
  line-height: 18px;
`;

const StyledImage = styled.img`
  width: 36px;
  height: 36px;
  box-sizing: content-box;
  object-fit: cover;
  background-color: #fff;
  border-radius: 5px;
  user-select: none;
  margin-right: ${spacing.s};

  ${screen.md} {
    margin-left: ${spacing.l};
    margin-right: 0;
  }
`;

const InfoWrapperDesktop = styled(Flex)`
  display: none;

  ${screen.md} {
    display: flex; /* stylelint-disable-line value-no-vendor-prefix */
  }
`;

const InfoDesktop = styled(Flex)`
  display: none;

  ${screen.md} {
    display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
    width: 100%;
    justify-content: flex-end;
    white-space: pre-wrap;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: right;
  }
`;

const InfoMobile = styled(Flex)`
  ${screen.md} {
    display: none;
  }
`;

const StyledShowName = styled.span`
  line-height: 1.2;
  font-size: 14px;
  font-weight: normal;
`;

const StyledEpisodeTitle = styled.span`
  opacity: 0.6;
  font-size: 14px;
  font-weight: normal;
`;

export default LiveStreamTrackInfo;
