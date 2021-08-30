import React, { useEffect, useState, useMemo } from 'react';
import PropTypes, { string, arrayOf, object } from 'prop-types';
import { Box, Flex } from 'reflexbox';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import PlayIcon from 'components/Icons/play.svg';
import Equaliser from 'components/Equaliser';
import { useDispatch, useSelector } from 'react-redux';
import { openLiveShowPlayer } from '../../../../store/actions/player-overlay';
import { addLiveShow } from '../../../../store/actions/live-show';
import addToDataLayer from '../../../../utilities/helpers/dataLayer';
import gtm from '../../../../utilities/GTM/gtmTags';

function LiveShow({ showInfo, audioStreams, showContents }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { liveSchedule, name, images, slug, studioPhone } = showContents;

  const showImage = images?.squareLarge?.url || images?.square?.url;
  const bgImage = images?.background?.url;
  const audioStream = audioStreams[0];

  // Find the nearest schedule that has yet to start or has already started.
  const firstSchedule = useMemo(() => liveSchedule.find((showSchedule) => {
    const currentUtcDateTime = Date.now();
    const getStartDateTime = new Date(showSchedule.startUtc).getTime();
    const getEndDateTime = new Date(showSchedule.endUtc).getTime();
    const showHasStarted = (getStartDateTime < currentUtcDateTime) && (currentUtcDateTime < getEndDateTime);
    const showHasYetToStart = getStartDateTime > currentUtcDateTime;
    return showHasStarted || showHasYetToStart;
  }), []);

  useEffect(() => {
    if (showInfo && audioStream) {
      const payload = {
        showInfo,
        showImage,
        bgImage,
        showName: name,
        showSlug: slug,
        audioStream,
        studioPhone,
        ...(firstSchedule && firstSchedule),
      };
      dispatch(addLiveShow(payload));
    }
  }, [showInfo, firstSchedule, audioStream]);

  const { liveShowImage, liveShowName, liveShowInfo, liveShowStartUTC, liveShowEndUTC, isLive } = useSelector(state => state.liveShow);
  const { userId } = useSelector(state => state.profile);

  const [isShowLive, setShowIsLive] = useState(isLive);

  useEffect(() => {
    let timerToLive = null;
    let timerToEnd = null;

    if (liveShowEndUTC && liveShowStartUTC) {
      // Timestamp in UTC
      const currentUtcDateTime = Date.now();
      // eslint-disable-next-line no-console
      console.log('currentUtcDateTime to ISO', new Date(currentUtcDateTime).toISOString());
      const getAPIStartDateTime = new Date(liveShowStartUTC).getTime();
      const getAPIEndDateTime = new Date(liveShowEndUTC).getTime();

      // show has already started
      if ((getAPIStartDateTime < currentUtcDateTime) && (currentUtcDateTime < getAPIEndDateTime) && !isShowLive) {
        setShowIsLive(true);
        const timeToEnd = getAPIEndDateTime - currentUtcDateTime;
        // eslint-disable-next-line no-console
        console.log('time to show end in minutes', timeToEnd / 1000 / 60);
        timerToEnd = setTimeout(() => {
          setShowIsLive(false);
        }, timeToEnd);
      }

      // show has not started yet
      if (getAPIStartDateTime > currentUtcDateTime) {
        const timeToLive = getAPIStartDateTime - currentUtcDateTime;
        // eslint-disable-next-line no-console
        console.log('time to show start in minutes', timeToLive / 1000 / 60);
        timerToLive = setTimeout(() => {
          setShowIsLive(true);
          const currentTimeStamp = Date.now();
          const timeToEnd = getAPIEndDateTime - currentTimeStamp;
          timerToEnd = setTimeout(() => {
            setShowIsLive(false);
          }, timeToEnd);
        }, timeToLive);
      }
    }

    return () => {
      if (timerToLive) clearTimeout(timerToLive);
      if (timerToEnd) clearTimeout(timerToEnd);
    };
  }, [liveShowEndUTC, liveShowStartUTC]);

  const playerClick = () => {
    if (isShowLive) {
      dispatch(openLiveShowPlayer(slug, audioStream));
      addToDataLayer({
        event: gtm.podcastPlayEpisodeLive,
        liveShowName,
        streamingUrl: audioStream.url,
      });
    }
  };

  useEffect(() => {
    setShowIsLive(isLive);
    if (userId && isShowLive && router?.asPath.pathname === '/podcasts/[show]/live/player') {
      dispatch(openLiveShowPlayer(slug, audioStream));
    }
  }, [isLive, userId]);

  return (
    <Wrapper p={spacing.m} mb={[spacing.l, spacing.xl]} width={1}>
      <Flex flexShrink={0}>
        <StyledImage src={liveShowImage} />
      </Flex>
      <Flex
        flexDirection="column"
        marginLeft={spacing.m}
        justifyContent="flex-start"
      >
        <Flex mt={[0, spacing.xs]} mb={[spacing.s]}>
          {isShowLive && (
            <>
              <StyleLiveOnAir flexDirection="row" justifyContent="flex-start" alignItems="center">
                <StyledOval mr={spacing.s} />
                <Paragraph
                  variant="s"
                  text="LIVE ON AIR"
                  style={{ margin: 'auto 0 0' }}
                />
              </StyleLiveOnAir>
              <Box><Equaliser playing={isLive} /></Box>
            </>
          )}
        </Flex>
        <Flex>
          <Header text={liveShowName} variant="m" mb="s" mr="s" />
        </Flex>
        <Paragraph
          variant="l"
          text={isShowLive ? `${liveShowInfo}` : `Live show available ${liveShowInfo}`}
          transparent
          style={{ margin: 'auto 0 0' }}
        />
      </Flex>
      <PlayIconWrapper onClick={playerClick} flexShrink={0} isLive={isShowLive}>
        <PlayIcon />
      </PlayIconWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  background: ${props => props.theme.backgroundLight};
  border-radius: 8px;
  ${screen.md} {
    border-radius: 12px;
  }
`;

const StyledImage = styled.img`
  border-radius: 6px;
  width: 60px;
  height: 60px;
  ${screen.md} {
    width: 96px;
    height: 96px;
  }
`;

const StyledOval = styled(Box)`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: ${props => props.theme.milkPunch};
`;

const StyleLiveOnAir = styled(Flex)`
  border-radius: 50px;
  padding: ${spacing.xs} ${spacing.s};
  background: ${props => props.theme.primary};
`;

const PlayIconWrapper = styled(Flex)`
  padding-left: 2px;
  justify-content: center;
  align-items: center;
  height: 54px;
  width: 54px;
  border-radius: 50%;
  margin: 0 0 auto auto !important;
  cursor: pointer;
  background-color: ${props => props.theme.primary};
  opacity: ${props => (props.isLive ? 1 : 0.3)};
  & svg {
    height: 18px;
    width: 23px;
  }
  ${screen.md} {
    height: 72px;
    width: 72px;
    margin-top: auto !important;
    margin-right: 12px !important;
    & svg {
      height: 26px;
      width: 26px;
    }
  }
`;

LiveShow.propTypes = {
  showInfo: string,
  // eslint-disable-next-line react/forbid-prop-types
  audioStreams: arrayOf(object),
  // eslint-disable-next-line react/forbid-prop-types
  showContents: PropTypes.object.isRequired,
};

LiveShow.defaultProps = {
  showInfo: null,
  audioStreams: null,
};

export default LiveShow;
