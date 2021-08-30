import Button from 'components/Button';
import { Flex, Box } from 'components/Grid';
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import { isMobile } from 'utilities/helpers/getDeviceInfo';
import PropTypes from 'prop-types';
import * as liveStreamPlayer from 'components/Player/LiveStreamPlayer/live-stream-player';
import { shallowEqual, useSelector } from 'react-redux';
import PhoneIcon from 'components/Icons/phone.svg';

const Root = styled(Flex)`
  width: 100%;
  z-index: 1;
  position: relative;
  color: ${props => props.theme.whiteColor};
`;

const StyleButton = styled(Flex)`
  width: 100%;
`;

function ActionBar({ studioPhone, isLive }) {
  const ref = useRef(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = isMobile();
    if (isMobileDevice) setMobile(true);
  }, []);

  const isStreaming = useSelector(state => state.liveStreamPlayer.playing, shallowEqual);

  const onCallHandler = () => {
    if (isStreaming) {
      liveStreamPlayer.tryPause();
    }
    window.open(`tel:${studioPhone}`);
  };

  return (
    <Root justifyContent="space-between">
      {mobile && studioPhone && (
      <Flex justifyContent="space-between" alignItems="center" width="100%" ref={ref}>
        <StyleButton justifyContent="center" alignItems="center">
          <Button
            as="button"
            variant="tertiary"
            text={(
              <Flex justifyContent="center" alignItems="center" mt={spacing.m}>
                <PhoneIcon />
                <Box ml={spacing.m}>Call Show</Box>
              </Flex>
            )}
            minWidthDesktop="228px"
            maxWidthDesktop="none"
            onClick={onCallHandler}
            disabled={!isLive}
          />
        </StyleButton>
      </Flex>
      )}
    </Root>
  );
}

ActionBar.propTypes = {
  studioPhone: PropTypes.string,
  isLive: PropTypes.bool,
};

ActionBar.defaultProps = {
  studioPhone: null,
  isLive: true,
};

export default ActionBar;
