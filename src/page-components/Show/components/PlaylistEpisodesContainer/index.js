import React, { useEffect, useState } from 'react';
import PropTypes, { array, number, oneOfType } from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { EPISODE_ORIGIN } from 'utilities/constants';
import { addNewPlaylistSessionInfo } from 'store/actions/userSessionInfo';
import usePrevious from 'utilities/helpers/usePrevious';
import EpisodeList from './components/EpisodeList';

const PlaylistEpisodesContainer = ({ origin, playlistContents, isShowPage, isPlaylistPage }) => {
  const dispatch = useDispatch();

  const playlistSlug = playlistContents?.playlistSlug;
  const playlistName = playlistContents?.name;
  const episodes = playlistContents?.episodes;

  const [listedEpisodes, setListedEpisodes] = useState(episodes);

  const playerVisible = useSelector(state => state.playerOverlay?.visible, shallowEqual);
  const currentPlayingId = useSelector(state => state.episode?.id, shallowEqual);
  const { episodesLocal } = useSelector(({ userSessionInfo }) => ({ episodesLocal: userSessionInfo?.playlists?.[playlistSlug]?.episodes }));

  const previousEpisodesLocal = usePrevious(episodesLocal);

  useEffect(() => {
    const payload = { playlistSlug, playlistName, episodes };
    dispatch(addNewPlaylistSessionInfo(payload));
  }, []);

  useEffect(() => {
    if (!isEqual(episodesLocal, previousEpisodesLocal)) {
      setListedEpisodes(episodesLocal);
    }
  }, [episodesLocal]);

  if (!isEmpty(listedEpisodes)) {
    return (
      <EpisodeList
        episodes={listedEpisodes}
        currentPlayingId={currentPlayingId}
        name={playlistName}
        playerVisible={playerVisible}
        isPlaylistPage={isPlaylistPage}
        isShowPage={isShowPage}
        origin={origin}
        playlistSlug={playlistSlug}
      />
    );
  }

  return null;
};

PlaylistEpisodesContainer.propTypes = {
  playlistContents: PropTypes.shape({
    playlistSlug: PropTypes.string,
    name: PropTypes.string,
    episodes: PropTypes.arrayOf(
      oneOfType([
        array,
        number,
      ])
    ),
  }).isRequired,
  isPlaylistPage: PropTypes.bool,
  isShowPage: PropTypes.bool,
  origin: PropTypes.string,
};

PlaylistEpisodesContainer.defaultProps = {
  origin: EPISODE_ORIGIN.myPlaylist,
  isShowPage: false,
  isPlaylistPage: true,
};

export default PlaylistEpisodesContainer;
