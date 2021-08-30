import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import Paragraph from 'components/Typography/Paragraph';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';

const NowPlayingInfoWrapper = styled(Flex)`
  height: 100%;
  min-width: 0; /* Preserves flexible truncation. See: https://css-tricks.com/flexbox-truncated-text/ */
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

const InfoDesktop = styled(Flex)`
  display: none;

  ${screen.md} {
    display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
    width: 100%;
    justify-content: flex-end;
    white-space: nowrap;
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

function TrackInfo({ artist, title, image, podcastName, dispatch }) {
  const currentTrackText = artist || podcastName;
  const imageUrl = image;

  const handleMaximisePlayerClick = (event) => {
    event.stopPropagation();
    dispatch(playerOverlayUpdateVisible(true));
  };

  return (
    <Box width={[1, 1, 1 / 2]}>
      <NowPlayingInfoWrapper
        flexDirection={['row', 'row', 'row-reverse']}
        justifyContent="start"
        alignItems="center"
        onClick={handleMaximisePlayerClick}
      >
        <StyledImage src={imageUrl} alt={`${title} ${podcastName} artwork`} />
        <InfoDesktop>
          <Paragraph linesToShow={1}>
            <StyledShowName>{currentTrackText}</StyledShowName>
            <StyledEpisodeTitle>{` - ${title}`}</StyledEpisodeTitle>
          </Paragraph>
        </InfoDesktop>
        <InfoMobile flexDirection="column" justifyContent="center" alignItems="start">
          <Paragraph variant="l" linesToShow={1} text={title} fontWeight={500} letterSpacing="1px" />
          <Paragraph variant="m" linesToShow={1} text={currentTrackText} letterSpacing="1px" transparent />
        </InfoMobile>
      </NowPlayingInfoWrapper>
    </Box>
  );
}

TrackInfo.propTypes = {
  podcastName: PropTypes.string,
  artist: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

TrackInfo.defaultProps = {
  podcastName: '',
  artist: '',
  title: '',
  image: '',
};

function mapStateToProps({ episode }) {
  return {
    podcastName: episode.show.name,
    title: episode.title,
    image: get(episode, 'show.images.squareSmall.url', null),
  };
}

export default connect(mapStateToProps)(TrackInfo);
