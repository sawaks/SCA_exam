import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { updateActivePlaylist } from 'store/actions/active-playlist';
import { addNewShowSessionInfo, addSeasonToShowSessionInfo } from 'store/actions/userSessionInfo';
import usePrevious from 'utilities/helpers/usePrevious';

import EpisodesContainerUI from '../EpisodeContainerUI';
import getAndSaveShowData from './utilities/getAndSaveShowData';

const ShowEpisodesContainer = ({ slug, podcastId, episodesOrigin, playlistSlug }) => {
  const dispatch = useDispatch();
  const [sortedEpisodes, setSortedEpisodes] = useState(null);

  // Get Id
  const userId = useSelector(({ profile }) => profile?.userId);

  // Get current show
  const currentShow = useSelector(({ userSessionInfo: { shows } }) => shows?.[podcastId]);
  const previousShow = usePrevious(currentShow);

  // Get current episodes
  const { currentPlayingId, currentSeason, nextSeason, episodeSlug, showSlug } = useSelector(({ episode }) => ({
    currentPlayingId: episode?.id,
    nextSeason: episode?.nextSeason,
    currentSeason: episode?.season,
    episodeSlug: episode?.slug,
    showSlug: episode?.show?.slug,
  }), shallowEqual);

  // Updated episode list
  useEffect(() => {
    async function updatePlaylist() {
      if (!currentShow && userId) {
        // If show has not being loaded before then get the show data (trending episodes)
        const showContents = await getAndSaveShowData(episodeSlug, showSlug);
        const { id: showId, seasons, showType } = showContents;
        dispatch(addNewShowSessionInfo({ showId, showSlug, seasons, showType }));
      }

      if (!isEqual(currentShow, previousShow) && userId) {
        const showSeasons = currentShow?.seasons;
        if (showSeasons) {
          const indexOfCurrentSeason = showSeasons.findIndex(item => item.season === currentSeason);
          // Flatten the season so all episode is a flat array. Start from the current playing season
          const flattenEpisodes = showSeasons.slice(indexOfCurrentSeason).reduce((acc, item, index, srcArray) => {
            if (item.episodes) {
              acc.push(...item.episodes);
            } else {
              // stop loading the rest of the episodes if there are missing episodes
              srcArray.length = 0;
            }
            return acc;
          }, []);
          // set episode container
          setSortedEpisodes(flattenEpisodes);

          // Updated active playlist with current season episodes
          const episodeIds = flattenEpisodes.map(item => item.id);
          dispatch(updateActivePlaylist(episodeIds));
        }
      }
    }

    updatePlaylist();
  }, [currentShow]);

  // Load more episode if required
  useEffect(() => {
    if (sortedEpisodes !== null) {
      const isLastSixEpisode = sortedEpisodes.findIndex(item => item.id === currentPlayingId) >= (sortedEpisodes.length - 6);
      if (isLastSixEpisode && nextSeason) {
        dispatch(addSeasonToShowSessionInfo(podcastId, slug, nextSeason));
      }
    }
  }, [currentPlayingId, sortedEpisodes]);

  return (
    <EpisodesContainerUI
      episodesOrigin={episodesOrigin}
      userId={userId}
      sortedEpisodes={sortedEpisodes}
      playlistSlug={playlistSlug}
      currentPlayingId={currentPlayingId}
      podcastId={podcastId}
    />
  );
};

ShowEpisodesContainer.propTypes = {
  slug: PropTypes.string.isRequired,
  podcastId: PropTypes.string.isRequired,
  episodesOrigin: PropTypes.string.isRequired,
  playlistSlug: PropTypes.string,
};

ShowEpisodesContainer.defaultProps = {
  playlistSlug: '',

};

export default ShowEpisodesContainer;
