import React, { useEffect, useState } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { updateActivePlaylist } from 'store/actions/active-playlist';
import { getPlaylists } from 'utilities/api/graphql/shows/queryMethods';
import EpisodesContainerUI from '../EpisodeContainerUI';
import getCombinedData from './utilities/combineWithPersonalisedData';

const CuratedEpisodesContainer = ({ podcastId, episodesOrigin, playlistSlug }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(null);
  const [sortedEpisodes, setSortedEpisodes] = useState(null);

  const { sessionInfo, userId, currentPlayingId } = useSelector(({ episode, userSessionInfo, profile }) => ({
    sessionInfo: get(userSessionInfo, 'listenedEpisodes', null),
    userId: get(profile, 'userId', null),
    currentPlayingId: get(episode, 'id', null),
  }), shallowEqual);

  useEffect(() => {
    async function getPlaylist() {
      if (playlistSlug) {
        const showContents = get(await getPlaylists(playlistSlug), 'playlist', null);
        setShow(showContents);
      }
    }
    getPlaylist();
  }, [playlistSlug]);

  useEffect(() => {
    if (show) {
      const episodeIds = show.episodes.map(item => item.id);
      dispatch(updateActivePlaylist(episodeIds));
      const arrangedEpisodes = getCombinedData(show, sessionInfo);
      setSortedEpisodes(arrangedEpisodes);
    }
  }, [show]);

  return (
    <EpisodesContainerUI
      episodesOrigin={episodesOrigin}
      userId={userId}
      sortedEpisodes={sortedEpisodes}
      playlistSlug={playlistSlug}
      currentPlayingId={currentPlayingId}
      sessionInfo={sessionInfo}
      podcastId={podcastId}
    />
  );
};

CuratedEpisodesContainer.propTypes = {
  podcastId: PropTypes.string.isRequired,
  episodesOrigin: PropTypes.string.isRequired,
  playlistSlug: PropTypes.string,
};

CuratedEpisodesContainer.defaultProps = {
  playlistSlug: '',

};

export default CuratedEpisodesContainer;
