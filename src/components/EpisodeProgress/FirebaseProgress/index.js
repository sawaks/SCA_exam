import { Flex } from '@rebass/grid';
import CheckedIcon from 'components/Icons/checked.svg';
import PlayIcon from 'components/Icons/play.svg';
import RadialProgressBar from 'components/RadialProgressBar';
import { bool, number } from 'prop-types';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

const FirebaseProgress = ({ currentTimeSeconds, durationSeconds, isCompleted, isShowPage }) => {
  const percentage = useMemo(() => ((currentTimeSeconds <= 0) ? 0 : (currentTimeSeconds / durationSeconds) * 100),
    [currentTimeSeconds, durationSeconds]);

  if (Math.ceil(percentage) >= 100 || isCompleted) {
    return <CheckedIconWrapper><CheckedIcon /></CheckedIconWrapper>;
  }

  if (currentTimeSeconds) {
    return <RadialProgressBar percentage={percentage} />;
  }
  return (<PlayIconWrapper isShowPage={isShowPage}><PlayIcon /></PlayIconWrapper>);
};

const PlayIconWrapper = styled(Flex)`
  padding-left: 2px;
  justify-content: center;
  align-items: center;
  height: 100%;
  & svg {
    height: 11px;
    width: 12px;

    ${screen.md}{
      height: ${props => (props.isShowPage ? '11px' : '17px')};
      width: ${props => (props.isShowPage ? '12px' : '18px')};
    }
  }
`;

const CheckedIconWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  height: 100%;
  & svg {
    height: 13px;
    width: 18px;
  }
`;

FirebaseProgress.propTypes = {
  currentTimeSeconds: number,
  durationSeconds: number,
  isCompleted: bool,
  isShowPage: bool,
};

FirebaseProgress.defaultProps = {
  currentTimeSeconds: 0,
  durationSeconds: 0,
  isCompleted: false,
  isShowPage: false,
};

export default FirebaseProgress;
