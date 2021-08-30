import Divider from 'components/Divider';
import { Flex } from 'components/Grid';
import PlayIcon from 'components/Icons/play.svg';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import isEqual from 'lodash/isEqual';
import { bool, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openLiveStreamPlayer } from 'store/actions/player-overlay';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { LIVE_STREAM_ORIGIN } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const StationWrapper = styled(Flex)`
  width: 100%;
  margin: ${spacing.m} 0;
  &:first-child {
    margin-top: 0;
  }
  ${screen.md} {
    margin: ${spacing.l} 0;
  }
`;

const StyledCard = styled(Flex)`
  background: ${props => `url(${props.bgImage})` || props.theme.primary} no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  padding: ${spacing.m};
  overflow: hidden;
  position: relative;
  min-height: 230px;
  flex-direction: column;
  justify-content: flex-end;
  ${screen.md} {
    padding: ${spacing.l};
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const CardWrapper = styled(Flex)`
  background-color: ${props => props.bgColor};
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 170px;
  opacity: 0.8;
  background-image: linear-gradient(to bottom, rgba(32, 31, 32, 0), #201f20);
`;

const TextWrapper = styled(Flex)`
  z-index: 1;
  h3 {
    width: 55%;
  }
  ${screen.md} {
    height: 182px;
    width: 72.5%;
    h3 {
      width: 1000%;
    }
  }
`;

const StationImage = styled.img`
  width: auto;
  height: 146px;
  border-radius: 50%;
  z-index: 1;
  opacity: ${props => (props.loading ? 0 : 1)};
  position: absolute;
  right: ${spacing.m};
  top: ${spacing.m};
  background: ${props => props.colour || props.theme.background} no-repeat;
  padding: 10px;
  
  ${screen.md} {
    width: 182px;
    height: 182px;
    right: ${spacing.l};
    top: ${spacing.l};
    padding: 15px;
  }
`;

const PlayWrapper = styled(Flex)`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  margin-right: ${spacing.m};
  
  & svg {
    height: 16px;
    width: 14px;
  }  
  
  ${screen.md} {
    height: 58px;
    width: 58px;
    padding-left: 2px;

    & svg {
      height: 20px;
      width: 23px;
    }
  }
`;

const ArtworkWrapper = styled(Flex)`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: ${props => `url(${props.artwork}) no-repeat` || '#dd3636'};
  background-size: 40px 40px;
  margin: 0 ${spacing.m} 0 0;
  ${screen.md} {
    height: 58px;
    width: 58px;
    background-size: 58px 58px;
  }
`;

const StationCard = ({
  bgImage,
  callSign,
  colour,
  loading,
  logoImage,
  stationName,
  stationSlug,
}) => {
  const dispatch = useDispatch();
  const nowPlayingData = useSelector(state => state.nowPlaying[callSign.toLowerCase()], isEqual);
  const [songTitle, setSongTitle] = useState('');
  const [songArtwork, setSongArtwork] = useState('');

  useEffect(() => {
    if (nowPlayingData) {
      const { title, imageUrl, artistName } = nowPlayingData?.currentTrack;
      const trackInfo = (artistName || title) ? `${artistName} - ${title}` : '';
      setSongTitle(trackInfo);
      setSongArtwork(imageUrl);
    }
  }, [nowPlayingData]);

  const handleClick = () => {
    addToDataLayer({
      event: gtm.myFeedShowPlay,
      pageType: page.myFeedPage,
      stationName,
    });

    dispatch(openLiveStreamPlayer(stationSlug, LIVE_STREAM_ORIGIN.myFeed));
  };

  return (
    <StationWrapper flexDirection={['column', 'column', 'row']}>
      <CardWrapper bgColor={colour}>
        <StyledCard key={stationSlug} bgImage={bgImage} onClick={handleClick}>
          <TextWrapper flexDirection="column" justifyContent="flex-end">
            <Header as="h3" variant="l" text={stationName} mb="m" linesToShow={2} />
            {!loading && <StationImage src={logoImage} colour={colour} /> }
            <Divider />
            <Flex alignItems="center" mt={spacing.m} with={1}>
              <PlayWrapper justifyContent="center" alignItems="center" flexShrink="0">
                <PlayIcon />
              </PlayWrapper>
              <ArtworkWrapper artwork={songArtwork} flexShrink="0" />
              <Flex flexDirection="column">
                <Paragraph variant="m" text="Now Playing" transparent />
                <Paragraph variant="m" text={songTitle} linesToShow={2} />
              </Flex>
            </Flex>
          </TextWrapper>
          <Gradient />
        </StyledCard>
      </CardWrapper>
    </StationWrapper>
  );
};

StationCard.propTypes = {
  bgImage: string,
  callSign: string,
  colour: string,
  loading: bool,
  logoImage: string,
  stationName: string,
  stationSlug: string,
};

StationCard.defaultProps = {
  bgImage: '',
  callSign: '',
  colour: '',
  loading: false,
  logoImage: '',
  stationName: '',
  stationSlug: '',
};

export default StationCard;
