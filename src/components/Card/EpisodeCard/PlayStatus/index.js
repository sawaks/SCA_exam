import EpisodeProgress from 'components/EpisodeProgress';
import MoreOptions from 'components/MoreOptions';
import { bool, number, string } from 'prop-types';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addOrUpdateEpisode } from 'store/actions/listened-episodes';
import { displaySignupModal, markAsPlayed } from 'store/actions/userInteractions';
import styled from 'styled-components';

const PlayStatus = ({
  currentTimeSeconds,
  durationSeconds,
  episodeId,
  episodeSeason,
  episodeSlug,
  index,
  isEpisodePage,
  isShowPage,
  isTrendingEpisodes,
  showId,
  showSlug,
}) => {
  const MARK_AS_PLAYED = 'Mark as played';
  const MARK_AS_UNPLAYED = 'Mark as unplayed';

  const dispatch = useDispatch();
  const userId = useSelector(({ profile }) => (profile.userId), shallowEqual);
  const isActive = useSelector(state => state.episode?.id === episodeId, shallowEqual);
  const isMarkedAsPlayed = useSelector(({ userSessionInfo }) => userSessionInfo.listenedEpisodes[episodeId]?.isMarkedAsPlayed, shallowEqual);
  const isCompleted = useSelector(({ userSessionInfo }) => userSessionInfo?.shows[showId]?.seasons[0]?.episodes[index]?.isCompleted, shallowEqual);
  const showTick = isCompleted || isMarkedAsPlayed;

  const handleClick = async () => {
    if (!userId) {
      dispatch(displaySignupModal());
    }
    if (userId) {
      await dispatch(addOrUpdateEpisode(userId, {
        id: episodeId,
        slug: episodeSlug,
        season: episodeSeason,
        durationSeconds,
        showId,
        showSlug,
        playheadPosition: currentTimeSeconds,
        isMarkedAsPlayed: !showTick,
      }));
      dispatch(markAsPlayed());
    }
  };

  return (
    <>
      <PlayWrapper>
        <EpisodeProgress
          currentTimeSeconds={currentTimeSeconds}
          durationSeconds={durationSeconds}
          isActive={isActive}
          isCompleted={showTick}
          isShowPage={isShowPage}
        />
      </PlayWrapper>
      <MoreOptionsWrapper>
        <MoreOptions
          disable={false}
          dropdownId={episodeId}
          isActive={isActive}
          isShowPage={isShowPage}
          isEpisodePage={isEpisodePage}
          onClick={handleClick}
          showSlug={showSlug}
          showText="Go to show"
          text={showTick ? MARK_AS_UNPLAYED : MARK_AS_PLAYED}
          visible
          isTrendingEpisodes={isTrendingEpisodes}
        />
      </MoreOptionsWrapper>
    </>
  );
};

const PlayWrapper = styled.div`
  height: 27px;
  width: 27px;
  border-radius: 50%;
  background-color: ${props => props.theme.backgroundPale};
`;

const MoreOptionsWrapper = styled.div`
  transform: translateY(2px);
`;

PlayStatus.propTypes = {
  currentTimeSeconds: number,
  durationSeconds: number,
  episodeId: string.isRequired,
  episodeSlug: string.isRequired,
  episodeSeason: number,
  showId: string,
  showSlug: string,
  isShowPage: bool,
  isEpisodePage: bool,
  isTrendingEpisodes: bool,
  index: number.isRequired,
};

PlayStatus.defaultProps = {
  currentTimeSeconds: 0,
  durationSeconds: 0,
  episodeSeason: 0,
  showId: '',
  showSlug: '',
  isEpisodePage: false,
  isShowPage: false,
  isTrendingEpisodes: false,
};

export default PlayStatus;
