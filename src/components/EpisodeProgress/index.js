import ActiveProgress from 'components/EpisodeProgress/ActiveProgress';
import FirebaseProgress from 'components/EpisodeProgress/FirebaseProgress';
import { bool, number } from 'prop-types';
import React from 'react';

const EpisodeProgress = ({ currentTimeSeconds, durationSeconds, isActive, isLoading, isCompleted, isShowPage }) => {
  if (isLoading) {
    return null;
  }
  if (isActive) {
    return <ActiveProgress isShowPage={isShowPage} />;
  }
  return (
    <FirebaseProgress
      currentTimeSeconds={currentTimeSeconds}
      durationSeconds={durationSeconds}
      isCompleted={isCompleted}
      isShowPage={isShowPage}
    />
  );
};

EpisodeProgress.propTypes = {
  currentTimeSeconds: number,
  durationSeconds: number,
  isActive: bool,
  isLoading: bool,
  isCompleted: bool,
  isShowPage: bool,
};

EpisodeProgress.defaultProps = {
  currentTimeSeconds: 0,
  durationSeconds: 0,
  isActive: false,
  isLoading: false,
  isCompleted: false,
  isShowPage: false,
};

export default EpisodeProgress;
