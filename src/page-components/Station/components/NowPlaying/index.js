import React from 'react';
import { shape, bool, string, func } from 'prop-types';
import { Box, Flex } from 'reflexbox';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import PlayIcon from 'components/Icons/play.svg';
import Equaliser from 'components/Equaliser';

function NowPlaying({ currentTrack, stationName, bgColour, isPlaying, openPlayer, dataTest }) {
  const { title, imageUrl, artistName } = currentTrack;
  const trackInfo = (artistName || title) ? `${artistName} - ${title}` : '';

  return (
    <Wrapper bg={bgColour} p={spacing.m} mb={[spacing.l, spacing.xl]} width={1}>
      <Flex flexShrink={0}>
        <StyledImage src={imageUrl} />
      </Flex>
      <Flex
        flexDirection="column"
        marginLeft={spacing.m}
        justifyContent="flex-start"
      >
        <Flex>
          <Header text="Now playing" variant="m" mb="s" mr="s" />
          <Box mt={[0, spacing.xs]}><Equaliser playing={isPlaying} /></Box>
        </Flex>
        <Box maxWidth={[180, '100%']}>
          <Paragraph
            variant="l"
            text={trackInfo}
            linesToShow={2}
          />
        </Box>
        <Paragraph
          variant="l"
          text={stationName}
          transparent
          style={{ margin: 'auto 0 0' }}
        />
      </Flex>
      <PlayIconWrapper onClick={openPlayer} data-test={dataTest} flexShrink={0}>
        <PlayIcon />
      </PlayIconWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
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

NowPlaying.propTypes = {
  bgColour: string.isRequired,
  isPlaying: bool,
  currentTrack: shape({
    title: string,
    imageUrl: string,
    artistName: string,
  }),
  stationName: string,
  openPlayer: func.isRequired,
  dataTest: string,
};

NowPlaying.defaultProps = {
  isPlaying: false,
  currentTrack: {
    title: '',
    imageUrl: '',
    artistName: '',
  },
  stationName: '',
  dataTest: null,
};

export default NowPlaying;
