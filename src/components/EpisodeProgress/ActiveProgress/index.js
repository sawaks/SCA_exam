import { Flex } from '@rebass/grid';
import CheckedIcon from 'components/Icons/checked.svg';
import PlayIcon from 'components/Icons/play.svg';
import RadialProgressBar from 'components/RadialProgressBar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ActiveProgress = () => {
  const episodeId = useSelector(state => state.episode?.id);
  const listenedEpisodes = useSelector(state => state.userSessionInfo.listenedEpisodes);

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(listenedEpisodes[episodeId]?.progress * 100);
  }, [listenedEpisodes[episodeId]]);

  if (Math.ceil(percentage) >= 100) {
    return <CheckedIconWrapper><CheckedIcon /></CheckedIconWrapper>;
  }

  if (percentage > 0) {
    return <RadialProgressBar percentage={percentage} />;
  }
  return (<PlayIconWrapper><PlayIcon /></PlayIconWrapper>);
};

const PlayIconWrapper = styled(Flex)`
  padding-left: 2px;
  justify-content: center;
  align-items: center;
  height: 100%;
  & svg {
    height: 11px;
    width: 12px;
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

export default ActiveProgress;
