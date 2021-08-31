import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { string, shape } from 'prop-types';
import get from 'lodash/get';
import { Flex } from 'components/Grid';
import routes from 'common/routes';
import styled from 'styled-components';
import screen from 'styles/helpers/screen';
import Header from 'components/Typography/Header';
import spacing from 'styles/helpers/spacing';
import PlayIcon from 'components/Icons/play-xl.svg';
import StopIcon from 'components/Icons/stop-xl.svg';
import InfoIcon from 'components/Icons/info.svg';
import * as trailerController from 'components/Trailer/player/trailerController';
import { shallowEqual, useSelector } from 'react-redux';
import { decrypt } from 'utilities/helpers/audioObsfucator';
import RadialProgressBar from './components/RadialProgressBar';

function PreviewCard({ episode, ...props }) {
  const show = get(episode, 'show', {});
  const audioUrl = decrypt(get(episode, 'audioUrl', ''));
  const imageUrl = get(episode, 'show.images.previewImage.url', '') || get(episode, 'show.images.squareLarge.url', '');
  const trailerPlayer = useSelector(state => state.trailerPlayer, shallowEqual);
  const [playing, setPlaying] = useState(trailerPlayer.playing);

  const getProgress = (currentTime, duration) => {
    if (!playing) {
      return 0;
    }
    if (!currentTime) {
      return 0;
    }
    if (currentTime === 0 || currentTime === duration) {
      setPlaying(false);
      return 0;
    }
    return (currentTime / duration) * 100;
  };

  const handlePlay = () => {
    trailerController.updateSource(audioUrl);
  };

  const handleStop = () => {
    trailerController.tryPause();
  };

  const handleCardClick = () => {
    setPlaying(!playing);
    if (playing) {
      handleStop();
    } else {
      handlePlay();
    }
  };

  useEffect(() => {
    if (audioUrl !== trailerPlayer.sourceUrl) {
      handleStop();
      setPlaying(false);
    }
  }, [trailerPlayer.sourceUrl]);

  return (
    <Flex>
      <PreviewWrapper {...props}>
        <StyledCardWrapper onClick={handleCardClick} onKeyPress={handleCardClick}>
          <StyledCard>
            <RadialProgressBar imageUrl={imageUrl} percentage={getProgress(trailerPlayer.currentTime, trailerPlayer.duration)} />
            <CardImage colour={show?.colourDark}>
              <img
                src={imageUrl}
                width="100%"
                height="100%"
                alt={show.name}
              />
            </CardImage>
          </StyledCard>
          <PlayIconWrapper>
            { playing ? <StopIcon /> : <PlayIcon /> }
          </PlayIconWrapper>
        </StyledCardWrapper>
        <Link href={`${routes.podcasts}/${show.slug}`} passHref>
          <a>
            <HeaderWrapper>
              <Header as="h3" variant="s" linesToShow={1} mt="m" text={show.name} />
            </HeaderWrapper>
            <InfoIconWrapper>
              <StyledInfoIcon />
            </InfoIconWrapper>
          </a>
        </Link>
      </PreviewWrapper>
    </Flex>
  );
}

const PreviewWrapper = styled.div`
  width: 136px;
  height: auto;
  cursor: pointer;
  padding-left: 7px;
  padding-right: ${props => ((props.index + 1) % 3 === 0 ? 0 : '2px')};

  ${screen.mobile} {
    width: 248px;
    height: auto;
    padding: 0 14px;
  }

  ${screen.tablet} {
    padding: 0 ${spacing.l};
  }
`;

const StyledCardWrapper = styled.div`
  position: relative;
`;

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.secondaryBorder};
  position: relative;
  background-color: ${props => props.theme.backgroundLight};

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  ${screen.tablet} {
    width: 220px;
    height: 220px;
  }
`;

const CardImage = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
  background-color: ${props => props.colour};

  ${screen.tablet} {
    width: 202px;
    height: 202px;
  }
`;

const HeaderWrapper = styled.div`
  width: 112px;
  text-align: center;

  ${screen.tablet} {
    width: 224px;
  }
`;

const PlayIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  right: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 50%;

  svg {
    width: 36px;
    height: 36px;

    circle {
      fill: ${props => props.theme.primary};
    }
  }

  &:hover, &:active {
    svg {
      circle {
        fill: ${props => props.theme.primaryActive};
      }
    }
  }

  ${screen.tablet}{
    bottom: 0px;
    right: 40px;

    svg {
      width: 48px;
      height: 48px;
    }
  }
`;

const InfoIconWrapper = styled.div`
  margin: 4px;
  text-align: center;

  ${screen.tablet} {
    margin: 6px;
  }
`;

const StyledInfoIcon = styled(InfoIcon)`
  width: 12px;
  height: 12px;

  ${screen.tablet} {
    width: 18px;
    height: 18px;
  }
`;

PreviewCard.propTypes = {
  episode: shape({
    id: string,
    audioUrl: string,
    show: shape({
      name: string,
      slug: string,
      images: shape({
        previewImage: shape({ url: string }),
        squareLarge: shape({ url: string }),
      }) }),
  }).isRequired,
};

export default PreviewCard;
