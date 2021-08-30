import { Flex } from 'components/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import rgba from '../../../../styles/helpers/rgba';
import MusicPopup from '../../MusicPopup';

const Root = styled(Flex)`
  width: 100%;
  box-sizing: border-box;
  cursor: ${props => (props.music ? 'default' : 'pointer')};
  position: relative;
`;

const BackgroundCSS = css`
  background-color: ${props => rgba(props.theme.light, props.withTheming ? 0.5 : 0.3)};
`;

const BorderCSS = css`
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

const ExtraSmallSizeCSS = css`
  height: 4px;
`;

const SmallSizeCSS = css`
  height: 6px;
`;

const MediumSizeCSS = css`
  height: 6px;
`;

const getHeightCSS = ({ variant }) => {
  switch (variant) {
    case 'xs':
      return ExtraSmallSizeCSS;
    case 's':
      return SmallSizeCSS;
    case 'm':
      return MediumSizeCSS;
    default:
      return MediumSizeCSS;
  }
};

const ProgressBarWrapper = styled.div`
  padding: 10px 0;
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
`;

const Div = styled.div`
  /* Reset the default appearance */
  position: relative;
  -webkit-appearance: none; /* stylelint-disable-line property-no-vendor-prefix */
  -moz-appearance: none; /* stylelint-disable-line property-no-vendor-prefix */
  appearance: none;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  transition: transform 1ms linear;
  padding: 0;
  top: 0;
  left: -1px;
  ${props => getHeightCSS(props)};
  ${props => props.withBackground && BackgroundCSS};
  ${props => props.withBorder && BorderCSS};
`;

const Progress = styled.div.attrs(props => ({
  style: { width: `${props.progress}%` },
}))`
  border-radius: 4px;
  box-sizing: border-box;
  background: ${props => (props.withTheming ? props.theme.primary : props.theme.light)};
  position: absolute;
  top: ${props => (props.withBorder ? '-1px' : 0)};
  transition: ${props => (props.inSeekMode ? 'transform 0.1s' : 'width 0.4s ease-out, transform 0.1s')};

  left: -1px;
  ${props => getHeightCSS(props)};
`;

const ExtraSmallHandleCSS = css`
  top: -5px;
  height: 10px;
  width: 10px;
`;

const SmallHandleCSS = css`
  top: -4px;
  height: 14px;
  width: 14px;
`;

const MediumHandleCSS = css`
  top: -8px;
  height: 20px;
  width: 20px;
`;

const getHandleCSS = (variant) => {
  switch (variant) {
    case 'xs':
      return ExtraSmallHandleCSS;
    case 's':
      return SmallHandleCSS;
    case 'm':
      return MediumHandleCSS;
    default:
      return MediumHandleCSS;
  }
};

const Handle = styled.div.attrs(props => ({
  style: { left: `calc(${props.progress}% - 10px)` },
}))`
  background: ${props => props.theme.primary};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transition: ${props => (props.inSeekMode ? 'transform 0.1s' : 'left 0.2s ease-out, transform 0.1s')};

  position: absolute;
  ${props => getHandleCSS(props.variant)};

  &:active {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.6);
    transform: scale(1.5);
  }

  &::after {
    content: '';
    padding: 10px;
    position: absolute;
  }
`;

function ProgressBar({
  currentProgress,
  duration,
  inSeekMode,
  music,
  musicPopupVisible,
  offSet,
  onCloseMusicPopup,
  onMouseDown,
  onSeek,
  onTouchStart,
  reference,
  variant,
  withBackground,
  withBorder,
  withHandle,
  withTheming,
}) {
  const getProgress = () => {
    if (!currentProgress) {
      return 0;
    }
    if (duration === 0) {
      return offSet;
    }
    return (currentProgress / duration) * 100;
  };

  const progress = getProgress();

  return (
    <Root flexDirection="column" justifyContent="center" music={music}>
      <ProgressBarWrapper onClick={onSeek} onKeyUp={onSeek} ref={reference}>
        <Div withBackground={withBackground} withTheming={withTheming} variant={variant} withBorder={withBorder}>
          <MusicPopup visible={musicPopupVisible} onCloseClick={onCloseMusicPopup} />
          <Progress inSeekMode={inSeekMode} progress={progress} withTheming={withTheming} withBackground={withBackground} withBorder={withBorder} variant={variant} />
          {withHandle && !music && <Handle inSeekMode={inSeekMode} progress={progress} onMouseDown={onMouseDown} onTouchStart={onTouchStart} variant={variant} />}
        </Div>
      </ProgressBarWrapper>
    </Root>
  );
}

ProgressBar.propTypes = {
  currentProgress: PropTypes.number,
  duration: PropTypes.number,
  inSeekMode: PropTypes.bool,
  music: PropTypes.bool,
  musicPopupVisible: PropTypes.bool,
  offSet: PropTypes.number,
  onCloseMusicPopup: PropTypes.func,
  onMouseDown: PropTypes.func,
  onSeek: PropTypes.func,
  onTouchStart: PropTypes.func,
  reference: PropTypes.func,
  variant: PropTypes.oneOf(['xs', 's', 'm']).isRequired,
  withBackground: PropTypes.bool.isRequired,
  withBorder: PropTypes.bool,
  withHandle: PropTypes.bool,
  withTheming: PropTypes.bool.isRequired,
};

ProgressBar.defaultProps = {
  currentProgress: 0,
  duration: 0,
  inSeekMode: false,
  music: false,
  musicPopupVisible: false,
  offSet: 0,
  onCloseMusicPopup: null,
  onMouseDown: null,
  onSeek: null,
  onTouchStart: null,
  reference: null,
  withBorder: false,
  withHandle: false,
};

export default ProgressBar;

