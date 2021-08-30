import { Box, Flex } from 'components/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import LockIcon from 'components/Icons/lock.svg';
import isEqual from 'lodash/isEqual';
import MinimizePlayer from '../../../MinimizePlayer';
import SeekBar from '../../../SeekBar';
import ActionBar from '../ActionBar';
import PlayerControls from '../PlayerControls';
import ShowInfo from '../ShowInfo';
import TimeInfo from '../TimeInfo';

const Hr = styled.hr`
  width: 100%;
  border: 0;
  opacity: 0.3;
  border-top: 2px solid ${props => props.theme.whiteColor};
  margin-bottom: ${spacing.m};
`;

const Root = styled.div`
  background-color: ${props => props.theme.primary};
  background-image: ${props => (props.backgroundUrl ? `url(${props.backgroundUrl})` : 'none')};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  transition: background-image 1000ms ease-out 200ms;
`;

const Wrapper = styled(Flex)`
  padding: 0 ${spacing.m};
  height: ${props => (props.displayDownloadBanner ? 'calc(100vh - 190px)' : 'calc(100vh - 120px)')};
   ${screen.md} {
    height: inherit;
  }
`;

const StyledHero = styled.div`
  width: 100%;
  overflow: visible;
  padding: ${spacing.m};
  position: relative;
  color: ${props => props.theme.whiteColor};
  background: ${props => props.theme.backgroundGradient};
`;

const StyledSeekBar = styled(Box)`
  position: relative;
  margin-bottom: ${spacing.l};
   ${screen.md} {
     margin-top: 250px;
  }
`;

const LockIconWrapper = styled.div`
  position: absolute;
  top: -30px;
`;

function PodcastPlayerUI({ backgroundUrl, displayDownloadBanner, music, analyticsData }) {
  return (
    <Root backgroundUrl={backgroundUrl}>
      <StyledHero>
        <MinimizePlayer analyticsData={analyticsData} />
        <Wrapper flexDirection="column" justifyContent="flex-end" displayDownloadBanner={displayDownloadBanner}>
          <StyledSeekBar>
            {music && <LockIconWrapper><LockIcon /></LockIconWrapper>}
            <SeekBar expanded withBackground withHandle variant="m" music={music} analyticsData={analyticsData} />
            <TimeInfo />
          </StyledSeekBar>
          <ShowInfo />
          <Hr />
          <PlayerControls analyticsData={analyticsData} music={music} />
          <ActionBar />
        </Wrapper>
      </StyledHero>
    </Root>
  );
}

PodcastPlayerUI.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  analyticsData: PropTypes.object.isRequired,
  backgroundUrl: PropTypes.string,
  displayDownloadBanner: PropTypes.bool,
  music: PropTypes.bool,
};

PodcastPlayerUI.defaultProps = {
  backgroundUrl: null,
  displayDownloadBanner: false,
  music: false,
};

export default React.memo(PodcastPlayerUI, isEqual);
